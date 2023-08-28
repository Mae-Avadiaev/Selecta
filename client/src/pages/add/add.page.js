import {LongButton, MobilePageContainer} from "../../app.styles";
import {PageSwitcher} from "../../components/pageSwitcher/pageSwitcher.component";
import React, {useState} from "react";
import {OutletContainer} from "../listen/listenPage.styles";
import {Route, Routes, useNavigate, Outlet} from "react-router-dom";
import {useTouch} from "../../hooks/useTouch";
import {SwipeableScreen} from "../../components/swipeableScreen/swipeableScreen.component";
import Page404 from "../404/404.page";
import {TrackList} from "../../components/trackList/trackList.component";
import {useGetPlaylist} from "../../hooks/requests/useGetPlaylist";
import {useUser} from "../../hooks/auth/useUser";
import {TrackListContainer} from "./addPage.styles";

export const AddPage = () => {

    const pageSwitcherContent = [
        {name: 'likes', link: '/add/likes'},
        {name: 'search', link: '/add/search'},
    ]

    const {user} = useUser()
    // console.log(user)
    const navigate = useNavigate()
    // if (!user.likesPool.playlists.length) {
    //
    // }
    // const {data: trackListContent} = useGetPlaylist(likesId)
    // console.log(trackListContent, 'errrrrrrrrrrr')


    return (
        <Routes>
            <Route path='/' element={
                <SwipeableScreen pageSwitcherContent={pageSwitcherContent} startingPage={0} children={<Outlet/>}/>}>
                <Route path='/likes' element={
                    <>
                        <LongButton onClick={() => navigate('/settings/likes-pool-sources')} style={{margin: '20px 0'}}>add a playlist</LongButton>
                        {!user.likesPool.playlists.length &&
                            <h1 style={{position: 'absolute'}}>load playlist(s) where you keep your likes</h1>
                        }
                        <TrackListContainer>
                            <TrackList content={0}/>
                        </TrackListContainer>
                    </>
                }/>
                <Route path='/search' element={
                    <>
                        <h1>hey</h1>
                    </>
                }/>
                <Route path='*' element={<Page404 />} />
            </Route>
        </Routes>
    )
}