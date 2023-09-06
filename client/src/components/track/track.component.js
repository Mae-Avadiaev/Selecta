import {
    StyledTrackListItem, ThreeDots, TrackListArtist,
    TrackListCover,
    TrackListTitle,
    TrackListTitleContainer
} from "./track.styles";
import seedIcon from "../../images/seeds-icon1.png";
import {useNavigate} from "react-router-dom";

export const Track = ({track, setSelectedParams}) => {

    console.log(track, 'tytytytytyt')

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
                seedTracks: track.spotifyId
            }
        })})
        navigate('/add/presets')
    }

    return (
        <StyledTrackListItem>
            <TrackListCover onClick={() => {}} src={track.album.imageUrl}/>
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