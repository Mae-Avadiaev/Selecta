const MongooseService = require("./mongooseService")
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

        if (tracks[0].track) {
            tracks.map(track => {
                Object.assign(track, track.track)
                track.track = undefined
            })
        }

        let foundTracks = [], createdTracks = []
        const DBTracks = await Promise.all(tracks.map(async (track) => {
            let trackFound = await this.TrackMongooseService.aggregate([
                {$match: {spotifyId: track.id}},
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
                trackFound = trackFound[0]
                trackFound.album = trackFound.album[0]
                foundTracks.push(trackFound)
                // allTracks.push(trackFound)
                return (trackFound)
            } else {
                // CREATE TRACK
                // ALBUM

                // console.log(track.album)
                // console.log(track, 'legato')

                // get release year
                let releaseYear
                if (track.album.release_date_precision === 'year')
                    releaseYear = track.album.release_date
                else releaseYear = track.album.release_date.substring(0, 4)

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
                    {spotifyId: track.album.id})

                if (!dbAlbum) {
                    dbAlbum = await this.AlbumMongooseService.create({
                        spotifyId: track.album.id,
                        name: track.album.name,
                        spotifyHref: track.album.external_urls.spotify,
                        imageUrl: track.album.images[0].url,
                        releaseDate: track.album.release_date,
                        releaseYear: releaseYear,
                        label: track.album.label
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
                await Promise.all(track.artists.map(async (artist) => {
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
                    artistsArray.push(dbArtist)
                }))

                // TRACK
                // create track
                let dbTrack = await this.TrackMongooseService.create({
                    spotifyId: track.id,
                    name: track.name,
                    artists: artistsIds,
                    album: dbAlbum._id,
                    spotifyHref: track.href,
                    preview: track.preview_url,
                    uri: track.uri,
                    popularity: track.popularity,
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
                    acousticness: track.audioFeatures.acousticness,
                    genres: track.genres
                    // tags: tagsIds
                })

                // hacker way to assign props of Mongo DB obj
                dbTrack = {
                    ...dbTrack
                }
                dbTrack = {
                    ...dbTrack._doc,
                    album: dbAlbum,
                    artists: artistsArray
                }

                createdTracks.push(dbTrack)
                // allTracks.push(dbTrack)
                return dbTrack
            }
        }))

        // console.log(DBTracks, 'db')

        console.log(`🔍 Found: ${foundTracks.length}, Created: ${createdTracks.length}, All tracks: ${DBTracks.length}`)

        return DBTracks
    }

    async fillTracksWithAudioFeatures(tracks, spotifyApi) {

        const AUDIO_LIMIT = 100

        const tracksAmount = tracks.length
        const allTrackSpotifyIds = tracks.map(track => track.id)
        const audioFeaturesRequestAmount = Math.ceil(tracksAmount / AUDIO_LIMIT)
        // let audioFeaturesCount
        for (let i = 0; i < audioFeaturesRequestAmount; i++) {
            const idsToRequest = allTrackSpotifyIds.slice(
                i * AUDIO_LIMIT, i * AUDIO_LIMIT + AUDIO_LIMIT)
            const response = await spotifyApi.getAudioFeaturesForTracks(idsToRequest)
            response.body.audio_features.map((audioFeature, j) => {
                tracks[i * AUDIO_LIMIT + j].audioFeatures = audioFeature
            })
            // console.log(response.body.audio_features.length, 'lea')
        }

        // console.log(tracks[0], 'audion')

        return tracks
    }

    async fillTracksWithGenres(tracks, spotifyApi) {
        const AUDIO_LIMIT = 50

        // console.log(tracks[0], 'tytyt')
        // console.log(tracks.length)

        if (tracks[0].track) {
            tracks = tracks.map(track => {
                track.track.added_at = track.added_at
                return (track.track)
            })
        }

        // console.log(tracks[0], 'tytytidjfidjfidj')

        const allArtistsArrays = tracks.map(track => track.artists)
        const allArtistsSpotifyIds = []
        tracks.map(track => track.artists.map(artist => allArtistsSpotifyIds.push(artist.id)))
        const artistAmount = allArtistsSpotifyIds.length
        const genresRequestAmount = Math.ceil(artistAmount / AUDIO_LIMIT)
        let allArtists = []
        for (let i = 0; i < genresRequestAmount; i++) {
            const idsToRequest = allArtistsSpotifyIds.slice(
                i * AUDIO_LIMIT, i * AUDIO_LIMIT + AUDIO_LIMIT)
            const response = await spotifyApi.getArtists(idsToRequest)
            allArtists = [...allArtists, ...response.body.artists]
        }


         // console.log(allArtists, 'alllllllllllllllaa')
        let artistsIndex = 0
        tracks.map((track, i) => {
            let genreArray = []
            track.artists.map((artist, j) => {
                genreArray = [...genreArray, ...allArtists[artistsIndex].genres]
                artistsIndex++
                if (tracks[i].artists.length - 1 === j)
                    tracks[i].genres = genreArray
            })
        })

        // console.log(tracks[0].genres, 'grengrenada')
        // console.log(tracks[1].genres, 'grengrenada')
        // console.log(tracks[2].genres, 'grengrenada')

        // console.log(tracks.length)
        return tracks
    }

    async fillTracksWithInfo(tracks, accessToken) {

        if (tracks[0].track) {
            tracks.map(track => {
                Object.assign(track, track.track)
                track.track = undefined
            })
        }

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const tracksWithFeatures = await this.fillTracksWithAudioFeatures(
            tracks, spotifyApi)

        // console.log(tracksWithFeatures[0], 'infa2')

        const tracksWithInfo = await this.fillTracksWithGenres(
            tracksWithFeatures, spotifyApi)

        // console.log(tracksWithFeatures[0], 'infa3')


        console.log(`▶️ Retrieved info for ${tracksWithInfo.length} tracks.`)

        return tracksWithInfo
    }

    async getRecommendations(params, accessToken) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getRecommendations(params)

        console.log(`▶️ Retrieved ${response.body.tracks.length} recommended track(s)`)

        return response.body.tracks
    }

    async getPlayingTrackData(accessToken) {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(accessToken)

        const response = await spotifyApi.getMyCurrentPlayingTrack()

        if (Object.keys(response.body).length) {
            Object.assign(response.body, response.body.item)
            delete response.body.item
        }


        console.log(Object.keys(response.body).length ? `🎧 Retrieved currently playing track` : `🎧 Retrieved track on pause`)
        // console.log(response.body, 'BODE')
        return Object.keys(response.body).length ? response.body : null
    }
}