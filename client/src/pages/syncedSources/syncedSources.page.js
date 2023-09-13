import {
    ActionButton,
    ActionButtonContainer,
    Fader,
    ItemsContainerWithTopMenu,
    TopMenu,
    TopMenuCancel,
    TopMenuTitle
} from "../../app.styles";
import React, {useEffect, useState} from "react";
import {useGetLikesSources} from "../../hooks/requests/useGetLikesSources";
import {
    SourcesNameContainer,
    SourcesNoCoverContainer, SourcesNoCoverImage,
    SourcesPlaylistCover, SourcesPlaylistName, SourcesPlaylistSelector, SourcesTrackAmount,
    StyledSourcesPlaylist
} from "../likesPoolSources/likePoolSourcesPage.styles";
import noCoverIcon from "../../images/spotify-no-cover-icon.svg";
import selectorUnfilled from "../../images/circle-not-filled.png";
import selectorFilled from "../../images/check-circle-filled.svg";
import {useGetSyncedSources} from "../../hooks/requests/useGetSyncedSources";
import {usePatchLikesSources} from "../../hooks/requests/usePatchLikesSources";
import {usePatchSyncedSources} from "../../hooks/requests/usePatchSyncedSources";

export const SyncedSourcesPage = () => {

    const {data: allSources} = useGetLikesSources()
    const {data: syncedSources} = useGetSyncedSources()

    const [changes, setChanges] = useState({added: null})
    // const [savedSyncSources, setSavedSyncedSources] = useState()

    useEffect(() => {
        if (syncedSources && syncedSources.length)
            setChanges({added: syncedSources[0]._id})
    }, [syncedSources])

    const saveChange = (action, id) => {
        if (action === 'add')
            setChanges({added: id})

        else if (action === 'delete')
            setChanges({added: null})
    }

    const handleSelectChanges = (playlistNum, action) => {
        const playlist = allSources[playlistNum]
        saveChange(action, playlist._id)
        allSources[playlistNum].isSynced = !playlist.isSynced
    }


    // console.log(allSources, 'aliii')
    // console.log(syncedSources, 'syyyn')
    // console.log(changes, 'chan')
    // console.log(syncedSources && !syncedSources.find((source) => source === source.id))
    // console.log(!changes.added.find((added) => added === allSources[0]._id))

    const {mutate: mutateSyncedSources} = usePatchSyncedSources()

    const requestChanges = () => {

        if (syncedSources && syncedSources.length && changes.added !== syncedSources[0]._id)
            mutateSyncedSources([syncedSources[0]._id, 'delete'])

        if (changes.added) {
            if (!syncedSources || !syncedSources.length || changes.added !== syncedSources[0]._id) {
                mutateSyncedSources([changes.added, 'add'])
            }
        }

        setChanges({added: null})
        window.history.back()
    }

    // console.log(!syncedSources.find((syncedSource) => syncedSource._id === allSources[1]._id))
    // console.log(!changes.added.find((added) => added === allSources[1]._id))
    // console.log(changes.deleted.find((deleted) => deleted === allSources[1]._id))

    return (
        <>
            <TopMenu>
                <TopMenuCancel onClick={() => window.history.back()}>cancel</TopMenuCancel>
                <TopMenuTitle>choose a source</TopMenuTitle>
            </TopMenu>
            <ItemsContainerWithTopMenu>
                {allSources ? allSources.map((source, i) => {
                    // console.log(changes.added === source._id, i)
                    // console.log(changes.added, source._id, i)
                    return (
                        <StyledSourcesPlaylist>
                            {source.coverUrl ? <SourcesPlaylistCover src={source.coverUrl}/> :
                                <SourcesNoCoverContainer>
                                    <SourcesNoCoverImage src={noCoverIcon}/>
                                </SourcesNoCoverContainer>}
                            <SourcesNameContainer>
                                <SourcesPlaylistName>{source.name}</SourcesPlaylistName>
                                <SourcesTrackAmount>{source.tracks.length} tracks</SourcesTrackAmount>
                            </SourcesNameContainer>
                            {/*{(syncedSources && (!syncedSources.find((syncedSource) => syncedSource._id === source._id) || savedSyncSources) &&*/}
                            {syncedSources && changes.added === source._id ?
                            // changes.deleted.find((deleted) => deleted === source._id) ?
                                <SourcesPlaylistSelector src={selectorFilled} onClick={() => handleSelectChanges(i, 'delete')}/> :
                                <SourcesPlaylistSelector src={selectorUnfilled} onClick={() => handleSelectChanges(i, 'add')}/>}
                            <ActionButtonContainer style={{justifyContent: 'center'}}>
                                <Fader/>
                                <ActionButton onClick={requestChanges}>done</ActionButton>
                            </ActionButtonContainer>
                        </StyledSourcesPlaylist>
                    )
                }) :
                    <></>
                }
            </ItemsContainerWithTopMenu>
        </>
    )
}