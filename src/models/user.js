const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    emailId: {
        type: String,
        
    },
    pass : {
        type : String,
    }
})

const User = mongoose.model("User" , userSchema);

module.exports = User;