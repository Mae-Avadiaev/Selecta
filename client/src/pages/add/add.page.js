import {
    ItemsContainerWithSearchBar,
    ItemsContainerWithTopMenu,
    ItemsContainerWithTopMenuAndSearchBar,
    LongButton,
    MobilePageContainer,
    TopMenu,
    TopMenuTitle
} from "../../app.styles";
import {PageSwitcher} from "../../components/pageSwitcher/pageSwitcher.component";
import React, {useState} from "react";
import {Route, Routes, useNavigate, Outlet} from "react-router-dom";
import {useTouch} from "../../hooks/useTouch";
import {SwipeableScreen} from "../../components/swipeableScreen/swipeableScreen.component";
import Page404 from "../404/404.page";
import {TrackList} from "../../components/trackList/trackList.component";
import {useGetPlaylist} from "../../hooks/requests/useGetPlaylist";
import {useUser} from "../../hooks/auth/useUser";
import {FirstLoadAddContainer, TrackListContainer} from "./addPage.styles";
import {useGetLikedTracksPaginated} from "../../hooks/requests/useGetLikedTracksPaginated";
import {Track} from "../../components/track/track.component";
import {
    SourcesCancel,
    SourcesMenu,
    SourcesMenuTitle,
    StyledSources
} from "../likesPoolSources/likePoolSourcesPage.styles";
import {PresetsPage} from "../presets/presets.page";
import {SearchBar} from "../../components/searchBar/searchBar.component";
import {ResultsPage} from "../results/results.page";
import {useGetRecommendedTracks} from "../../hooks/requests/useGetRecommendedTracks";
import {findNeighbourKeys} from "../../utils/misc"

export const AddPage = () => {

    const {data: likedTracks, hasNextPage, fetchNextPage} = useGetLikedTracksPaginated()
    const navigate = useNavigate()

    const [selectedParams, setSelectedParams] = useState({fetch: false})

    console.log(selectedParams, 'seiiiiiiiiii')
    // reformat data
    let params
    if (selectedParams.fetch) {

        let targetKey, targetMode, neighbourKeys
        if (selectedParams.preset.keyMode === 'same') {
            targetKey = selectedParams.track.key
            targetMode = selectedParams.track.mode
        } else if (selectedParams.preset.keyMode === 'adjacent') {
            neighbourKeys = findNeighbourKeys()
        }

        let min_acousticness = selectedParams.track.acousticness + selectedParams.preset.minAcousticness
        if (min_acousticness > 1) min_acousticness = 1
        else if (min_acousticness < 0) min_acousticness = 0

        let max_acousticness = selectedParams.track.acousticness + selectedParams.preset.maxAcousticness
        if (max_acousticness > 1) max_acousticness = 1
        else if (max_acousticness < 0) max_acousticness = 0

        let min_dance

        params = {
            limit: selectedParams.params.amount,
            seed_tracks: selectedParams.params.seedTracks,
            min_acousticness: min_acousticness,
            max_acousticness: max_acousticness,
            min_danceability: selectedParams.track.danceability + selectedParams.preset.minDanceability,
            max_danceability: selectedParams.track.danceability + selectedParams.preset.maxDanceability,
            min_energy: selectedParams.track.energy + selectedParams.preset.minEnergy,
            max_energy: selectedParams.track.energy + selectedParams.preset.maxEnergy,
            min_instrumentalness: selectedParams.track.instrumentalness + selectedParams.preset.minInstrumentalness,
            max_instrumentalness: selectedParams.track.instrumentalness + selectedParams.preset.maxInstrumentalness,
            min_popularity: selectedParams.track.popularity + selectedParams.preset.minPopularity,
            max_popularity: selectedParams.track.popularity + selectedParams.preset.maxPopularity,
            min_tempo: selectedParams.track.tempo + selectedParams.preset.minTempo,
            max_tempo: selectedParams.track.tempo + selectedParams.preset.maxTempo,
            min_valence: selectedParams.track.valence + selectedParams.preset.minValence,
            max_valence: selectedParams.track.valence + selectedParams.preset.maxValence,
            target_key: targetKey,
            target_mode: targetMode,
            neighbourKeys: neighbourKeys
        }

        // params.keys.map ()
    }

    const {data: recommended, isSuccess} = useGetRecommendedTracks(params, selectedParams.fetch)

    if (isSuccess)
        setSelectedParams(prevState => { return {
            ...prevState,
            fetch: false
        }})

    return (
        <Routes>
            <Route path='/' element={
                <>
                    {/*<TopMenu>*/}
                    {/*    <TopMenuTitle>choose a track</TopMenuTitle>*/}
                    {/*</TopMenu>*/}
                    <SearchBar/>
                    <ItemsContainerWithSearchBar>
                    {likedTracks && !likedTracks.pages[0].data.likedTracks.length ?
                        <FirstLoadAddContainer>
                            <h1>load playlist(s) where you keep your likes</h1>
                            <LongButton onClick={() => navigate('/settings/likes-pool-sources')} style={{margin: '20px 0'}}>add a playlist</LongButton>
                        </FirstLoadAddContainer> :
                        likedTracks && likedTracks.pages.map((page, i) => {
                            page = page.data.likedTracks
                            return page.map((track, j) => {
                                return (
                                    <Track key={i * page.length + j} track={track} setSelectedParams={setSelectedParams}/>
                                )
                            })
                        })
                    }
                    </ItemsContainerWithSearchBar>
                </>
            }/>
            <Route path='/presets/*' element={
                <PresetsPage selectedParams={selectedParams} setSelectedParams={setSelectedParams}/>
            }/>
            <Route path='/results' element={
                <ResultsPage resultTracks={recommended}/>
            }/>
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}