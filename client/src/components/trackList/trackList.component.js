import {StyledTrackList, CaptionBar, TrackListItems, CaptionBarItem, CaptionBarText} from "./trackList.styles";
import {TrackListItem} from "../trackListItem/trackListItem.component";
import data from "../../myjsonfile.json"

export const TrackList = ({playlist}) => {

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

    //request from db
    const trackListItemContent = data

    const  trackListItems = trackListItemContent.map((item, i) =>
        <TrackListItem key={i}
                       number={i + 1}
                       cover={item.album.images[0].url}
                       title={item.name}
                       artists={item.artists}
                       time={"4.21"}
                       bpm={Math.round(item.audio_features.tempo)}
                       width={100}
        />
    )

    return (
        <StyledTrackList>
            <CaptionBar>
                {captionBarItems}
            </CaptionBar>
            <TrackListItems>
                {trackListItems}
            </TrackListItems>
        </StyledTrackList>
    )
}