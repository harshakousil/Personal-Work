var mongoose = require("mongoose");
const { createTokens } = require("../jwt.js");
const bcrpyt = require("bcryptjs")
var userSchema = require("../model/userModel.js");

exports.addUser = async (req, res,) => {

    const password = req.body.password;
    console.log(password);
    const hashPassword = await bcrpyt.hash(password, 10);
    
    try {
        const adduser = new userSchema({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            cart: []
        });
        var data = await adduser.save();
    }
    catch (err) {
        res.json({ msg: "Email already Exist's" })
        return
    }
    let emailId = req.body.email;
    const accessToken = createTokens(emailId);
    // console.log(accessToken);
    res.json({ user: data, accessToken: accessToken });
};

exports.getUser = async (req, res) => {
    const emailId = req.body.email;
    const pass = req.body.password;
    var user = await userSchema.findOne({ email: emailId });
    if (user) {
        const check = await bcrpyt.compare(pass, user.password);

        if (check) {
            const accessToken = createTokens(emailId);
            res.json({
                user: user,
                accessToken: accessToken,
                msg: 'success',
            });
        }
        else {
            res.json({
                msg: "Invalid Password"
            })
        }
    }
    else {
        res.json({
            msg: "User doesn't exists"
        })
    }


}