const mongoose = require("mongoose");

const presetSchema = new mongoose.Schema({

})

const Preset = mongoose.model('Preset',  presetSchema)

module.exports = Preset;