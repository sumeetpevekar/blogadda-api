const {z} = require("zod")

// creating object schema

const loginSchema = z.object({
    emailOrUsername: z
    .string({
        required_error: "Email or username is required"
    })
    .trim()
    .min(3, { message: "Email or username must be at least 3 characters." })
    .max(255, { message: "Email or username must not be greater than 255 characters" }),
    password : z
    .string({
        required_error: "Password is required"
    })
    .trim()
    .min(8, {message : "Password must be at least of 8 characters."})
    .max(1024, {message : "Password must not be greater than 1024 characters"}),
})
const signupSchema = z.object({
    name : z
    .string({   
        required_error: "Name is required"
    })
    .trim()
    .min(3, {message : "Name must be at least of 3 characters."})
    .max(255, {message : "Name must not be greater than 255 characters"}),
    username : z
    .string({   
        required_error: "Name is required"
    })
    .trim()
    .min(3, {message : "Name must be at least of 3 characters."})
    .max(255, {message : "Name must not be greater than 255 characters"})
    .refine(s => !s.includes(' '), 'No Spaces!'),
    phone : z
    .string({
        required_error: "Phone is required"
    })
    .trim()
    .min(10, {message : "Phone must be at least of 10 characters."})
    .max(20, {message : "Phone must not be greater than 20 characters"}),
    email : z
    .string({
        required_error: "Email is required"
    })
    .trim()
    .email({message : "Email is required"})
    .min(3, {message : "Email must be at least of 3 characters."})
    .max(255, {message : "Email must not be greater than 255 characters"}),
    password : z
    .string({
        required_error: "Password is required"
    })
    .trim()
    .min(8, {message : "Password must be at least of 8 characters."})
    .max(1024, {message : "Password must not be greater than 1024 characters"}),
})


module.exports = {signupSchema, loginSchema};