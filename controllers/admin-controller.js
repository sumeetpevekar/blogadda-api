const user = require("../models/user-model");
const contact = require("../models/contact-model")
const blogs = require("../models/blogs-model")
const getAllUsers = async (req, res, next) => {
    try{
        const userData = await user.find().select({password : 0})
        if(!user || user.length === 0){
            return res.status(404).json({message : "No Users found"});
        }
        // console.log("fetching")
        return res.status(200).json({message : userData});
    }catch(error){
        console.log(error);
        next(error)
    }
}
const getAllContacts = async (req, res, next) => {
    try{
        const contactData = await contact.find();
        if(!contact || contact.length === 0){
            return res.status(404).json({message : "No Contacts found"});
        }
        res.status(200).json({message : contactData})
    }catch(error){
        console.log(error)
        next(error);
    }
}
const getAllBlogs = async (req, res, next) => {
    try{
        const blogData = await blogs.find();
        if(!blogData || blogData.length === 0){
            return res.status(404).json({message : "No Blogs found"});
        }
        res.status(200).json({message : blogData})
    }catch(error){
        console.log(error)
        next(error);
    }
}

const deleteUserById = async (req, res, next) => {
    try{
        console.log(req.params.id)
        const id  = req.params.id;
        await user.deleteOne({_id : id})
        res.status(200).json({message : "user deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({message :"user not deleted"}) 
    }
}
const deleteBlogById = async (req, res, next) => {
    try{
        console.log(req.params.id)
        const id  = req.params.id;
        await blogs.deleteOne({_id : id})
        res.status(200).json({message : "user deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({message :"user not deleted"}) 
    }
}
const updateUserById = async (req, res, next) => {
    try{
        console.log(req.params.id)
        const id  = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await user.updateOne({_id : id}, {$set: updatedUserData});
        return res.status(200).json({message : "user updated successfully"});
    }catch(err){
        console.log(err)
        res.status(400).json({message :"user not updated"}) 
    }
}

const updateBlogById = async (req, res, next) => {
    try{
        console.log(req.params.id)
        const id  = req.params.id;
        const updatedBlogData = req.body;
        await blogs.updateOne({_id : id}, {$set: updatedBlogData});
        return res.status(200).json({message : "blog updated successfully"});
    }catch(err){
        console.log(err)
        res.status(400).json({message :"blog not updated"}) 
    }
}
const getUserById = async (req, res, next) => {
    try{
        const id  = req.params.id;
        console.log("getting user data", id)
        const data = await user.findOne({_id : id}, {password : 0})
        console.log("getting single user data", data)
        return res.status(200).json({message : data})
    }catch(err){
        console.log(err)
        res.status(400).json({message :"user not found"})
    }
}

const getBlogById = async (req, res, next) => {
    try{
        const id  = req.params.id;
        console.log("getting blog data", id)
        const data = await blogs.findOne({_id : id})
        console.log("getting single blog data", data)
        return res.status(200).json({message : data})
    }catch(err){
        console.log(err)
        res.status(400).json({message :"blog not found"})
    }
}

const deleteContactById = async (req, res, next) => {
    try{
        console.log(req.params.id)
        const id  = req.params.id;
        await contact.deleteOne({_id : id})
        res.status(200).json({message : "Message deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({message :"user not deleted"}) 
    }
}

module.exports = {getAllUsers, getAllContacts, getAllBlogs, deleteUserById, deleteBlogById, getUserById, getBlogById, updateUserById, updateBlogById, deleteContactById};