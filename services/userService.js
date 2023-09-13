const MongooseService = require("./mongooseService");
const UserModel = require("../models/userModel")
const SpotifyWebApi = require("spotify-web-api-node");
const PlaylistModel = require("../models/playlistModel");
const mongoose = require('mongoose');
const TrackService = require('./trackService')
const TrackServiceInstance = new TrackService()

module.exports = class userService {

    constructor() {
        this.UserMongooseService = new MongooseService(UserModel)
        this.PlaylistMongooseService= new MongooseService(PlaylistModel)
    }

    async getAllUserLikesFromSpotify(accessToken) {
        //NOT TESTED
        const LIMIT = 50

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getMySavedTracks(
            {offset: 0, limit: LIMIT})
        console.log(response)
        const tracksAmount = response.body.total
        const pagesAmount = Math.ceil(tracksAmount / LIMIT)
        let allTracks = response.body.items

        for (let i = 0; i < pagesAmount; i++) {
            const response = await spotifyApi.getMySavedTracks(
                {offset: i * LIMIT, limit: LIMIT})

            allTracks = [...allTracks, ...response.body.items]
        }

        //request audio features
        await TrackServiceInstance.fillTracksWithInfo(allTracks, accessToken)

        console.log(`▶️ Retrieved ${allTracks.length} from Likes (Spotify)`)

        return allTracks
    }

    async getLikesSources(ids) {

        const likesSources = await this.PlaylistMongooseService.find(
            {"_id": {"$in": ids}})
        console.log(`▶️ Retrieved ${likesSources.length} likes source(s)`)

        return likesSources
    }

    async addLikesSource(playlistId, user) {

        const update = await this.UserMongooseService.update(user.id,
            {$push: {likesSources: playlistId}})

        console.log(`➕ Added one playlist to ${user.displayName}'s likes sources.`)

        return update
    }

    async deleteLikesSource(playlistId, user) {

        const oldArray = user.likesSources
        // console.log(oldArray, 'olg')
        // console.log(playlistId)
        // console.log(oldArray[0], playlistId, oldArray[0].equals(playlistId))
        // console.log(oldArray[1], playlistId, oldArray[1].equals(playlistId))
        const newArray = oldArray.filter(oldId => !oldId.equals(playlistId))

        // console.log(newArray)
        const update = await this.UserMongooseService.update(user.id,
            {likesSources: newArray})

        console.log(`➖ Deleted ${oldArray.length - newArray.length} playlist(s) from ${user.displayName}'s likes sources.`)

        return update
    }

    async getSyncedSources(ids) {
        const syncedSources = await this.PlaylistMongooseService.find(
            {"_id": {"$in": ids}})

        console.log(`▶️ Retrieved ${syncedSources.length} likes source(s)`)

        return syncedSources
    }

    async addSyncedSource(playlistId, user) {
        const update = await this.UserMongooseService.update(user.id,
            {$push: {syncedSources: playlistId}})

        console.log(`➕ Added one playlist to ${user.displayName}'s synced sources.`)

        return update
    }

    async deleteSyncedSource(playlistId, user) {
        const oldArray = user.syncedSources

        const newArray = oldArray.filter(oldId => oldId === playlistId)

        const update = await this.UserMongooseService.update(user.id,
            {syncedSources: newArray})

        console.log(`➖ Deleted ${oldArray.length - newArray.length} playlist(s) from ${user.displayName}'s synced sources.`)

        return update
    }

    async addTracksToLikesPool(tracks, likesPoolId) {

        console.log(tracks, 'ini-nini')
        // tracks.sort((a, b) => {
        //     return Date.parse(a.dateAdded) < Date.parse(b.dateAdded) ? 1 : -1
        // })
        tracks = tracks.slice(0).reverse()
        console.log(tracks, 'nono-ogogo')

        const trackIds = tracks.map(track => track._id)

        const res = await this.PlaylistMongooseService.update(likesPoolId, {
            $push: {tracks: {$each: trackIds, $position: 0}},
            $inc: {"trackAmount": trackIds.length}
        })

        console.log(`➕ Added ${trackIds.length} tracks to likes pool.`)

        return
    }

    async deleteTracksFromLikesPool(trackIds, likesPoolId) {

        await this.PlaylistMongooseService.update(likesPoolId, {
            $pullAll: {tracks: trackIds}, $inc: {"trackAmount": -trackIds.length}
        })

        console.log(`➖ Deleted ${trackIds.length} tracks from likes pool.`)

        return
    }

    async addPresetToPresetPool(preset, userId) {

        console.log(preset, 'pres')

        await this.UserMongooseService.update(userId, {
            $push: {presets: preset._id}
        })

        console.log(`➕ Added ${preset.name} to user's preset pool`)

        return
    }

    async addSeedToSeedPool(seed, userId) {
        await this.UserMongooseService.update(userId, {
            $push: {seeds: seed._id}
        })

        console.log(`➕ Added ${seed.name} to user's seeds`)

        return
    }

    async getSeeds(userId) {
        const user = await this.UserMongooseService.aggregate( [
            {$match: {_id: userId}},
            {$lookup: {
                    from: 'playlists',
                    localField: 'seeds',
                    foreignField: '_id',
                    as: "seeds"
            }}
        ])

        const seeds = user[0].seeds
        console.log(`▶️ Retrieved ${seeds.length} seeds`)

        return seeds
    }
}
