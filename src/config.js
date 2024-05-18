// const mongoose = require("mongoose");
import mongoose  from "mongoose";
const connect = mongoose.connect("mongodb+srv://baselnabil74:basel-123@cluster0.4n4a5rb.mongodb.net/Helo");

connect.then((db) => {
    console.log('Database Connected successfully');
})
.catch(() => {
    console.log('Failed to Connect Database');
});

// Define your schema
const Loginschema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    phone:{
        type :String,
        required:true
    }
});

// Create a model based on the schema
const Login = mongoose.model('Login', Loginschema);
// Export the model instead of mongoose.Collection
// module.exports = Login;
export default Login