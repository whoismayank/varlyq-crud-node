const router = require('express').Router();
const posts = require('../services/posts');
router.get('/', async (req, res) => {
    await res.status(200).json({status: 200, message:''})
})
module.exports = router;