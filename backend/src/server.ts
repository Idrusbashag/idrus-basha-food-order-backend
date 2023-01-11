require('dotenv').config()
import express from 'express';
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
var appRoutes = require("./routes/appRoutes")
var adminRoutes = require('./routes/adminRoute')

// process.env.PORT hoy to e else 3000
const PORT = process.env.PORT || 3000

// some useful library
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true
}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// data base connection
const db = require('./database/db');

// for testing purposr
app.get('/', (req, res) => {
    res.send("Hello idrus from Server")
})



// route configure
app.use('/', appRoutes)
app.use('/admin', adminRoutes)

// print console message
app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
})

