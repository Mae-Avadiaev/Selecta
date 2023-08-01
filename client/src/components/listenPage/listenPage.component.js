import {PageSwitcher} from "../pageSwitcher/pageSwitcher.component";
import {MobilePageContainer} from "../../app.styles";
import {Presets} from "../presets/presets.component";
import {Route, Routes, useNavigate, Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {TrackList} from "../trackList/trackList.component";
import {useQuery} from "react-query";
import {makeRequest} from "../../utils/requests";

export const ListenPage = () => {

    const pageSwitcherContent = [
        {name: 'likes', link: '/listen/likes'},
        {name: 'search', link: '/listen/track-search'}
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        navigate(pageSwitcherContent[activeIndex].link)
    }, [activeIndex])

    // const { isLoading, data: response, error, refetch } = useQuery(["presets"],
    //     () => makeRequest('GET', '/v1/playlist', {type: 'seeds'}, navigate))

    const likesQuery = useQuery(
        ['likes'],
        () => makeRequest('GET', )
    )

    return (
        <Routes>
            <Route path={'/'} element={
                <MobilePageContainer>
                    <PageSwitcher pages={pageSwitcherContent} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    <Outlet/>
                </MobilePageContainer> }>
                <Route path="/likes" element={
                    <div style={{height: '57vh', overflow: 'scroll'}}>
                        {/*<TrackList content={response ? response.data.tracks ? response.data.tracks.allTracks : null : null} setSelectedSeedTrack={setSelectedSeedTrack}/>*/}
                    </div>
                }/>
                <Route path="/track-search" element={<></>}/>
            </Route>
        </Routes>
    )
};