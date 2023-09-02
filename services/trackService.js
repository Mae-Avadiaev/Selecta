const MongooseService = require("./MongooseService")
const TrackModel = require("../models/trackModel")
const AlbumModel = require("../models/albumModel");
const CategoryModel = require("../models/tagCategoryModel");
const TagModel = require("../models/tagModel");
const ArtistModel = require("../models/artistModel");
const colorThief = require("colorthief");
const {findDecade, getRepresentationInSec, getCamelot, getClasic} = require("../utils/misc");
const axios = require("axios");
const https = require("https");
const SpotifyWebApi = require("spotify-web-api-node");

module.exports = class trackService {

    constructor() {
        this.TrackMongooseService = new MongooseService(TrackModel)
        this.AlbumMongooseService = new MongooseService(AlbumModel)
        this.MongooseServiceInstanceCategory = new MongooseService(CategoryModel)
        this.MongooseServiceInstanceTag = new MongooseService(TagModel)
        this.ArtistMongooseService = new MongooseService(ArtistModel)
    }

    async findOrCreateTracks (tracks) {

        let foundTracks = [], createdTracks = [], allTracks = []
        const DBTracks = await Promise.all(tracks.map(async (track) => {
            const trackFound = await this.TrackMongooseService.aggregate([
                {$match: {spotifyId: track.track.id}},
                {$lookup: {
                        from: 'artists',
                        localField: 'artists',
                        foreignField: '_id',
                        as: "artists"
                    }},
                {$lookup: {
                        from: 'tags',
                        localField: 'tags',
                        foreignField: '_id',
                        as: "tags"
                    }},
                {$lookup: {
                        from: 'albums',
                        localField: 'album',
                        foreignField: '_id',
                        as: "album"
                    }}
            ])

            if (trackFound.length) {
                foundTracks.push(trackFound[0])
                allTracks.push(trackFound[0])

            } else {
                // CREATE TRACK
                // ALBUM

                // get release year
                let releaseYear
                if (track.track.album.release_date_precision === 'year')
                    releaseYear = track.track.album.release_date
                else releaseYear = track.track.album.release_date.substring(0, 4)

                // find dominant colors
                // const image = new Image(640, 640)
                // let palette
                // image.onload = function(){
                //     // act only after image load
                //     console.log(image);
                //
                //     // then colorThief and get the color value
                //     palette = colorThief.getPalette(track.track.album.images[0].url, 3)
                //     console.log(color);
                // };
                // image.src = track.track.album.images[0].url;
                // const palette = await colorThief.getPalette(track.track.album.images[0].url, 3)

                // axios.defaults.timeout = 30000;
                // axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

                // const response = await axios.get(track.track.album.images[0].url,  { responseType: 'arraybuffer' })
                // const buffer = Buffer.from(response.data, "utf-8")

                // console.log(buffer, 'reeeeeeeeeeeeeeee')
                // return
                // const palette = await colorThief.getPalette(track.track.album.images[0].url, 3)
                // console.log(palette)

                // find or create album
                let dbAlbum = await this.AlbumMongooseService.findOne(
                    {spotifyId: track.track.album.id})

                if (!dbAlbum) {
                    dbAlbum = await this.AlbumMongooseService.create({
                        spotifyId: track.track.album.id,
                        name: track.track.album.name,
                        spotifyHref: track.track.album.external_urls.spotify,
                        imageUrl: track.track.album.images[0].url,
                        releaseDate: track.track.album.release_date,
                        releaseYear: releaseYear,
                        label: track.track.album.label
                    })
                }

                // let tagsIds = []
                // let tagsArray = []

                // // TAGS
                // // find or create genre category
                // if (track.track.album.genres) {
                //     let genreCategory = await this.MongooseServiceInstanceCategory.findOne({name: 'Genre'})
                //     // if (!genreCategory)
                //     //     genreCategory = await this.MongooseServiceInstanceCategory.create({name: 'Genre'})
                //
                //     // find or create track genre tags
                //     await Promise.all(track.track.album.genres.map(async (genre) => {
                //         let genreTag = await this.MongooseServiceInstanceTag.findOne(
                //             {name: genre, category: genreCategory._id})
                //         if (!genreTag) {
                //             genreTag = await this.MongooseServiceInstanceTag.create(
                //                 {name: genre, category: genreCategory._id})
                //         }
                //     }))
                //     tagsArray.push(genreTag)
                //     tagsIds.push(genreTag._id)
                // }
                //
                //
                // // find or create decade category
                // let decadeCategory = await Category.findOne({name: 'Decade'})
                // // if (!decadeCategory)
                // //     decadeCategory = await Category.create({name: "Decade"})
                //
                // // find or create decade tag
                // let decadeTag = await Tag.findOne({name: findDecade(releaseYear), category: decadeCategory._id})
                // if (!decadeTag) {
                //     decadeTag = await Tag.create({name: findDecade(releaseYear), category: decadeCategory._id})
                // }
                // tagsArray.push(decadeTag)
                // tagsIds.push(decadeTag._id)
                //
                //
                // // find or create yes/no category seed
                // let seedCategory = await Category.findOne({name: 'Seed'})
                // // if (!seedCategory)
                // //     seedCategory = await Category.create({name: "Seed"})
                //
                // // find or create seed yes/no tag
                // let seedTag = await Tag.findOne({name: '1', category: seedCategory._id})
                // if (!seedTag) {
                //     seedTag = await Tag.create({name: '1', category: seedCategory._id})
                // }
                // tagsArray.push(seedTag)
                // tagsIds.push(seedTag._id)


                // ARTISTS
                // find or create artists
                let artistsArray = []
                let artistsIds = []
                await Promise.all(track.track.artists.map(async (artist) => {
                    let dbArtist = await this.ArtistMongooseService.findOne(
                        {spotifyId: artist.id})

                    if (!dbArtist) {
                        dbArtist = await this.ArtistMongooseService.create({
                            spotifyId: artist.id,
                            name: artist.name,
                            spotifyHref: artist.external_urls.spotify,
                            imageUrl: artist.images ? artist.images.url : null,
                            followers: artist.folowers ? artist.folowers.total : null,
                            genres: artist.genres ? artist.genres : null,
                        })
                    }

                    // artistsArray.push(artist.name)
                    artistsIds.push(dbArtist._id)
                }))

                // TRACK
                // create track
                const dbTrack = await this.TrackMongooseService.create({
                    spotifyId: track.track.id,
                    name: track.track.name,
                    artists: artistsIds,
                    album: dbAlbum._id,
                    spotifyHref: track.track.href,
                    preview: track.track.preview_url,
                    uri: track.track.uri,
                    popularity: track.track.popularity,
                    dateAdded: track.added_at ? track.added_at : null,

                    danceability: track.audioFeatures.danceability,
                    duration: {
                        ms: track.audioFeatures.duration_ms,
                        sec: Math.floor(track.audioFeatures.duration_ms / 1000),
                        representation: getRepresentationInSec(track.audioFeatures.duration_ms)
                    },
                    energy: track.audioFeatures.energy,
                    instrumentalness: track.audioFeatures.instrumentalness,
                    key: {
                        number: track.audioFeatures.key,
                        camelot: getCamelot(track.audioFeatures.key, track.audioFeatures.mode),
                        classic: getClasic(track.audioFeatures.key, track.audioFeatures.mode)
                    },
                    mode: track.audioFeatures.mode,
                    bpm: Math.round(track.audioFeatures.tempo),
                    valence: track.audioFeatures.valence,
                    acousticness: track.audioFeatures.acousticness
                    // tags: tagsIds
                })

                createdTracks.push(dbTrack)
                allTracks.push(dbTrack)
            }
        }))

        console.log(`🔍 Found: ${foundTracks.length}, Created: ${createdTracks.length}, All tracks: ${allTracks.length}`)

        return allTracks
    }

    async fillTracksWithAudioFeatures(tracks, accessToken) {

        const AUDIO_LIMIT = 100
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const tracksAmount = tracks.length
        const allTrackSpotifyIds = tracks.map(track => track.track.id)
        const audioFeaturesRequestAmount = Math.ceil(tracksAmount / AUDIO_LIMIT)
        let audioFeaturesCount
        for (let i = 0; i < audioFeaturesRequestAmount; i++) {
            const idsToRequest = allTrackSpotifyIds.slice(
                i * AUDIO_LIMIT, i * AUDIO_LIMIT + AUDIO_LIMIT)
            const response = await spotifyApi.getAudioFeaturesForTracks(idsToRequest)
            response.body.audio_features.map((audioFeature, j) => {
                tracks[i * AUDIO_LIMIT + j].audioFeatures = audioFeature
            })
            audioFeaturesCount = response.body.audio_features.length
        }

        console.log(`▶️ Retrieved audio features for ${audioFeaturesCount} tracks.`)

        return
    }

    async getRecommendations(params, accessToken) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        console.log(params)
        const response = await spotifyApi.getRecommendations(params)

        console.log(`▶️ Retrieved ${response.body.tracks.length} recommended track(s)`)

        return response.body.tracks
    }
}