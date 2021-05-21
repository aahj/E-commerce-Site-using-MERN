const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

// handled uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down due to unhandled uncaught Exception');
    process.exit(1)
})

//setting up configfile
dotenv.config({ path: 'backend/config/config.env' })

//connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// handle unHandeled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Server shutting down due to unhandled Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
})
