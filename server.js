require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://blogadda-website.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const adminRoute = require('./router/admin-router');
const userRoute = require('./router/user-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Database connection failed', err);
});
