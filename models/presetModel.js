const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const presetSchema = new mongoose.Schema({
    name: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},

    minBpm: Number,
    maxBpm: Number,
    minEnergy: Number,
    maxEnergy: Number,
    minDanceability: Number,
    maxDanceability: Number,
    minInstrumentalness: Number,
    maxInstrumentalness: Number,
    minAcousticness: Number,
    maxAcousticness: Number,
    minValence: Number,
    maxValence: Number,
    minPopularity: Number,
    maxPopularity: Number,

    // adaptive: Boolean,
    // minBpmRelative: Number,
    // maxBpmRelative: Number,
    // minEnergyRelative: Number,
    // maxEnergyRelative: Number,
    // minDanceabilityRelative: Number,
    // maxDeanceabilityRelative: Number,
    // minInstrumentalnesRelative: Number,
    // maxInstrumentalnessRelative: Number,
    // minAcousticnessRelative: Number,
    // maxAcousticnessRelative: Number,
    // minValenceRelative: Number,
    // maxValenceRelative: Number,
    // minPopularityRelative: Number,
    // maxPopularityRelative: Number,

    keyMode: {type: String, enum: ['same', 'adjacent', 'all']},
    amount: Number,
    default: Boolean,
    lastUse: Date

})

const Preset = mongoose.model('Preset',  presetSchema)

module.exports = Preset;