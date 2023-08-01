const dotenv = require('dotenv')
const mongoose = require("mongoose")
const app = require('./app')

dotenv.config({path: './.env'})

const DB = process.env.DATABASE.replace(
    '<password>', process.env.DATABASE_PASSWORD
);

mongoose.connect(DB)
    .then(() => console.log('DB connection successful!'));