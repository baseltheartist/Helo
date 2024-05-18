// const express = require("express");
import express from 'express'
// const path  = require("path");
// const bcrypt = require("bcrypt");
import bcrypt from 'bcryptjs'
// const Collection=require("./src/config");
import Collection from './src/config.js'
// const { name } = require("ejs");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine","ejs"); // set up ejs for templating

app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post('/signup', async (req, res) => {
    const data = { 
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        gender: req.body.gender,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
    };
    //Password at least be 8 digits
    if (data.password.length < 8) {
        return res.status(400).send("Password must be at least 8 characters long.");
    }


        // Check if password matches confirmPassword
        if (data.password !== data.confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }
         // Validate birthdate
    const birthYear = new Date(data.birthdate).getFullYear();
    if (birthYear > 2012) {
        return res.status(400).send("You must be born before 2012 to register.");
    }
         // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return res.status(400).send("Invalid email address format. Please enter a valid email address.");
    }
      // Validate phone number format and length
    const phoneRegex = /^\+201[0125]\d{8}$/;
    if (!phoneRegex.test(data.phone)) {
        return res.status(400).send("Invalid phone number format. Phone number must start with +201 and be followed by one of the numbers 0, 1, 2, or 5. It should also be 13 digits in length.");
    }
     // Validate first name and last name
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(data.fName) || !nameRegex.test(data.lName)) {
        return res.status(400).send("First name and last name must contain only alphabetical characters.");
    }
    
    const existingUser = await Collection.collection.findOne({ email: data.email });
    if (existingUser) {
        res.send("User already exists! Please choose a different username.");
    } else {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const hashedConfirmPassword = await bcrypt.hash(data.confirmPassword, saltRounds); // Hash confirm password
            data.password = hashedPassword;
            data.confirmPassword = hashedPassword;
            await Collection.create(data);
            console.log("User created successfully:", data);
            res.redirect("/"); // Redirect to the login page after signup
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Error creating user. Please try aga.")in later;
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = await Collection.findOne({ email: req.body.email });
        if (!email) {
            res.send("No account found! Please sign up.");
            return;
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, email.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in. Please try again later.");
    }
});
const port =5200;
app.listen(port,()=>{console.log(`Server started on ${port}`)});
// ---------------------------------------------