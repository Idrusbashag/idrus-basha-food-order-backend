import mongoose from 'mongoose';
require('dotenv').config()
mongoose.Promise=global.Promise
mongoose.connect("mongodb://idrusbasha:basha@ac-dkqtsux-shard-00-00.xp7pfy6.mongodb.net:27017,ac-dkqtsux-shard-00-01.xp7pfy6.mongodb.net:27017,ac-dkqtsux-shard-00-02.xp7pfy6.mongodb.net:27017/Foodapp?ssl=true&replicaSet=atlas-954rpz-shard-0&authSource=admin&retryWrites=true&w=majority")
mongoose.set('strictQuery', true);
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})