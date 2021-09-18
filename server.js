const express = require('express');
const posts = require('./routes/posts');
const users = require('./routes/users');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) =>{
    try {
        await res.status(200).json({status: 200, message:'Please use posts and users routes'});
    } catch (error) {
        await res.status(500).json({status: 500, message:'Something went wrong. Please try again.'});
    }
})
app.use('/posts',posts);
app.use('/users',users);

app.listen(PORT, ()=>{console.log(`App is running on the PORT http://localhost:${PORT}`)})
