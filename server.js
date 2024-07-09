require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors")
const port = 5000;
const authRoute = require('./router/auth-router')
const contactRoute = require('./router/contact-router')
const adminRoute = require('./router/admin-router')
const userRoute = require('./router/user-router')
// const router = require('./router/auth-router')
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

const corsOptions = {
    origin : "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use(errorMiddleware)

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`)
    })
});