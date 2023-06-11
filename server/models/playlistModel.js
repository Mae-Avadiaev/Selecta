const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const playlistSchema = new mongoose.Schema({
    spotifyId: String,
    name: {type: String, required: [true, 'Name is not provided']},
    description: String,
    coverUrl: String,
    type: {type: String, enum: [
        'seeds pool',
        'likes pool',
        'queue',
        'collection playlist',
        'showcase playlist'
        ]
    },
    rules: [String],
    public: {type: Boolean, default: false},
    tracks: {type: [Object], default: []},
    orderNumber: Number,
    lastSynced: {type: Date}
});

const Playlist = mongoose.model('Playlist',  playlistSchema)

module.exports = Playlist;