import {
    LabTrackArtists,
    LabTrackCover,
    LabTrackInfo, LabTrackInfoCaptions, LabTrackInfoValues,
    LabTrackMain,
    LabTrackName, LabTrackText,
    StyledLabTrack,
} from "./labTrack.styles";
import playlistIcon from "./../../images/playlists-icon.png"
import {useState} from "react";
import {convertKeyCamelot, findDecade} from "../../utils/misc";

export const LabTrack = ({track, i}) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        const audio = document.getElementById(`audio${i}`)
        console.log(`audio${i}`)
        console.log(track.preview_url)
        isPlaying ? audio.pause() : audio.play()
        setIsPlaying(prevState => !prevState)
    }



    let artists = track ? track.artists.map(artist => artist.name).join(', ') : null

    let albumGenres = (track && track.album.genres) ? track.album.genres.join(', ') : null

    let artistsGenres = (track && track.artists.genres) ? (track.artists.map(artist => artist.genres.join(', '))).join(', ') : null

    let releaseYear
    if (track) {
        if (track.album.release_date_precision === 'year')
            releaseYear = track.album.release_date
        else releaseYear = track.album.release_date.substring(0, 4)
    }

    let artistsPopularity = track ? (track.artists.map(artist => artist.popularity)).join(', ') : null
    // artistsPopularity = artistsPopularity.join(', ')

    const artistsIds = track ? track.artists.map(artist =>  artist.id).join(', ') : null

    return (
        <StyledLabTrack>
            <LabTrackMain>
                <LabTrackCover src={track ? track.album.images[0].url : playlistIcon} onClick={togglePlay}/>
                <LabTrackName>{track ? track.name : 'none'}</LabTrackName>
                <LabTrackArtists style={{margin: '0', fontSize: '0.7em'}}>{track ? track.id : 'none'}</LabTrackArtists>
                <LabTrackArtists>{track ? artists : 'none'}</LabTrackArtists>
                <LabTrackArtists style={{margin: '0', fontSize: '0.7em'}}>{track ? artistsIds : 'none'}</LabTrackArtists>
                <audio id={`audio${i}`} style={{width: '250px', marginTop: '2em'}}>
                    <source src={track ? track.preview_url : null} type="audio/mpeg"/>
                </audio>
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
                    <LabTrackText>{track && track.album.label ? track.album.label : 'none'}</LabTrackText>
                    <LabTrackText>{track ? track.popularity : 'none'}</LabTrackText>
                    <LabTrackText>{track && track.album.popularity ? track.album.popularity : 'none'}</LabTrackText>
                    <LabTrackText>{track && artistsPopularity ? artistsPopularity : 'none'}</LabTrackText>
                    <LabTrackText>{track ? Math.round(track.tempo) : 'none'}</LabTrackText>
                    <LabTrackText>{track ? `${convertKeyCamelot(track.key, track.mode)} ( ${track.key} )` : 'none'}</LabTrackText>
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