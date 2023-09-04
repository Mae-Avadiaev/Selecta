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

export const AddPage = () => {

    const {data: likedTracks, hasNextPage, fetchNextPage} = useGetLikedTracksPaginated()
    const navigate = useNavigate()

    const [selectedParams, setSelectedParams] = useState({fetch: false})

    const {data: recommended, isSuccess} = useGetRecommendedTracks(selectedParams)

    console.log(isSuccess)
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
                    {likedTracks && !likedTracks.pages.length ?
                        <FirstLoadAddContainer>
                            <h1>load playlist(s) where you keep your likes</h1>
                            <LongButton onClick={() => navigate('/settings/likes-pool-sources')} style={{margin: '20px 0'}}>add a playlist</LongButton>
                        </FirstLoadAddContainer> :
                        likedTracks && likedTracks.pages.map(page => {
                            page = page.data.likedTracks
                            return page.map(track => {
                                return (
                                    <Track track={track} setSelectedParams={setSelectedParams}/>
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