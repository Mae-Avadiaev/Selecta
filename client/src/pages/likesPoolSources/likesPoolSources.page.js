import {TrackListContainer} from "../add/addPage.styles";
import {useGetUserPlaylists} from "../../hooks/requests/useGetUserPlaylists";
import {
    SourcesLongButton,
    SourcesNameContainer,
    SourcesPlaylistCover,
    SourcesPlaylistName,
    SourcesPlaylistSelector, SourcesTrackAmount, StyledSources,
    StyledSourcesPlaylist
} from "./likePoolSourcesPage.styles";
import {ColumnFlexContainer, LongButton, MobilePageContainer} from "../../app.styles";

export const LikesPoolSourcesPage = () => {

    const {data: allPlaylists} = useGetUserPlaylists('spotify-playlists')
    console.log(allPlaylists)



    return (
            <StyledSources>
                {allPlaylists ? allPlaylists.map((playlist, i) => {
                    return (
                        <StyledSourcesPlaylist>
                            <SourcesPlaylistCover src={playlist.images[0].url}/>
                            <SourcesNameContainer>
                                <SourcesPlaylistName>{playlist.name}</SourcesPlaylistName>
                                <SourcesTrackAmount>{playlist.tracks.total} tracks</SourcesTrackAmount>
                            </SourcesNameContainer>

                            <SourcesPlaylistSelector />
                        </StyledSourcesPlaylist>

                    )
                }) : null}
                <SourcesLongButton>add playlists</SourcesLongButton>
            </StyledSources>
    )
}