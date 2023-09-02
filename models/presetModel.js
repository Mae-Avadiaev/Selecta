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
    minYear: Number,
    maxYear: Number,
    keyMode: {type: String, enum: ['same', 'camelot adjacent', 'all']},
    amount: Number,
    sort: [Object],
    defaultResultName: String,
    rating: Number,
    color1: Object,
    color2: Object,
    color3: Object,
    public: Boolean,
    default: Boolean,
    searchWords: [String]

})

const Preset = mongoose.model('Preset',  presetSchema)

module.exports = Preset;