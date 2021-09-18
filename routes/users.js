const router = require('express').Router();
const users = require('../services/users');
const multer = require('multer');
const upload = multer();
const { check, validationResult } = require('express-validator');

router.get('/get_users', async (req, res) => {
    try {
        const result = await users.getUsers(req.body);
        await res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        await res.status(500).json(error);
    }
})

router.post(
    '/create_user',
    upload.none(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long'),
    check('email')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async (email) => {
            try {
                await users.checkUserExist(email);
            } catch (error) {
                throw new Error('Email already exists!');
            }
        }),
    check('name').notEmpty().withMessage('name can not be blank'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            try {
                const result = await users.postUser(req.body);
                await res.status(200).json({ status: 'success', message: 'User successfully created' });
            } catch (error) {
                await res.status(500).json(error);
            }
        }
    }
)

router.put(
    '/update_user',
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
    check('name').notEmpty().withMessage('name can not be blank'),
    check('mobile').notEmpty().withMessage('mobile can not be blank'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 'error', errors: errors.array() });
        } else {
            try {
                const result = await users.updateUser(req.body);
                await res.status(200).send(result);
            } catch (error) {
                await res.status(500).json(error);
            }
        }
    })


router.delete(
    '/delete_user',
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
    check('id').notEmpty().withMessage('Id can not be blank'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 'error', errors: errors.array() });
        } else {
            try {
                const result = await users.deleteUser(req.body);
                await res.status(200).send(result);
            } catch (error) {
                await res.status(500).json(error);
            }
        }
    })

router.post(
    '/login',
    upload.none(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long'),
    check('email').isEmail()
        .withMessage('Invalid email'),
    async (req, res) => {
        // console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            try {
                const result = await users.login(req.body);
                await res.status(200).send(result);
            } catch (error) {
                await res.status(500).json(error);
            }
        }

    })
module.exports = router;