const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger')();
const { hash, compare } = require('../helpers/bcrypt');
const pg_pool = require('../helpers/pg_db_config');
const JWT_SECRET = process.env.JWT_SECRET || 'slkjdslkjdflkj';
exports.getUsers = async () => {
    return new Promise((resolve, reject) => {
        const cols = [];
        pg_pool.query('SELECT * FROM varlyq_users', cols, function (err, result) {
            if (!err && result.rowCount > 0) {
                resolve(result.rows);
            } else {
                logger.error({ location: 'getUsers', error: err });
                return reject({ status: 'error', errors: [{ msg: err }] });
            }
        })
    })
}
exports.postUser = async (data) => {
    const {
        name = '',
        email = '',
        mobile = '',
        password = '',
    } = data;
    const hashed_password = await hash(password);
    return new Promise((resolve, reject) => {
        const cols = [
            name,
            email,
            mobile,
            hashed_password,
        ];
        pg_pool.query(`INSERT INTO varlyq_users( 
            name, 
            email,
            mobile,
            password) VALUES(
                $1, 
                $2, 
                $3, 
                $4) RETURNING *`,
            cols,
            function (err, result) {
                if (!err) {
                    return resolve(result);
                } else {
                    logger.error({ location: 'postUser', error: err });
                    return reject({ status: 'error', errors: [{ msg: err }] });
                }
            });
    })
}
exports.updateUser = async (data) => {
    const {
        id = '',
        old_email = '',
        name = '',
        email = '',
        mobile = ''
    } = data;
    const hashed_password = await hash(data.password);
    return new Promise((resolve, reject) => {
        const cols = [
            name,
            email,
            mobile,
            hashed_password,
            id, 
            old_email
        ];
        pg_pool.query(`
        UPDATE varlyq_users SET 
            name=$1, 
            email=$2,  
            mobile=$3,
            password=$4 WHERE id=$5 AND email=$6`, cols, function (err, result) {
            if (!err) {
                return resolve({ status: 'success', message: 'User Succefully updated.' });
            } else {
                logger.error({ location: 'updateUser', error: err });
                return reject({ status: 'error', errors: [{ msg: 'Something went wrong!' }] });
            }
        })
    })
}
exports.deleteUser = async (data) => {
    const {id, email} = data;
    return new Promise((resolve, reject) => {
        const cols = [id, email];
        pg_pool.query('DELETE FROM varlyq_users WHERE id=$1 AND email=$2', cols, function (err, result) {
            if (!err) {
                return resolve({ status: 'success', message: 'User successfully deleted.'});
            } else {
                return reject({ status: 'error', errors: [{ msg: err }] });
            }
        })        
    })
}

exports.login = async (data) => {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
        pg_pool.query('SELECT email,password,id FROM varlyq_users WHERE email=$1', [email], function (err, result) {
            if (!err && result.rowCount > 0) {
                const hashed_password = result.rows[0].password;
                const id = result.rows[0].id;
                (async () => {
                    const match = await compare(password, hashed_password)
                    if (match === true) {
                        const token = jwt.sign(
                            { id, email},
                            JWT_SECRET,
                            {
                                expiresIn: "24h",
                            }
                        );
                        resolve({ status: 'success', token });
                    } else {
                        logger.error({ location: 'login', error: err });
                        return reject({ status: 'error', errors: [{ msg: 'Invalid password!' }] });
                    }
                })();
            } else {
                return reject({ status: 'error', errors: [{ msg: 'No user found with this email address' }] });
            }
        });
    })
}



exports.checkUserExist = async (email) => {
    return new Promise((resolve, reject) => {
        pg_pool.query('SELECT * FROM varlyq_users WHERE email=$1', [email], function (err, result) {
            // if email already exist
            if (!err && result.rowCount > 0) {
                logger.error({ location: 'checkUserExist', error: err });
                return reject();
            } else {
                return resolve();
            }
        });
    })
}