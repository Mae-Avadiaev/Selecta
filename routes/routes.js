const authRouter = require("./authRouter");
const playlistRouter = require("./playlistRouter");
const tracksRouter = require("./tracksRouter");
const presetRouter = require("./presetRouter");
const userRouter = require("./userRouter");
const AppError = require("../utils/appError");

const routes = app => {
    app.use('/auth', authRouter)
    app.use('/v1/playlist', playlistRouter)
    app.use('/v1/tracks', tracksRouter)
    app.use('/v1/preset', presetRouter)
    app.use('/v1/me', userRouter)

};

module.exports = routes;