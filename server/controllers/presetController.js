const catchAsync = require("./../utils/catchAsync");
const Preset = require("../models/presetModel");

exports.getPinnedOrRecentPresets = catchAsync(async (req, res, next) => {

    const resentPresets = await Preset.find({pinned: 'true'})

})