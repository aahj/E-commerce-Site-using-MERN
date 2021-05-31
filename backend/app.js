const express = require('express')
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());


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