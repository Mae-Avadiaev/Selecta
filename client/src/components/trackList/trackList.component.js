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
    TrackInfoContainer, TrackSubsectionContainer, TrackInfo
} from "./trackList.styles";
import data from "../../myjsonfile.json"
import {

} from "../trackListItem/trackListItem.styles";

export const TrackList = ({content}) => {

    const captionBarItemsContent = [
        {title: "#", width: 100},
        {title: "Title", width: 100},
        {title: "Time", width: 100},
        {title: "BPM", width: 100},
        {title: "Time", width: 100},
        {title: "Key", width: 100},
        {title: "Year", width: 100},
        {title: "Preview", width: 100},
        {title: "Date added", width: 100},
        {title: "Yeps", width: 100},
        {title: "Tags", width: 100}
    ]

    const captionBarItems = captionBarItemsContent.map((item) =>
        <CaptionBarItem key={Math.random()} width={item.width}>
            <CaptionBarText>
                {item.title}
            </CaptionBarText>
        </CaptionBarItem>
    )


    // Track list item
    let trackListItems
    if (content) {

        console.log(content[0])
        trackListItems = content.map((track, i) => {

            let artistsUnited = ''
            track.artists.forEach((artist) => {
                artistsUnited += artist.name + ', '
            })
            artistsUnited = artistsUnited.slice(0, -2)

            return (
                <StyledTrackListItem key={i}>
                    {/*<TrackListNumber>{i + 1}</TrackListNumber>*/}
                    <TrackListCover src={track.album.imageUrl}/>
                    <TrackInfoContainer>
                        <TrackListTitleContainer>
                            <TrackListTitle> {track.name} </TrackListTitle>
                            <TrackListArtist> {artistsUnited} </TrackListArtist>
                        </TrackListTitleContainer>
                        <TrackSubsectionContainer>
                            <TrackInfo>{track.bpm}</TrackInfo>
                            <TrackInfo>{track.album.releaseYear}</TrackInfo>
                            <TrackInfo>{track.duration.representation}</TrackInfo>
                        </TrackSubsectionContainer>
                    </TrackInfoContainer>
                </StyledTrackListItem>
            )
        })
    }

    return (
        <StyledTrackList>
            <CaptionBar>
                {captionBarItems}
            </CaptionBar>
            <TrackListItems>
                {content ? trackListItems : null}
            </TrackListItems>
        </StyledTrackList>
    )
}