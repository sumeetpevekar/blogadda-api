const Contact = require("../models/contact-model");
const user = require("../models/user-model")
const contactForm = async (req, res, next) => {
    try{
        const {username , email, message}  =  req.body;
        console.log(message);
        const userExist = await user.findOne({email: email})
        console.log("userExist", userExist)
        if(!userExist){
            res.status(400).json({message : "You are not registered user"})
            return;
        }
        if(userExist.username != username){
            res.status(400).json({message : "Incorrect Username"})
            return;
        }
        const data = await Contact.create({
            username , email, message
        })
        res.status(200).json({msg : message});
    }catch(error){
        console.log(error)
        res.status(404).json({message : "message not sent"})
    }
}

module.exports = contactForm;