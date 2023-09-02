const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ExpressLoader = require( "./loaders/express" );
dotenv.config({path: './.env'})

new ExpressLoader();

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
    .then(() => console.log('DB connection successful!'));