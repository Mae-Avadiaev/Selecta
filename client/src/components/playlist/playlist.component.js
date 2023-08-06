import {
    GenresContainer, PlaylistAmountContainer,
    PlaylistCaption,
    PlaylistCover,
    PlaylistDetail,
    PlaylistDurationContainer,
    PlaylistInfoContainer,
    PlaylistMainContentContainer,
    PlaylistMenu,
    PlaylistTag,
    PlaylistTagContainer,
    PlaylistTagsContainer,
    PlaylistTitle,
    PlaylistTrackAmount,
    StyledPlaylist
} from "./playlist.styles";
import {ColumnFlexContainer, RowFlexContainer} from "../../app.styles";
import treeDots from "./../../images/three-dots.png"

export const Playlist = ({content}) => {
    return (
        <StyledPlaylist>
            <PlaylistMainContentContainer>
                <RowFlexContainer>
                    <PlaylistCover src={content.coverUrl}/>
                    <PlaylistInfoContainer>
                        <PlaylistTitle>{content.name}</PlaylistTitle>
                        {/*<PlaylistTagsContainer>*/}
                            {/*<PlaylistTagContainer>*/}
                        <PlaylistDetail style={{'margin-bottom': 0}}>{content.bpmRange}</PlaylistDetail>
                            {/*</PlaylistTagContainer>*/}
                            {/*<PlaylistTagContainer>*/}
                            {/*
                            {/*</PlaylistTagContainer>*/}
                        {/*</PlaylistTagsContainer>*/}
                        <PlaylistDetail>{'sorted by energy'}</PlaylistDetail>
                    </PlaylistInfoContainer>
                </RowFlexContainer>
                <GenresContainer>
                    {content.genres.map((genre, i) =>
                        <PlaylistTagContainer key={i}>
                            <PlaylistTag>{genre}</PlaylistTag>
                        </PlaylistTagContainer>
                    )}
                </GenresContainer>
            </PlaylistMainContentContainer>
            <PlaylistDurationContainer>
                <PlaylistAmountContainer>
                    <PlaylistTrackAmount>{content.trackAmount}</PlaylistTrackAmount>
                    <PlaylistCaption>tracks</PlaylistCaption>
                </PlaylistAmountContainer>
                <PlaylistTag >{content.playlistDuration}</PlaylistTag>
                <PlaylistMenu src={treeDots} />

            </PlaylistDurationContainer>
        </StyledPlaylist>
    )
}