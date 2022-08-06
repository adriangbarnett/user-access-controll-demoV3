// User
const mongoose = require("mongoose");
const { Schema } = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const thisNewSchema = new Schema({

    username: {
        type: String, 
        required: true,  
        maxLength: 100
    },

    password: 
    {
        type: String, 
        required: true,
        maxLength: 500
    },

    email: 
    {
        type: String, 
        required: true, 
        maxLength: 100
    },

    verified: 
    {
        type: Boolean,
        default: false
    },

    createdOn:
    {
        type: Date
    },
    updatedOn:
    {
        type: Date
    },

    roles: [],
    session: String,
    token: String,
    secret: String
    
});

// passport-local-mongoose
thisNewSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", thisNewSchema);
