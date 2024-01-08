const express = require('express');
const app = new express();
const router =require('./src/Routes/api');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
//const xss =  require('xss')
const cors = require('cors')
const hpp = require('hpp')
//const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongo = require('mongoose')
const path = require('path')





//Security middleware implement

app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(mongoSanitize())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))



app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// app.use(bodyParser.json());



//Rate limit

const limiter = rateLimit({windowMs:15*60*1000, max:300});
 app.use(limiter)


// Backend Route

app.use("/api/v1", router)

app.use(express.static('client/dist'));

// Frontend Route define

app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})




module.exports = app;