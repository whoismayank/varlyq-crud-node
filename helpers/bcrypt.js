const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10
exports.hash = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}
exports.compare = async (password, hashed)=>{
    const match = await bcrypt.compare(password, hashed)
    return match
}

// async function run() {
//     const password = 'test123'
//     const hashed = await hash(password)
//     const match = await compare(password, hashed)

//     console.log(`Password: ${password}`)
//     console.log(`Hashed: ${hashed}`)
//     console.log(`Match: ${match}`)
// }

// run()