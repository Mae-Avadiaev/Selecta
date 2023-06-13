const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const  artistSchema = new mongoose.Schema({
    spotifyId: String,
    name: String,
    spotifyHref: String,
    imageUrl: String,
    followers: Number,
    genres: [String],

});

const Artist = mongoose.model('Artist',  artistSchema)

module.exports = Artist;