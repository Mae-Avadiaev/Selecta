const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const cookies = require("cookie-parser");
const routes = require("../routes/routes");
const {errorHandler} = require("../controllers/errorController");
const config = require("../config/index");
const app = express()
const path = require("path")
const AppError = require("../utils/appError");

class ExpressLoader {
    constructor() {

        dotenv.config({path: './.env'})

        app.use(cors(corsOptions))
        app.use(express.json())
        app.use(cookies());

        app.use(errorHandler)

        routes(app)

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, "client", "build")))
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
            })
        } else {
            app.all('*', (req, res, next) => {
                next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
            });
        }

        this.server = app.listen(config.port, () => {
            console.log(`Selecta server is listening on port ${config.port}...`)
        })
    }
}

module.exports = ExpressLoader;