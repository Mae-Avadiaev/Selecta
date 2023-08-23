const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const playlistSchema = new mongoose.Schema({
    spotifyId: String,
    name: String,
    description: String,
    coverUrl: String,
    type: {type: String, enum: [
        'seeds',
        'likes'
    ]},
    rules: {type: Object, default: {}},
    public: {type: Boolean, default: false},
    tracks: {type: [Schema.Types.ObjectId], ref: 'Track', default: []},
    bpmRange: Object,
    genres: [String],
    trackAmount: Number,
    playlistDuration: Object
});

const Playlist = mongoose.model('Playlist',  playlistSchema)

module.exports = Playlist;