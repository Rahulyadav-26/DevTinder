const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rahuly:rahuldbpassword@namastenodecluster.riqnyu1.mongodb.net/DevTinder");
}

module.exports = connectDB;