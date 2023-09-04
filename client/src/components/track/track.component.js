import {
    StyledTrackListItem, ThreeDots, TrackListArtist,
    TrackListCover,
    TrackListTitle,
    TrackListTitleContainer
} from "./track.styles";
import seedIcon from "../../images/seeds-icon1.png";
import {useNavigate} from "react-router-dom";

export const Track = ({track, setSelectedParams}) => {

    let artistsUnited = ''
    track.artists.forEach((artist) => {
        artistsUnited += artist.name + ', '
    })
    artistsUnited = artistsUnited.slice(0, -2)

    const navigate = useNavigate()

    const handleSelectClick = () => {
        setSelectedParams(prevState => {return ({
            ...prevState,
            track: track,
            params: {
                ...prevState.params,
                seed_tracks: track.spotifyId
            }
        })})
        navigate('/add/presets')
    }

    return (
        <StyledTrackListItem>
            <TrackListCover src={track.album[0].imageUrl}/>
            <TrackListTitleContainer>
                <TrackListTitle> {track.name} </TrackListTitle>
                <TrackListArtist> {artistsUnited} </TrackListArtist>
            </TrackListTitleContainer>
            {/*<TrackSubsectionContainer>*/}
            {/*    <TrackInfo>{track.bpm}</TrackInfo>*/}
            {/*    <TrackInfo>{track.album.releaseYear}</TrackInfo>*/}
            {/*    <TrackInfo>{track.duration.representation}</TrackInfo>*/}
            {/*</TrackSubsectionContainer>*/}
            <ThreeDots src={seedIcon} onClick={handleSelectClick}/>
        </StyledTrackListItem>
    )
}