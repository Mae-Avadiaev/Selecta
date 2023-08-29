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

        console.log(`▶️ Retrieved details of "${response.body.name}" (Spotify)`)

        return response.body
    }

    async getAllPlaylistTracksFromSpotify (accessToken, spotifyId, name) {

        const LIMIT = 50

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getPlaylistTracks(spotifyId,
            {offset: 0, limit: LIMIT})

        const tracksAmount = response.body.total
        const pagesAmount = Math.ceil(tracksAmount / LIMIT)
        let allTracks = response.body.items

        for (let i = 1; i <= pagesAmount; i++) {
            const response = await spotifyApi.getPlaylistTracks(spotifyId,
                {offset: i * LIMIT, limit: LIMIT})

            allTracks = [...allTracks, ...response.body.items]
        }

        console.log(`▶️ Retrieved ${response.body.items.length} track(s) from "${name}" (Spotify)`)

        return response.body.items
    }

    async createSelectaPlaylist(data) {
        const playlist = await this.MongooseServiceInstance.create(data)

        console.log(`☑️ Selecta playlist created for "${data.name}"`)

        return playlist
    }
}