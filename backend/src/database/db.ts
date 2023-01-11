import mongoose from 'mongoose';
require('dotenv').config()
mongoose.Promise=global.Promise
mongoose.connect("mongodb+srv://idrusbasha:basha@cluster0.xp7pfy6.mongodb.net/Foodapp?retryWrites=true&w=majority")
mongoose.set('strictQuery', true);
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})