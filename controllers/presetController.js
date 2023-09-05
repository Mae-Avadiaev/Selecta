const catchAsync = require("./../utils/catchAsync");
const Preset = require("../models/presetModel");
const User = require("../models/userModel");
const PresetService = require("../services/presetService")
const {query} = require("express");
const PresetServiceInstance = new PresetService()

// exports.getUserPresets = catchAsync(async (req, res, next) => {
//
//     const allUserPresets = {
//         pinnedPresets: req.user.pinnedPresets,
//         recentPresets: req.user.recentPresets,
//         userPresets: req.user.userPresets,
//         defaultPresets: req.user.defaultPresets
//     }
//
//     const amountPresets =
//         req.user.pinnedPresets.length + req.user.recentPresets.length +
//         req.user.userPresets.length + req.user.defaultPresets.length
//
//     //log
//     console.log(`💿 Retrieved ${amountPresets} preset(s). Pinned: ${req.user.pinnedPresets.length} Recent: ${req.user.recentPresets.length} User: ${req.user.userPresets.length} Default: ${req.user.defaultPresets.length}`)
//
//     req.allPresets = allUserPresets
//
//     req.code = 200
//     req.status = 'success'
//     req.message = `Retrieved ${amountPresets} preset(s)`
//
//     next()
// })

exports.createPreset = catchAsync(async (req, res, next) => {

    req.query.name = `my preset #${req.user.presets.length + 1}`
    req.query.author = req.user._id

    const preset = await PresetServiceInstance.createPreset(req.query)

    const message = `Created ${req.query.name} preset`

    res.status(200).json({
        status: 'success',
        message: message,
        preset: preset
    })
})

// exports.addPresetToTag = catchAsync(async (req, res, next) => {
//
//     const resentPresets = await User.findOneAndUpdate(
//         {_id: req.user._id}, {$push: {[req.query.destination]: req.query.presetId}})
//
//     //log
//     console.log(`💿 Added preset to ${req.query.destination}`)
//
//     next()
// })