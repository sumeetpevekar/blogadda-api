const mongoose = require("mongoose")
const User = require("../models/user-model");
const bcrypt = require("bcryptjs")
const home = async (req, res) => {
    try{
    res.status(200).send("hello world");
    }catch(error){
        console.log(error)
    }
}

const register = async (req, res, next)  => {
    try{
        // console.log(req.body);
        const {name, username, email, phone, password} = req.body;
        const userName  = await User.findOne({username})
        if(userName){
            return res.status(400).json({message : "Username is already taken"})
        }
        
        const userExist  = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message : "email already exist"})
        }

        // const saltRound = 10;
        // const hash_password  = await bcrypt.hash(password, saltRound)

        const data = await User.create({
            name,
            username, 
            email, 
            phone, 
            password,
        })
        console.log(data)

        res.status(200).json({msg : "Registration successful", token : await data.generateToken(), userId : data._id.toString()});
    }catch(error){
        // res.status(404).json({msg : "page not found"})
        next(error);
    }
}

const login = async (req, res, next) => {
    try{
        const {emailOrUsername, password} = req.body;
        console.log("requesting body data", req.body);

        // finding User exist or not
        // const userExist = await User.findOne({ email });
        
        const isEmail = emailOrUsername.includes("@");
        
        const query = isEmail ? { email: emailOrUsername } : { username: emailOrUsername };
        
        // Finding User exist or not
        const userExist = await User.findOne(query);
        console.log(userExist);

        if(!userExist) {
            return res.status(400).json({message : "register first"});
        }
        // const isPasswordValid = await bcrypt.compare(password, userExist.password)
        
        const isPasswordValid = await userExist.comparePassword(password);
        // console.log(isPasswordValid)
            if(!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            res.status(200).json({
            msg : "welcome to our website",
            token : await userExist.generateToken(),
            id : userExist._id.toString(),
            });
    }catch(error){
        console.log(error)
        res.status(500).send("internal server error")
        next(error);
    }
}

const user = async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({userData});
    }catch(error){
        console.log(error)
    }
}
const updateUserDetailsById = async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({userData});
    }catch(error){
        console.log(error)
    }
}
const googleLogin = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        let userExist = await User.findOne({email: data.email});
        let user = null;
        if(userExist){
            user = await User.findOneAndUpdate({email: data.email}, {$set: {picture: data.picture}},{new:true});
        }else{
            const uniId = Math.floor(Math.random() * (10000 - 1001 + 1)) + 1001;
            const username = data.name.includes(" ") ? data.name.split(" ").join(" ") + uniId : data.name + uniId;
            user = await User.create({name: data.name, email: data.email, picture: data.picture, username: username});
        }
        return res.status(200).json({msg: "User Sign in successfully with google", token: "Bearer " + await user.generateToken()});
    }catch(error){
        console.log(error);
    }
}

module.exports = {home, register, login, user, googleLogin};