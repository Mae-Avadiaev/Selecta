import {
    StyledTrackList,
    CaptionBar,
    TrackListItems,
    CaptionBarItem,
    CaptionBarText,
    StyledTrackListItem,
    TrackListArtist,
    TrackListCover,
    TrackListNumber,
    TrackListSummary,
    TrackListTitle,
    TrackListTitleContainer,
    TrackInfoContainer, TrackSubsectionContainer, TrackInfo, ThreeDots
} from "./trackList.styles";
import data from "../../myjsonfile.json"
import threeDots from './../../images/three-dots.png'
import seedIcon from './../../images/seeds-icon1.png'
import {useNavigate} from "react-router-dom";

export const TrackList = ({content, setSelectedSeedTrack}) => {

    const navigate = useNavigate()

    // Track list item
    let trackListItems
    if (content) {

        trackListItems = content.map((track, i) => {

            let artistsUnited = ''
            track.artists.forEach((artist) => {
                artistsUnited += artist.name + ', '
            })
            artistsUnited = artistsUnited.slice(0, -2)

            return (
                <StyledTrackListItem key={i}>
                    <TrackListCover src={track.album.imageUrl}/>
                    <TrackListTitleContainer>
                        <TrackListTitle> {track.name} </TrackListTitle>
                        <TrackListArtist> {artistsUnited} </TrackListArtist>
                    </TrackListTitleContainer>
                        {/*<TrackSubsectionContainer>*/}
                        {/*    <TrackInfo>{track.bpm}</TrackInfo>*/}
                        {/*    <TrackInfo>{track.album.releaseYear}</TrackInfo>*/}
                        {/*    <TrackInfo>{track.duration.representation}</TrackInfo>*/}
                        {/*</TrackSubsectionContainer>*/}
                    <ThreeDots src={seedIcon} onClick={() => {setSelectedSeedTrack(track); navigate('/seeds/presets')}}/>
                </StyledTrackListItem>
            )
        })
    }

    return (
        <StyledTrackList>
            <TrackListItems>
                {content ? trackListItems : null}
            </TrackListItems>
        </StyledTrackList>
    )
}