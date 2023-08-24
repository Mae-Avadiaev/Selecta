import {TrackListContainer} from "../add/addPage.styles";
import {useGetUserPlaylists} from "../../hooks/requests/useGetUserPlaylists";
import {
    SourcesLongButton,
    SourcesNameContainer, SourcesNoCoverContainer, SourcesNoCoverImage,
    SourcesPlaylistCover,
    SourcesPlaylistName,
    SourcesPlaylistSelector, SourcesTrackAmount, StyledSources,
    StyledSourcesPlaylist
} from "./likePoolSourcesPage.styles";
import {ColumnFlexContainer, LongButton, MobilePageContainer} from "../../app.styles";
import {useGetUserPlaylistsPaginated} from "../../hooks/requests/useGetUserPlaylistsPaginated";
import {useEffect, useState} from "react";
import { useInView } from "react-intersection-observer";
import noCoverIcon from "../../images/spotify-no-cover-icon.svg"
import selectorUnfilled from "../../images/circle-not-filled.png"
import selectorFilled from "../../images/check-circle-filled.svg"


export const LikesPoolSourcesPage = () => {

    const {data: allPlaylists, hasNextPage, fetchNextPage} = useGetUserPlaylistsPaginated('spotify-playlists')
    const { ref, inView } = useInView();
    const [changes, setChanges] = useState({added: [], deleted: []})

    useEffect(() => {

        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    const saveChange = (action, id) => {
        if (action === 'add') {
            const foundDeletedId = changes.deleted.find(deletedId => deletedId === id)
            if (foundDeletedId) {
                setChanges(prevState => {
                    const newDeletedArray = prevState.deleted.filter(deletedId => deletedId !== foundDeletedId)
                    return {...prevState, deleted: [...newDeletedArray]
                    }})
            } else {
                setChanges(prevState => {
                    prevState.added.push(id)
                    const newAddedArray = prevState.added
                    return {...prevState, added: [...newAddedArray]}
                })
            }
        } else if (action === 'delete') {
            const foundAddedId = changes.added.find(addedId => addedId === id)
            if (foundAddedId) {
                setChanges(prevState => {
                    const newAddedArray = prevState.added.filter(addedId => addedId !== foundAddedId)
                    return {...prevState, added: [...newAddedArray]}
                })
            } else {
                setChanges(prevState => {
                    prevState.deleted.push(id)
                    const newDeletedArray = prevState.deleted
                    return {...prevState, deleted: [...newDeletedArray]}
                })
            }
        }
    }

    const handleSelectChanges = (pageNum, playlistNum, action) => {
        const playlist = allPlaylists.pages[pageNum].data.spotifyPlaylists[playlistNum]
        saveChange(action, playlist.id)
        allPlaylists.pages[pageNum].data.spotifyPlaylists[playlistNum].isLikesPoolSource = !playlist.isLikesPoolSource
    }

    return (
            <StyledSources>
                {allPlaylists ? allPlaylists.pages.map((page, j) => {
                    page = page.data.spotifyPlaylists
                    return page.map((playlist, i) => {
                        console.log(playlist)
                    return (
                        <StyledSourcesPlaylist ref={page.length >= 40 && page.length - 40 === i ? ref : null}>
                            {playlist.images.length ? <SourcesPlaylistCover src={playlist.images[0].url}/> :
                                <SourcesNoCoverContainer>
                                    <SourcesNoCoverImage src={noCoverIcon}/>
                                </SourcesNoCoverContainer>}
                            <SourcesNameContainer>
                                <SourcesPlaylistName>{playlist.name}</SourcesPlaylistName>
                                <SourcesTrackAmount>{playlist.tracks.total} tracks</SourcesTrackAmount>
                            </SourcesNameContainer>
                            {playlist.isLikesPoolSource === false ?
                                <SourcesPlaylistSelector src={selectorUnfilled} onClick={() => handleSelectChanges(j, i, 'add')}/> :
                            <SourcesPlaylistSelector src={selectorFilled} onClick={() => handleSelectChanges(j, i, 'delete')}/>}
                        </StyledSourcesPlaylist>
                    )
                })}) : null}
                <SourcesLongButton>done</SourcesLongButton>
            </StyledSources>
    )
}