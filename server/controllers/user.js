const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
    const { name, password } = req.body;

    if(!name || password){
        return res.status(400).json({
            msg: "Bad request. Please add username and password in the request body",
        });
    }

    let foundUser = await User.findOne({ name: req.body.name });
    if (foundUser) {
        const isMatch = await foundUser.comparePassword(password);

        if (isMatch){
            const token = jwt.sign(
            {
                id: foundUser._id, name: foundUser.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        return res.status(200).json({ msg: "user logged in", token });
        } else {
        return res.status(400).json({ msg: "Bad password" });
        } 
    } else {
        return res.status(400).json({ msg: "Bad credentials" });
    }
        
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const register = async (req, res) => {
    let foundUser = await User.findOne({ name: req.body.name });
    if (foundUser === null){
        let { name, password } = req.body;
        if(name.length && password.length) {
            const person = new User({
                name: username,
                password: password,
            });
            await person.save();
            return res.status(201).json({ person });
        } else {
            return res.status(400).json({ msg: "Please add all values in the request body"});
        }
    } else {
        return res.status(400).json({ msg: "Username already in use" });
    }
};

module.exports = {
    login,
    register,
    dashboard,
    getAllUsers,
};