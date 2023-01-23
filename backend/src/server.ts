require('dotenv').config()
import express from 'express';
import { File } from 'winston/lib/winston/transports';
const https = require('https')
const path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
const multer = require('multer')
const app = express()
var appRoutes = require("./routes/appRoutes")
var adminRoutes = require('./routes/adminRoute')

// process.env.PORT hoy to  else 3000
const PORT = process.env.PORT || 3000

// some useful library
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))

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
  
// image ggogle cloud
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
app.use(multerMid.single('file'))

app.post("/addpizza", multerMid.single('file'),function (req, res, next)  {
  var file = new file({
      pizzaimage: file.filename
  })
  try {
      doc = file.save();
      console.log("Added a pizza");
      return res.status(201).json(doc);
  }
  catch (err) {
      console.warn(doc)
      return res.status(501).json(err);
  }
})

// Socket connection
var server = require('https').Server(app);
var io = require('socket.io')(server,
    
    
    {
    cors: {
      origin:'*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }
  
  ); 
app.set('io',io);
io.on('connection', socket => {
    console.log("new  sockeet connection...");
    socket.emit("test event","hey basha");
});
// route configure
app.use('/', appRoutes)
app.use('/admin', adminRoutes)

// print console message
app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
})

