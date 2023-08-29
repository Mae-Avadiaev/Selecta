import {TrackListContainer} from "../add/addPage.styles";
import {useGetUserPlaylists} from "../../hooks/requests/useGetUserPlaylists";
import {
    SourcesCancel,
    SourcesLongButton, SourcesMenu, SourcesMenuTitle,
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
import likesCover from "../../images/liked-songs-cover.png"
import {useMutation, useQueryClient} from "react-query";
import {usePopup} from "../../hooks/usePopup";
import axios from "axios";
import {serverAddress} from "../../App";
import {makeRequest} from "../../utils/requests";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../../hooks/useSnackbar";
import {useGetLikesSources} from "../../hooks/requests/useGetLikesSources";
import {usePatchLikesSources} from "../../hooks/requests/usePatchLikesSources";


export const LikesPoolSourcesPage = () => {

    const {data: likesSourcesPlaylists} = useGetLikesSources()
    const likesSources = likesSourcesPlaylists ? likesSourcesPlaylists.map(playlist => playlist.spotifyId) : null
    console.log(likesSources, 'liiiiiiiiiiiii')
    const {data: allPlaylists, isSuccess: isAllPlaylists, hasNextPage, fetchNextPage} =
        useGetUserPlaylistsPaginated('spotify-playlists')
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
                    return {...prevState, added: [...prevState.added, id]}
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
                    return {...prevState, deleted: [...prevState.deleted, id]}
                })
            }
        }
    }

    console.log(changes, 'chssssssssssss')

    const handleSelectChanges = (pageNum, playlistNum, action) => {
        const playlist = allPlaylists.pages[pageNum].data.spotifyPlaylists[playlistNum]
        console.log(playlist.id, 'idd')
        saveChange(action, playlist.id)
        allPlaylists.pages[pageNum].data.spotifyPlaylists[playlistNum].isLikesPoolSource = !playlist.isLikesPoolSource
    }

    const {data: spotifyLikes, isSuccess: isSpotifyLikes} = useGetUserPlaylistsPaginated('spotify-likes')

    const [isLikesSelected, setIsLikesSelected] = useState(false)
    const handleSelectLikes = (action) => {
        saveChange(action, 'Liked Songs')
        setIsLikesSelected(prevState => !prevState)
    }

    // console.log(data)

    // useEffect(() => {
    //     if (allPlaylists) {
    //
    // }, [isAllPlaylists])

    // const likedPlaylist = {
    //     name: 'Liked Songs',
    //     tracks: {
    //         total: '...'
    //     },
    //     images: [{url: likesCover}],
    //     isLikesPoolSource: false
    // }
    //     allPlaylists.pages[0].data.spotifyPlaylists.unshift(likedPlaylist)
    // }
    // const queryClient = useQueryClient()

    // const addMutation = useMutation({
    //     mutationFn: () => {},
    //     onSuccess: (newPost) => {
    //         queryClient.setQueryData(['spotify-playlists'], (oldData) => {
    //             oldData.pages[0].data.spotifyPlaylists.unshift(likedPlaylist)
    //             return ({
    //                 // pageParams: [...oldData.pageParams],
    //                 pages: [oldData.pages[0], ...oldData.pages.slice(1)],
    //             })
    //         })
    //     }
    // })
    //
    // useEffect(() => {
    //     if(isAllPlaylists) addMutation.mutate()
    // }, [isAllPlaylists])
    //
    // const changeMutation = useMutation({
    //     mutationFn: () => {},
    //     onSuccess: (newPost) => {
    //         queryClient.setQueryData(['spotify-playlists'], (oldData) => {
    //
    //             console.log(spotifyLikes.pages[0])
    //             oldData.pages[0].data.spotifyPlaylists[0].tracks.total = spotifyLikes.pages[0].data.total
    //             oldData.pages[0].data.spotifyPlaylists[0].isLikedPoolSource = spotifyLikes.pages[0].data.isLikesPoolSource
    //             return ({
    //                 // pageParams: [...oldData.pageParams],
    //                 pages: [oldData.pages[0], ...oldData.pages.slice(1)],
    //             })
    //         })
    //     }
    // })
    //
    // useEffect(() => {
    //     if (isSpotifyLikes) changeMutation.mutate()
    // }, [isSpotifyLikes])

    const {options, openPopup} = usePopup()
    const navigate = useNavigate()
    const {openSnackbar} = useSnackbar()
    // const [isLoading, setIsLoading] = useState(false)
    const {mutate: mutateLikesSources, isLoading, isError} = usePatchLikesSources()

    const requestChanges = () => {

        if (changes.deleted.length) {

            // count track amount
            // const playlistsToBeDeleted = likesSourcesPlaylists.find((playlist) =>
            //     playlist.spotifyId === changes.deleted.find((deleted) => playlist.spotifyId === deleted))
            const playlistsToBeDeleted = likesSourcesPlaylists.filter((playlist) =>
               changes.deleted.includes(playlist.spotifyId))
            let amountTracksToDelete = 0

            playlistsToBeDeleted.map((playlist) => amountTracksToDelete += playlist.trackAmount)

            const popupContent = {
                header: 'are you sure?',
                caption: `do you want to delete ${amountTracksToDelete} tracks from your Selecta collection?`
            }

            openPopup(popupContent)
        }

        if (changes.added.length) {
            console.log(changes.added)
            changes.added.map((spotifyId, i) => {
                mutateLikesSources(spotifyId)
            })
            // console.log(isLoading)

            // setIsLoading(false)
            // console.log(isLoading)
            // window.history.back()
        }
    }

    return (
        isLoading ? <h1>Loading...</h1> :
        <>
            <SourcesMenu>
                <SourcesCancel onClick={() => window.history.back()}>cancel</SourcesCancel>
                <SourcesMenuTitle>add a playlist</SourcesMenuTitle>
            </SourcesMenu>
            <StyledSources>
                <StyledSourcesPlaylist>
                    <SourcesPlaylistCover src={likesCover}/>
                    <SourcesNameContainer>
                        <SourcesPlaylistName>Liked Songs</SourcesPlaylistName>
                        <SourcesTrackAmount>
                            {!isSpotifyLikes ? '... tracks' : `${spotifyLikes.pages[0].data.total} tracks`}
                        </SourcesTrackAmount>
                    </SourcesNameContainer>
                    {(isSpotifyLikes && spotifyLikes.pages[0].data.isLikesPoolSource) || isLikesSelected ?
                        <SourcesPlaylistSelector src={selectorFilled} onClick={() => handleSelectLikes('delete')}/> :
                        <SourcesPlaylistSelector src={selectorUnfilled} onClick={() => handleSelectLikes('add')}/>}
                </StyledSourcesPlaylist>
                {allPlaylists ? allPlaylists.pages.map((page, j) => {
                    page = page.data.spotifyPlaylists
                    return page.map((playlist, i) => {
                    // const key = Math.random()
                    return (
                        <StyledSourcesPlaylist ref={page.length >= 40 && page.length - 10 === i ? ref : null}>
                            {playlist.images.length ? <SourcesPlaylistCover src={playlist.images[0].url}/> :
                                <SourcesNoCoverContainer>
                                    <SourcesNoCoverImage src={noCoverIcon}/>
                                </SourcesNoCoverContainer>}
                            <SourcesNameContainer>
                                <SourcesPlaylistName>{playlist.name}</SourcesPlaylistName>
                                <SourcesTrackAmount>{playlist.tracks.total} tracks</SourcesTrackAmount>
                            </SourcesNameContainer>
                            {(!likesSources.find((source) => source === playlist.id) &&
                            !changes.added.find((added) => added === playlist.id)) ||
                            changes.deleted.find((deleted) => deleted === playlist.id) ?
                                <SourcesPlaylistSelector src={selectorUnfilled} onClick={() => handleSelectChanges(j, i, 'add')}/> :
                                <SourcesPlaylistSelector src={selectorFilled} onClick={() => handleSelectChanges(j, i, 'delete')}/>}
                        </StyledSourcesPlaylist>
                    )
                })}) : null}
                <SourcesLongButton onClick={requestChanges}>done</SourcesLongButton>
            </StyledSources>
        </>
    )
}