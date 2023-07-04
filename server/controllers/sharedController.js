const catchAsync = require("./../utils/catchAsync");

exports.sendResponse = catchAsync(async (req, res, next) => {

    
    //log
    console.log(`📤 Message "${req.message}" sent to client. Tracks: All: ${req.allTracks ? req.allTracks.length : '0'}, New: ${req.newTracks ? req.newTracks.length : '0'}.`)
    // Presets: All: ${req.allPresets ? req.allPresets.length : '0'}
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(req.code).json({
        status: req.status,
        message: req.message,
        allTracks: req.allTracks,
        // newTracks: req.newTracks,
        allPresets: req.allPresets

    })
})