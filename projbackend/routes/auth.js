const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

router.post(
    "/signup", 
    [
        check("name", "name should be at least 3 charaters").isLength({min : 3}),
        check("email", "email is required").isEmail(),
        check("password", "password should be at least 3 charater").isLength({min : 3})
    ] , 
    signup
);

router.post(
    "/signin", 
    [
        check("email", "email is required").isEmail(),
        check("password", "password is required").isLength({min : 1})
    ] , 
    signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    //inside "isSignedIn" we have used userProperty: "auth" what this does is, this is added property called auth to the request
    //that property stored signedusers id
    //res.send("A Protected Route");
    return res.json(req.auth);
})


module.exports = router;