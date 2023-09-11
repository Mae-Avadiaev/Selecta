const jwt = require("jsonwebtoken");
const SpotifyWebApi = require("spotify-web-api-node");
const aes256 = require("aes256");
const User = require("../models/userModel");
const Preset = require("../models/presetModel");
const {defaultPresetContent} = require("../initial_configs");
const axios = require("axios");
const queryString = require("node:querystring");

const MongooseService = require( "./mongooseService" ); // Data Access Layer
const UserModel = require( "../models/userModel" ); // Database Model
const PlaylistModel = require("../models/playlistModel")

module.exports = class AuthService {

    constructor() {
        this.MongooseServiceInstance = new MongooseService(UserModel)
        this.MongooseServicePlaylist = new MongooseService(PlaylistModel)
    }

    async requestSpotifyAccessToken (code) {

        return axios.post(
            "https://accounts.spotify.com/api/token",
            queryString.stringify({
                                  grant_type: "authorization_code",
                                  code: code,
                                  redirect_uri: process.env.REDIRECT_URI_DECODED,
                              }),
    {
                headers: {
                    Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
    }

    async grantAccessToken (code) {

        const response = await this.requestSpotifyAccessToken(code)

        // getting or creating a user, putting encrypted access token to db
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(response.data.access_token)
        const spotifyUserData = (await spotifyApi.getMe()).body

        // calculate expiration time

        const accessTokenExpiresBy = new Date().getTime() + (response.data.expires_in * 1000)

        const encryptedRefreshToken = aes256.encrypt(process.env.SECRET_KEY, response.data.refresh_token);

        let user = await this.MongooseServiceInstance.findOne({spotifyId: spotifyUserData.id})
        if (!user) {
            //CREATE USER
            // const defaultPresets = await Preset.create(defaultPresetContent)
            // const defaultPresetsIds = defaultPresets.map(preset => preset._id)

            const likesPool = await this.MongooseServicePlaylist.create({type: 'likes-pool'})

            user = await this.MongooseServiceInstance.create({
                spotifyId: spotifyUserData.id,
                avatarUrl: spotifyUserData.images.length ? spotifyUserData.images[0].url : undefined,
                displayName: spotifyUserData.display_name,
                accessToken: response.data.access_token,
                accessTokenExpiresBy: accessTokenExpiresBy,
                refreshToken: encryptedRefreshToken,
                // defaultPresets: defaultPresetsIds,
                likesPool: likesPool
            })

            // log
            console.log(`👤 New user created for ${spotifyUserData.display_name}`)

        }

        await this.MongooseServiceInstance.update(user._id, {
            accessToken: response.data.access_token,
            accessTokenExpiresBy: accessTokenExpiresBy,
            refreshToken: encryptedRefreshToken
        })

        return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
}