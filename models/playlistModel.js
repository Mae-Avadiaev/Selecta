const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const playlistSchema = new mongoose.Schema({
    spotifyId: String,
    name: String,
    description: String,
    coverUrl: String,
    type: {type: String, enum: [
        'seed',
        'likes-source',
        'likes-pool'
    ]},
    genres: {type: [String], default: []},
    bpmRange: {type: Object, default: {}},
    rules: {type: Object, default: {}},
    public: {type: Boolean, default: false},
    tracks: {type: [Schema.Types.ObjectId], ref: 'Track', default: []},
    synced: {type: Boolean, default: false}
});

const Playlist = mongoose.model('Playlist',  playlistSchema)

module.exports = Playlist;