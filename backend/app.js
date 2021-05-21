const express = require('express')
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// import all routes 
const products = require('./routes/products');
const auth = require('./routes/userAuth');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

// middleware to handle error
app.use(errorMiddleware);

module.exports = app;