const catchAsync = require("./../utils/catchAsync");
const Playlist = require("../models/playlistModel")

exports.getSeeds = catchAsync(async (req, res, next) => {

    const userId = "sss"
    const seedPoolId = "sss"
    const seedItems = await Playlist.findById(seedPoolId)

    res.status(201).json({
        status: 'success',
        data: {seedItems: seedItems}
    })
})