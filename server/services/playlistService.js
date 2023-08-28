const MongooseService = require("./MongooseService");
const PlaylistModel = require("../models/playlistModel");
const SpotifyWebApi = require("spotify-web-api-node");

module.exports = class playlistService {

    constructor() {
        this.MongooseServiceInstance = new MongooseService(PlaylistModel)
    }

    async getSpotifyPlaylistDetails (accessToken, spotifyId) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getPlaylist(spotifyId)

        return response.body
    }

    async getSpotifyPlaylistTracks (accessToken, spotifyId, name) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        // get playlist from Spotify
        const response = await spotifyApi.getPlaylistTracks(spotifyId)

        // log
        console.log(`▶️ Retrieved ${response.body.items.length} track(s) from ${name} (Spotify)`)

        return response.body.items
    }

    async createSelectaPlaylist(data) {
        return await this.MongooseServiceInstance.create(data)
    }
}