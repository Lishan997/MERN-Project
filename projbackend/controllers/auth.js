const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");
const user = require("../models/user");


exports.signup = (req, res) => {


    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].message
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB "
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}

exports.signin = (req, res) =>{
    
    const errors = validationResult(req);
    

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].message
        })
    }

    const {email, password} = req.body;

    //this methods alwas return error and object
    User.findOne({email}, (err, user) =>{
        if(err){
            return res.status().json({
                error: "User Email Doesnot exsisit"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Password Don not match"
            })
        }
    })

    //sign in user

    //create token
    const token = jwt.sign({_id:user._id}, process.env.SECRETE);

    //put token in cookie
    res.cookie("token", token, {expire: new Date() + 9999});

    //send response to front end
    const {_id, name, role} = user;
    return res.json({token, user:{_id, name, email, role}})
}

exports.signout = (req, res) => {
    res.json({
        message: "user signout"
    });
}