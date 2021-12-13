// import express from "express"
const express = require('express')
// import cors from "cors"
var cors = require('cors')
// import mongoose from "mongoose"
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const url = "mongodb+srv://localhost:27017/myLoginRegisterDB"

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
// mongoose.connect("mongodb+srv://abc:abc@cluster0.ltigg.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            
            console.log(user);
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})