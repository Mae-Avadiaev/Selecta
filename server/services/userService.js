const MongooseService = require("./MongooseService");
const UserModel = require("../models/userModel")
const SpotifyWebApi = require("spotify-web-api-node");
const PlaylistModel = require("../models/playlistModel");

module.exports = class userService {

    constructor() {
        this.MongooseServiceUser = new MongooseService(UserModel)
        this.MongooseServicePlaylist = new MongooseService(PlaylistModel)
    }

    async getAllUserLikesFromSpotify (accessToken) {

        const LIMIT = 50

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getMySavedTracks(
            {offset: 0, limit: LIMIT})
        console.log(response)
        const tracksAmount = response.body.total
        const pagesAmount = Math.ceil(tracksAmount / LIMIT)
        let allTracks = response.body.items

        for (let i = 1; i <= pagesAmount; i++) {
            const response = await spotifyApi.getMySavedTracks(
                {offset: i * LIMIT, limit: LIMIT})

            allTracks = [...allTracks, ...response.body.items]
        }

        console.log(`▶️ Retrieved ${allTracks.length} from Likes (Spotify)`)

        return allTracks
    }

    async getLikesSources (ids) {

        const likesSources = await this.MongooseServicePlaylist.find(
            {"_id": {"$in": ids}})
        console.log(likesSources,'llliiiiiiiiidsfkjsd')
        console.log(`▶️ Retrieved ${likesSources.length}`)

        return likesSources
    }

    async addLikesSource (playlistId, user) {

        const oldArray = user.likesPool.playlists
        const newArray = [...oldArray, playlistId]

        const update = await this.MongooseServiceUser.update(user.id,
            {likesPool: {playlists: newArray}})

        console.log(`➕ Added one playlist to ${user.displayName}'s likes sources.`)

        return update
    }
}