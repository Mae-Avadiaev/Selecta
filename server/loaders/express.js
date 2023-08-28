const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const cookies = require("cookie-parser");
const routes = require("../routes/routes");
const {errorHandler} = require("../controllers/errorController");
const config = require("../config/index");
const app = express()

class ExpressLoader {
    constructor() {



        dotenv.config({path: './.env'})

        app.use(cors(corsOptions))
        app.use(express.json())
        app.use(cookies());

        app.use(errorHandler)

        routes(app)

        this.server = app.listen(config.port, () => {
            console.log(`Selecta server is listening on port ${config.port}...`)
        })
    }
}

module.exports = ExpressLoader;