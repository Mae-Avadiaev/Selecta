import {
    StyledTrackListItem,
    TrackListNumber,
    TrackListSummary,
    TrackListCover,
    TrackListTitleContainer,
    TrackListTitle,
    TrackListArtist
} from "./trackListItem.styles";

export const TrackListItem = ({number, cover, title, artists}) => {

    let artistsUnited = ''
    artists.forEach((artist) => {
        artistsUnited += artist.name + ', '
    })
    artistsUnited = artistsUnited.slice(0, -2)

    return (
        <StyledTrackListItem>
            <TrackListNumber>{number}</TrackListNumber>
            <TrackListSummary>
                <TrackListCover src={cover}/>
                <TrackListTitleContainer>
                    <TrackListTitle> {title} </TrackListTitle>
                    <TrackListArtist> {artistsUnited} </TrackListArtist>
                </TrackListTitleContainer>
            </TrackListSummary>

        </StyledTrackListItem>
    )
}