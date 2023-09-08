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
import {ColumnFlexContainer, RowFlexContainer, UndecoratedLink} from "../../app.styles";
import treeDots from "./../../images/three-dots.png"

export const Playlist = ({content}) => {

    const genres = ['reggae', 'hip hop', 'dub']
    return (
        <StyledPlaylist>
            <PlaylistMainContentContainer>
                <RowFlexContainer>
                    <PlaylistCover src={content.coverUrl}/>
                    <PlaylistInfoContainer>
                        <UndecoratedLink href={`https://open.spotify.com/playlist/${content.spotifyId}`}>
                            <PlaylistTitle>{content.name}</PlaylistTitle>
                        </UndecoratedLink>
                        {/*<PlaylistTagsContainer>*/}
                            {/*<PlaylistTagContainer>*/}
                        <PlaylistDetail style={{'margin-bottom': 0}}>{content.bpmRange}</PlaylistDetail>
                            {/*</PlaylistTagContainer>*/}
                            {/*<PlaylistTagContainer>*/}
                            {/*
                            {/*</PlaylistTagContainer>*/}
                        {/*</PlaylistTagsContainer>*/}
                        <PlaylistDetail>{`${content.tracks.length} tracks`}</PlaylistDetail>
                    </PlaylistInfoContainer>
                </RowFlexContainer>
                <GenresContainer>
                    {genres.map((genre, i) =>
                        <PlaylistTagContainer key={i}>
                            <PlaylistTag>{genre}</PlaylistTag>
                        </PlaylistTagContainer>
                    )}
                </GenresContainer>
            </PlaylistMainContentContainer>
            <PlaylistDurationContainer>
                {/*<PlaylistAmountContainer>*/}
                {/*    <PlaylistTrackAmount>{content.tracks.length}</PlaylistTrackAmount>*/}
                {/*    <PlaylistCaption>tracks</PlaylistCaption>*/}
                {/*</PlaylistAmountContainer>*/}
                {/*<PlaylistTag >{content.playlistDuration}</PlaylistTag>*/}
                <PlaylistMenu src={treeDots} />

            </PlaylistDurationContainer>
        </StyledPlaylist>
    )
}