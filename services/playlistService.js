const MongooseService = require("./mongooseService");
const PlaylistModel = require("../models/playlistModel");
const SpotifyWebApi = require("spotify-web-api-node");
const TrackModel = require("../models/trackModel")
const TrackService = require("./trackService")
const TrackServiceInstance = new TrackService()
const UserService = require("./userService")
const UserServiceInstance = new UserService()

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

    async getAllPlaylistTracksFromSpotify (accessToken, spotifyId, name, offset = 0) {

        const LIMIT = 50

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getPlaylistTracks(spotifyId,
            {offset: offset, limit: LIMIT})

        const tracksAmount = response.body.total - offset
        const pagesAmount = Math.ceil(tracksAmount / LIMIT)
        let allTracks = response.body.items

        for (let i = 1; i <= pagesAmount; i++) {
            const response = await spotifyApi.getPlaylistTracks(spotifyId,
                {offset: i * LIMIT + offset, limit: LIMIT})

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

    async syncTracks(playlistIds, accessToken, likesPoolId) {
        let newTracksAmount = 0
        await Promise.all(playlistIds.map(async (syncedSourceId) => {
            const syncedPlaylist = await this.PlaylistMongooseService.findById(syncedSourceId)
            const dbTracks = syncedPlaylist.tracks

            const spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(accessToken)

            let OFFSET = syncedPlaylist.tracks.length - 10
            OFFSET = OFFSET > 0 ? OFFSET : 0

            const latestTracksData = await this.getAllPlaylistTracksFromSpotify(
                accessToken, syncedPlaylist.spotifyId,
                syncedPlaylist.name, OFFSET)

            let newTracks
            if (latestTracksData.length) {
                const latestTracks = await TrackServiceInstance.findOrCreateTracks(latestTracksData)
                newTracks = latestTracks.filter(latestTrack => !dbTracks.find(dbTrack =>
                    dbTrack._id.equals(latestTrack._id)))
            }

            if (newTracks) {
                const newTrackIds = newTracks.map(track => track._id)
                // console.log(newTrackIds)
                await this.PlaylistMongooseService.update(syncedSourceId, {
                    $push: {tracks: {$each: newTrackIds}}
                })
                await UserServiceInstance.addTracksToLikesPool(newTracks, likesPoolId)
            }
            newTracksAmount += newTracks.length
        }))

        console.log(`🔄 Synced ${newTracksAmount} tracks with the likes pool`)

        return
    }
}