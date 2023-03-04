const user1 = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    user1.findById(id).exec((error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: "User Not Found"
            })
        }else{
            req.profile = user;
            next();
        }
    })
};

exports.getUser = (req, res) => {
    //TODO: get back here for password
    return res.json(req.profile);
}