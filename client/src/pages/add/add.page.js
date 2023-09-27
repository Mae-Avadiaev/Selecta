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
import React, {useState, useEffect, useRef, useCallback} from "react";
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
import {findNeighbourKeys, objectMap} from "../../utils/misc"
import useInfiniteScroll from 'react-infinite-scroll-hook';
import {useGetSearchResults} from "../../hooks/requests/useGetSearchResults";
import {useDebounce} from "../../hooks/useDebounce";


export const AddPage = () => {

    const {data: likedTracks, hasNextPage, fetchNextPage, isFetchingNextPage} = useGetLikedTracksPaginated()
    const navigate = useNavigate()

    const [selectedParams, setSelectedParams] = useState({fetch: false})
    const [playingAudioId, setPlayingAudioId] = useState(null)


    // console.log(selectedParams, 'seiiiiiiiiii')
    // reformat data
    let params
    if (selectedParams.fetch) {

        let targetKey, targetMode, neighbourKeys
        if (selectedParams.preset.keyMode === 'same') {
            targetKey = selectedParams.track.key
            targetMode = selectedParams.track.mode
        } else if (selectedParams.preset.keyMode === 'adjacent') {
            // console.log(selectedParams.track.key.number, selectedParams.track.mode)
            neighbourKeys = [
                {
                    target_key: selectedParams.track.key.number,
                    target_mode: selectedParams.track.mode
                },
                ...findNeighbourKeys(selectedParams.track.key.number, selectedParams.track.mode)]
        }

        // console.log(selectedParams, 'siliktoddddddddddda')

        // console.log(selectedParams.track.danceability)
        // console.log(selectedParams.preset.maxDanceability)
        // console.log(selectedParams.track.danceability + selectedParams.preset.maxDanceability)
        // console.log('m')
        // console.log(selectedParams.track.instrumentalness)
        // console.log(selectedParams.preset.minInstrumentalness)
        // console.log(selectedParams.track.instrumentalness + selectedParams.preset.minInstrumentalness)

        // console.log(selectedParams.preset, 'llllllllllolo')

        let paramsToProcess = {
            min_acousticness: (selectedParams.track.acousticness + selectedParams.preset.minAcousticness * 1).toFixed(3),
            max_acousticness: (selectedParams.track.acousticness + selectedParams.preset.maxAcousticness * 1).toFixed(3),
            min_danceability: (selectedParams.track.danceability + selectedParams.preset.minDanceability * 1).toFixed(3),
            max_danceability: (selectedParams.track.danceability + selectedParams.preset.maxDanceability * 1).toFixed(3),
            min_energy: (selectedParams.track.energy + selectedParams.preset.minEnergy * 1).toFixed(3),
            max_energy: (selectedParams.track.energy + selectedParams.preset.maxEnergy * 1).toFixed(3),
            min_instrumentalness: (selectedParams.track.instrumentalness + selectedParams.preset.minInstrumentalness * 1).toFixed(3),
            max_instrumentalness: (selectedParams.track.instrumentalness + selectedParams.preset.maxInstrumentalness * 1).toFixed(3),
            min_valence: (selectedParams.track.valence + selectedParams.preset.minValence * 1).toFixed(3),
            max_valence: (selectedParams.track.valence + selectedParams.preset.maxValence * 1).toFixed(3),
        }

        params = objectMap(paramsToProcess, (value) => {
            if (value < 0) return 0
            else if (value > 1) return 1
            else return value
        })

        const otherParams = {
            limit: selectedParams.params.amount,
            seed_tracks: selectedParams.params.seedTracks,
            min_tempo: selectedParams.track.bpm + selectedParams.preset.minBpm,
            max_tempo: selectedParams.track.bpm + selectedParams.preset.maxBpm,
            min_popularity: selectedParams.track.popularity + selectedParams.preset.minPopularity,
            max_popularity: selectedParams.track.popularity + selectedParams.preset.maxPopularity,
            target_key: targetKey,
            target_mode: targetMode,
            neighbourKeys: neighbourKeys
        }

        Object.assign(params, otherParams)
    }


    const {data: recommended, isSuccess, isLoading} = useGetRecommendedTracks(params, selectedParams.fetch, setSelectedParams)
    const [resultTracks, setResultTracks] = useState()

    useEffect(() => {
        if (recommended) {
            setResultTracks(recommended.map(track => {
                    return {...track, selected: true}
                })
            )
        }
    }, [recommended])

    // useEffect(() => {
    //     if (isSuccess)
    //         setSelectedParams(prevState => { return {
    //             ...prevState,
    //             fetch: false
    //         }})
    // }, [isSuccess])
    // const { ref, inView } = useInView();

    // const [inView, setInView] = useState(false)

    // useEffect(() => {
    //
    //         console.log(inView, 'has')
    //
    //     if (inView && hasNextPage) {
    //         // console.log(entry.target, 'has')
    //         // fetchNextPage();
    //         setInView(false)
    //     }
    // }, [inView, fetchNextPage, hasNextPage]);
    //
    // const setInView = (inView, entry) => {
    //     if (inView  && hasNextPage) {
    //         fetchNextPage();
    //     }
    // }

    // const [sentryRef] = useInfiniteScroll({
    //     loading: isLoading,
    //     hasNextPage: hasNextPage,
    //     delayInMs: 0,
    //     onLoadMore: fetchNextPage
    // })

    const [searchQuery, setSearchQuery] = useState(null)
    const debouncedSearchQuery = useDebounce(searchQuery, 800)
    const {data: searchResultTracks} = useGetSearchResults(debouncedSearchQuery)

    // console.log(setPlayingAudioId, 'gggggggggg')

    const intObserver = useRef()
    // const sentryRef = useCallback(post => {
    //     if (isFetchingNextPage) return
    //
    //     if (intObserver.current) intObserver.current.disconnect()
    //
    //     intObserver.current = new IntersectionObserver(posts => {
    //         if (posts[0].isIntersecting && hasNextPage) {
    //             console.log('We are near the last post!')
    //             fetchNextPage()
    //         }
    //     })
    //
    //     if (post) intObserver.current.observe(post)
    // }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    // console.log('KKKKKKKKKKKKKKKKKKKKKKKREEEEEEEEEEEEEEEEEEEEE')

    return (
        <Routes>
            <Route path='/' element={
                <>
                    {/*<TopMenu>*/}
                    {/*    <TopMenuTitle>choose a track</TopMenuTitle>*/}
                    {/*</TopMenu>*/}
                    <SearchBar setSearchQuery={setSearchQuery}/>
                    <ItemsContainerWithSearchBar>
                        {searchQuery && searchResultTracks && searchResultTracks.map((track, i) => {
                            return (
                                <Track key={i} track={track} setSelectedParams={setSelectedParams}/>
                            )
                        })}
                        {!searchQuery && likedTracks && !likedTracks.pages[0].data.likedTracks.length &&
                            <FirstLoadAddContainer>
                                <h1>load playlist(s) where you keep your likes</h1>
                                <LongButton onClick={() => navigate('/settings/likes-pool-sources')} style={{margin: '20px 0'}}>
                                    add a playlist
                                </LongButton>
                            </FirstLoadAddContainer>
                        }
                        {!searchQuery && likedTracks && likedTracks.pages[0].data.likedTracks.length && likedTracks.pages.map((page, i) => {
                            page = page.data.likedTracks
                            return page.map((track, j) => {
                                return (
                                        <Track key={i + 1 * j + 1} track={track} setSelectedParams={setSelectedParams}
                                            // ref={page.length >= 40 && page.length - 10 === i ? sentryRef : null}
                                            rightElem='info'
                                        />
                                )
                            })
                        })}
                    </ItemsContainerWithSearchBar>
                </>
            }/>
            <Route path='/presets/*' element={
                <PresetsPage selectedParams={selectedParams} setSelectedParams={setSelectedParams}/>
            }/>
            <Route path='/results/*' element={
                <ResultsPage
                    resultTracks={resultTracks} setResultTracks={setResultTracks}
                    selectedParams={selectedParams} setSelectedParams={setSelectedParams}
                    playingAudioId={playingAudioId} setPlayingAudioId={setPlayingAudioId}
                />
            }/>
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}