/* //requiring dependencies
const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// requiring user model
const User = require("../models/user")
user.use(cors())

process.env.SECRET_KEY = 'secret'

//posting user login details
users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                //user passsword comparison
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    //jwt payload details for token generation
                    const payload = {
                        _id: user._id,
                        email: user.email,
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = users */