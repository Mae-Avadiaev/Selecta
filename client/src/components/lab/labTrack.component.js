import {
    LabTrackArtists,
    LabTrackCover,
    LabTrackInfo, LabTrackInfoCaptions, LabTrackInfoValues,
    LabTrackMain,
    LabTrackName, LabTrackText,
    StyledLabTrack,
} from "./labTrack.styles";
import playlistIcon from "./../../images/playlists-icon.png"

export const LabTrack = ({track}) => {

    const convertKeyCamelot = (key, mode) => {
        if (key === 0 && mode) return '8B'
        if (key === 1 && mode) return '3B'
        if (key === 2 && mode) return '10B'
        if (key === 3 && mode) return '5B'
        if (key === 4 && mode) return '12B'
        if (key === 5 && mode) return '7B'
        if (key === 6 && mode) return '2B'
        if (key === 7 && mode) return '9B'
        if (key === 8 && mode) return '4B'
        if (key === 9 && mode) return '11B'
        if (key === 10 && mode) return '6B'
        if (key === 11 && mode) return '1B'

        if (key === 0 && !mode) return '5A'
        if (key === 1 && !mode) return '12A'
        if (key === 2 && !mode) return '7A'
        if (key === 3 && !mode) return '2A'
        if (key === 4 && !mode) return '9A'
        if (key === 5 && !mode) return '4A'
        if (key === 6 && !mode) return '11A'
        if (key === 7 && !mode) return '6A'
        if (key === 8 && !mode) return '1A'
        if (key === 9 && !mode) return '8A'
        if (key === 10 && !mode) return '3A'
        if (key === 11 && !mode) return '10A'
    }

     const findDecade = (year) => {
        return (year.substring(2) - year.substring(2) % 10) + 's'
    }

    console.log(track)

    let artists = track ? track.artists.map(artist => artist.name).join(', ') : null

    let albumGenres = (track && track.album.genres) ? track.album.genres.join(', ') : null

    console.log ()
    let artistsGenres = (track && track.artists.genres) ? (track.artists.map(artist => artist.genres.join(', '))).join(', ') : null

    let releaseYear
    if (track) {
        if (track.album.release_date_precision === 'year')
            releaseYear = track.album.release_date
        else releaseYear = track.album.release_date.substring(0, 4)
    }

    let artistsPopularity = track ? (track.artists.map(artist => artist.popularity)).join(', ') : null
    // artistsPopularity = artistsPopularity.join(', ')

    return (
        <StyledLabTrack>
            <LabTrackMain>
                <LabTrackCover src={track ? track.album.images[0].url : playlistIcon}/>
                <LabTrackName>{track ? track.name : 'none'}</LabTrackName>
                <LabTrackArtists>{track ? artists : 'none'}</LabTrackArtists>
            </LabTrackMain>
            <LabTrackInfo>
                <LabTrackInfoCaptions>
                    <LabTrackText>album_genres:</LabTrackText>
                    <LabTrackText>artist_genres:</LabTrackText>
                    <LabTrackText>year:</LabTrackText>
                    <LabTrackText>decade:</LabTrackText>
                    <LabTrackText>label:</LabTrackText>
                    <LabTrackText>track_popularity:</LabTrackText>
                    <LabTrackText>album_popularity:</LabTrackText>
                    <LabTrackText>artist_popularity:</LabTrackText>
                    <LabTrackText>bpm:</LabTrackText>
                    <LabTrackText>key:</LabTrackText>
                    <LabTrackText>mode:</LabTrackText>
                    <LabTrackText>energy:</LabTrackText>
                    <LabTrackText>danceability:</LabTrackText>
                    <LabTrackText>instrumentalness:</LabTrackText>
                    <LabTrackText>speechiness:</LabTrackText>
                    <LabTrackText>acousticness:</LabTrackText>
                    <LabTrackText>liveness:</LabTrackText>
                    <LabTrackText>valence:</LabTrackText>
                    <LabTrackText>time_signature:</LabTrackText>
                </LabTrackInfoCaptions>
                <LabTrackInfoValues>
                    <LabTrackText>{track && albumGenres ? albumGenres : 'none'}</LabTrackText>
                    <LabTrackText>{track && artistsGenres ? artistsGenres : 'none'}</LabTrackText>
                    <LabTrackText>{track && releaseYear ? releaseYear : 'none'}</LabTrackText>
                    <LabTrackText>{track ? findDecade(releaseYear) : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.album.label : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.popularity : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.album.popularity : 'none'}</LabTrackText>
                    <LabTrackText>{track ? artistsPopularity : 'none'}</LabTrackText>
                    <LabTrackText>{track ? Math.round(track.tempo) : 'none'}</LabTrackText>
                    <LabTrackText>{track ? `${convertKeyCamelot(track.key)} ( ${track.key} )` : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.mode : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.energy : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.danceability : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.instrumentalness : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.speechiness : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.acousticness : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.liveness : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.valence : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.time_signature : 'none'}</LabTrackText>
                </LabTrackInfoValues>
            </LabTrackInfo>
        </StyledLabTrack>
    )
}