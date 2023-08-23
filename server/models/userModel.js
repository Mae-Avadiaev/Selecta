const {mongoose, Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    spotifyId: {type: String, required: [true, 'Spotify user id is not provided'] },
    avatarUrl: String,
    displayName: String,

    accessToken: String,
    accessTokenExpiresBy: Number,
    refreshToken: String,

    seeds: {type: [Schema.Types.ObjectId], ref: 'Playlist', default: null},
    // similar: {type: Schema.Types.ObjectId, ref: 'Playlist', default: null},
    queues: {type: [Schema.Types.ObjectId], ref: 'Playlist', default: []},
    // likes: {type: Schema.Types.ObjectId, ref: 'Playlist', default: null},
    likesPool: {type: Object, default: {playlists: []}},
    playlists: {type: [Schema.Types.ObjectId], ref: 'Playlist', default: []},
    // showcasePlaylists: {type: [Schema.Types.ObjectId], ref: 'Playlist', default: []},

    pinnedPresets: {type: [Schema.Types.ObjectId], ref: 'Preset', default: []},
    recentPresets: {type: [Schema.Types.ObjectId], ref: 'Preset', default: []},
    userPresets: {type: [Schema.Types.ObjectId], ref: 'Preset', default: []},
    defaultPresets: {type: [Schema.Types.ObjectId], ref: 'Preset'}
});

const User = mongoose.model('User', userSchema)

module.exports = User;