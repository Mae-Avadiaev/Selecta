const catchAsync = require("./../utils/catchAsync");

exports.sendResponse = catchAsync(async (req, res, next) => {
    
    //log
    console.log(`📤 Message "${req.message}" sent to the client.`)
    // Presets: All: ${req.allPresets ? req.allPresets.length : '0'}
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(req.code ? req.code : 200).json({
        status: req.status,
        message: req.message,
        allTracks: req.allTracks,
        allPresets: req.allPresets,
        seeds: req.seeds,
        spotifyPlaylists: req.spotifyPlaylists,
        spotifyLikes: req.spotifyLikes,
        total: req.total,
        isLikesPoolSource: req.isLikesPoolSource
    })
})