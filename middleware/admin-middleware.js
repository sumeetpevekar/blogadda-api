adminMiddleware = async (req, res, next) => {
    try{
        console.log("requesting user", req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            res.status(404).json({msg: "you are not admin"})
            return;
        }
        // res.status(200).json({msg: req.user})
        next();
    }catch(error){
        next(error);
    }
}

module.exports = adminMiddleware;