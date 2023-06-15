const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const  albumSchema = new mongoose.Schema({
    spotifyId: String,
    name: String,
    spotifyHref: String,
    imageUrl: String,
    dominantColors: [[]],
    releaseDate: String,
    releaseYear: Number,
    label: String
});

const Album = mongoose.model('Album',  albumSchema)

module.exports = Album;