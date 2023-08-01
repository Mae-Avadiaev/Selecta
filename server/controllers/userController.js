const catchAsync = require("./../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {

    // hide sensitive server info
    req.user.accessToken = undefined
    req.user.refreshToken = undefined
    req.user.accessTokenExpiresBy = undefined

    res.status(200).json({
        status: 'success',
        data: req.user
    })
})