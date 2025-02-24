const mongoose = require('mongoose')
require("dotenv").config();
const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB