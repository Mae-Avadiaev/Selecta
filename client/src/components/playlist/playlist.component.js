import {
    GenresContainer, PlaylistAmountContainer,
    PlaylistCaption,
    PlaylistCover,
    PlaylistDetail, PlaylistDetailsContainer,
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

    // const genres = ['reggae', 'hip hop', 'dub']
    return (
        <UndecoratedLink href={`https://open.spotify.com/playlist/${content.spotifyId}`}>
            <StyledPlaylist>
                {/*<PlaylistMainContentContainer>*/}
                    {/*<RowFlexContainer>*/}
                        <PlaylistCover src={content.coverUrl}/>
                        <PlaylistInfoContainer>
                            <PlaylistTitle>{content.name}</PlaylistTitle>
                            <GenresContainer>
                                {content.genres.map((genre, i) =>
                                    <PlaylistTagContainer key={i}>
                                        <PlaylistTag>{genre}</PlaylistTag>
                                    </PlaylistTagContainer>
                                )}
                            </GenresContainer>
                            {/*<PlaylistTagsContainer>*/}
                                {/*<PlaylistTagContainer>*/}
                            {/*<PlaylistDetail style={{'margin-bottom': 0}}>{content.bpmRange}</PlaylistDetail>*/}
                                {/*</PlaylistTagContainer>*/}
                                {/*<PlaylistTagContainer>*/}
                                {/*
                                {/*</PlaylistTagContainer>*/}
                            {/*</PlaylistTagsContainer>*/}
                            <PlaylistDetailsContainer>
                                <PlaylistDetail>{`${content.bpmRange && content.bpmRange.min}-${content.bpmRange && content.bpmRange.max} bpm`}</PlaylistDetail>
                                <PlaylistDetail>{`${content.tracks.length} tracks`}</PlaylistDetail>
                            </PlaylistDetailsContainer>
                        </PlaylistInfoContainer>
                    {/*</RowFlexContainer>*/}

                {/*</PlaylistMainContentContainer>*/}
                {/*<PlaylistDurationContainer>*/}
                    {/*<PlaylistAmountContainer>*/}
                    {/*    <PlaylistTrackAmount>{content.tracks.length}</PlaylistTrackAmount>*/}
                    {/*    <PlaylistCaption>tracks</PlaylistCaption>*/}
                    {/*</PlaylistAmountContainer>*/}
                    {/*<PlaylistTag >{content.playlistDuration}</PlaylistTag>*/}
                    {/*<PlaylistMenu src={treeDots} />*/}

                {/*</PlaylistDurationContainer>*/}
            </StyledPlaylist>
        </UndecoratedLink>
    )
}