const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const  trackSchema = new mongoose.Schema({
    spotifyId: String,
    name: String,
    artists: {type: [Schema.Types.ObjectId], ref: 'Artist'},
    album: {type: Schema.Types.ObjectId, ref: 'Album'},
    spotifyHref: String,
    preview: String,
    uri: String,
    popularity: Number,
    tags: {type: [Schema.Types.ObjectId], ref: 'Tag', default: []},
    dateAdded: Date,
    danceability: Number,
    duration: {ms: Number, sec: Number, representation: String},
    energy: Number,
    instrumentalness: Number,
    key: {number: Number, camelot: String, classic: String},
    mode: Number,
    bpm: Number,
    valence: Number

});

const Track = mongoose.model('Track',  trackSchema)

module.exports = Track

