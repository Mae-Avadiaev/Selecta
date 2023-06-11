const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const  trackSchema = new mongoose.Schema({
    spotifyId: String,
    songFullTitle: String,
    tags: {type: [Schema.Types.ObjectId], default: []},
    decade: String,
    comment: String,
    dateAdded: Date
});

const Track = mongoose.model('Track',  trackSchema)

module.exports = Track;