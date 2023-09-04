const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const presetSchema = new mongoose.Schema({
    name: String,
    author: {type: [Schema.Types.ObjectId], ref: 'User'},
    minBpm: Number,
    maxBpm: Number,
    minEnergy: Number,
    maxEnergy: Number,
    minDanceability: Number,
    maxDeanceability: Number,
    minInstrumentalnes: Number,
    maxInstrumentalness: Number,
    minAcousticness: Number,
    maxAcousticness: Number,
    minValence: Number,
    maxValence: Number,
    keyMode: {type: String, enum: ['same', 'adjacent', 'all']},
    amount: Number,
    rating: Number,
    color1: Object,
    color2: Object,
    color3: Object,
    default: Boolean,
    searchWords: [String]

})

const Preset = mongoose.model('Preset',  presetSchema)

module.exports = Preset;