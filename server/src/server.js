/* eslint-disable no-console */
//requiring server dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const routes = require('../routes/api')
const port = process.env.PORT || 8081

//express app dependencies
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

//error handling
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message})
});

// eslint-disable-next-line no-undef
//localhost mongodb url connection
const mongourl = 'mongodb://localhost:27017/skalla'

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb successfully connected'))
    .catch(err =>console.log(err))
    
// var user = require("../routes/user")
// app.use('/login', user)

//express app port
app.listen(port, function(){
    console.log(`Server is running on port: ${port}`)
})



