const validate = (schema) => async (req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req. body);
        req.body = parseBody;
        next();
    }catch(err){
        const message = "Fill input Properly"
        const extraDetails = err.errors[0].message;
        console.log(message)
        // console.log(err);
        // res.status(400).json({msg : err})
        const status = 404
        const error = {
            status : status,
            message : message,
            extraDetails : extraDetails,
        }
        console.log(error)
        next(error);
    }
}
module.exports = validate;