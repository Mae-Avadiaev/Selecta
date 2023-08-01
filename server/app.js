const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const AppError = require("./utils/appError");
const app = express()
const port = process.env.PORT || 3000
const cookies = require("cookie-parser")
const {errorHandler} = require("./controllers/errorController");

const authRouter = require("./routes/authRouter")
const playlistRouter = require("./routes/playlistRouter")
const tracksRouter = require("./routes/tracksRouter")
const presetRouter = require("./routes/presetRouter")
const userRouter = require("./routes/userRouter")

dotenv.config({path: './.env'})

const corsOptions = {
    // origin: '*',
    origin: ['http://localhost:3001', 'http://localho.st:3001', 'http://192.168.1.33', 'http://10.100.102.122', "http://192.168.1.98"],
    optionsSuccessStatus: 200,
    credentials : true,
    allowedHeaders: ["Access-Control-Allow-Credentials"]
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookies());

//ROUTES
app.use('/auth', authRouter)
app.use('/v1/playlist', playlistRouter)
app.use('/v1/tracks', tracksRouter)
app.use('/v1/presets', presetRouter)
app.use('/v1/me', userRouter)

//ERROR HANDLER
app.use(errorHandler)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
    console.log(`Selecta server is listening on port ${port}...`)
})