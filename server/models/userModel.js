const {mongoose, Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    spotifyId: {type: String, required: [true, 'Spotify user id is not provided'] },
    avatarUrl: String,
    displayName: String,
    accessToken: String,
    seedsPool: {type: String, default: null},
    queues: {type: [String], default: []},
    likesPool: {type: String, default: null},
    playlists: {type: [String], default: []},
    showcasePlaylists: {type: [String], default: []}
});

const User = mongoose.model('User', userSchema)

module.exports = User;