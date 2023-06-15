const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const playlistSchema = new mongoose.Schema({
    spotifyId: String,
    name: {type: String, required: [true, 'Name is not provided']},
    description: String,
    coverUrl: String,
    type: {type: String, enum: [
        'seeds',
        'similar',
        'likes',
        'queue',
        'collection playlist',
        'showcase playlist'
        ]
    },
    rules: {type: Object, default: {}},
    public: {type: Boolean, default: false},
    tracks: {type: [Schema.Types.ObjectId], ref: 'Track', default: []},
    browserOrderNumber: Number,
    isSynced: Boolean
    // lastSynced: {type: Date}
});

const Playlist = mongoose.model('Playlist',  playlistSchema)

module.exports = Playlist;