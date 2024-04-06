// Mongodb connection

const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1/MyOwnProject"

const dbConnect = async(req,res) => {
    try {
        await mongoose.connect(url)
        console.log("Database is Connected")
    }
    catch(err) {
        console.log("Something went to wrong while connecting db", err)
    }
}

module.exports = { dbConnect }