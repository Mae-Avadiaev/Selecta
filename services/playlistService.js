const MongooseService = require("./mongooseService");
const PlaylistModel = require("../models/playlistModel");
const SpotifyWebApi = require("spotify-web-api-node");
const TrackModel = require("../models/trackModel")
const TrackService = require("./trackService")
const TrackServiceInstance = new TrackService()

module.exports = class playlistService {

    constructor() {
        this.PlaylistMongooseService = new MongooseService(PlaylistModel)
        this.TracksMongooseService = new MongooseService(TrackModel)
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

        // CAUTION
        allTracks.map(track => {
            Object.assign(track, track.track)
            track.track = undefined
        })

        await TrackServiceInstance.fillTracksWithInfo(allTracks, accessToken)

        console.log(`▶️ Retrieved ${response.body.items.length} track(s) from "${name}" (Spotify)`)

        return allTracks
    }

    async createSelectaPlaylist(data) {
        const playlist = await this.PlaylistMongooseService.create(data)

        console.log(`☑️ Created Selecta playlist for "${data.name}"`)

        return playlist
    }

    async deleteSelectaPlaylist(id) {
        await this.PlaylistMongooseService.delete(id)
        console.log(`➖ Deleted one playlist from Selecta DB.`)
        return
    }

    async getTracksFromPlaylistDBPaginated(playlist, offset, limit) {

        const tracksIds = playlist.tracks.slice(offset, offset + limit)
        const tracks = await this.TracksMongooseService.find({_id: {'$in': tracksIds}})

        console.log(`▶️ Retrieved ${tracks.length} tracks from "${playlist.name}" (Selecta)`)

        return tracks
    }

    async createSpotifyPlaylist(playlist, spotifyTrackIds, accessToken) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.createPlaylist(playlist.name, {
            description: playlist.description
        })

        // console.log(response)

        // await this.PlaylistMongooseService.update(playlist._id, {
        //     spotifyId: response.id
        // })
        //

        const spotifyURIs = spotifyTrackIds.map(id => `spotify:track:${id}`)
        await spotifyApi.addTracksToPlaylist(response.body.id, spotifyURIs)

        console.log(`▶️ Created playlist "${playlist.name}" with ${spotifyURIs.length} tracks (Spotify)`)

        return response.body
    }

    async getPlaylistCoverUrl(playlist, accessToken) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getPlaylist(playlist.spotifyId)

        console.log(`🌄 Retrieved "${playlist.name}"'s cover image URL`)

        return response.body.images[0].url

    }
}