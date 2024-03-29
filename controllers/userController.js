const { sha256 } = require("js-sha256");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jwt-then');

exports.register = async(req, res) => {
    const { name, email, password} = req.body;

    const emailRegex = /@gmail.com|outlook.com/;

    if (!emailRegex.test(email)) throw "Email from this domain is not supported";
    if (password.length < 6) throw "Password must be at least 6 characters long."

    const userExists = await User.findOne({
        email,
    });

    if (userExists) throw "User with same email already exists."
    const user = new User({ name, email, password: sha256(password + process.env.SALT) });

    await user.save();

    res.json({
        message: "User" + name + " registered succesfully!",
    });
};


exports.login = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    if (!user) throw "Email or password is incorrect"

    const token = await jwt.sign({id: user.id}, process.env.SECRET);

    res.json({
        message: "User logged in succesfully!",
        token,
    });
};