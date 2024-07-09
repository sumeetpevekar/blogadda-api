const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        require : true,
    },
    phone : {
        type : Number,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
})

// encrypting the password
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password  = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password;
    }catch(err){
        next(err);
    }
    // this.password = await bcrypt.hash(this.password, 10)
})

// compare the password
userSchema.methods.comparePassword = async function(password) { 
    // const user = this;
    return bcrypt.compare(password, this.password)
}

// json web token
userSchema.methods.generateToken = async function () {
    try{
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : "30d",
        }
        )
    }catch(err){
        console.log(err)
    }
}

const user = new mongoose.model('User', userSchema)

module.exports = user;