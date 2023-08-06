import {PageSwitcher} from "../../components/pageSwitcher/pageSwitcher.component";
import {
    ColumnFlexContainer,
    LongButton,
    MobilePageContainer,
} from "../../app.styles";
import {Presets} from "../../components/presets/presets.component";
import {Route, Routes, useNavigate, Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {TrackList} from "../../components/trackList/trackList.component";
import {useQuery} from "react-query";
import {makeRequest} from "../../utils/requests";
import {statesList} from "../../utils/misc";
import {States} from "../../components/states/states.component";
import {OutletContainer, SeedsScrollContainer} from "./listenPage.styles";
import {useTouch} from "../../hooks/useTouch";
import {useGetPlaylist} from "../../hooks/requests/useGetPlaylist";
import {useUser} from "../../hooks/auth/useUser";
import {Playlist} from "../../components/playlist/playlist.component";

export const ListenPage = () => {

    // const pageSwitcherContent = [
    //     {name: 'likes', link: '/listen/likes'},
    //     {name: 'search', link: '/listen/track-search'}
    // ]

    const pageSwitcherContent = [
        {name: 'states', link: '/listen/states'},
        {name: 'seeds', link: '/listen/seeds'},
        {name: 'genres', link: '/listen/genres'},
    ]

    const [activeIndex, setActiveIndex] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        navigate(pageSwitcherContent[activeIndex].link)
    }, [activeIndex])

    // const { isLoading, data: response, error, refetch } = useQuery(["presets"],
    //     () => makeRequest('GET', '/v1/playlist', {type: 'seeds'}, navigate))

    // const likesQuery = useQuery(
    //     ['likes'],
    //     () => makeRequest('GET', )
    // )

    const switchPage = (to) => {
        if (to === 'prev' && activeIndex !== 0)
            setActiveIndex(prevState => prevState - 1)
        else if (to === 'next' && activeIndex !== pageSwitcherContent.length - 1)
            setActiveIndex(prevState => prevState + 1)
    }

    const {
        onTouchStart: onTouchStartX,
        onTouchMove: onTouchMoveX,
        onTouchEnd: onTouchEndX
    } = useTouch('horizontal', () => switchPage('next'), () => switchPage('prev'))

    const {
        onTouchStart: onTouchStartY,
        onTouchMove: onTouchMoveY,
        onTouchEnd: onTouchEndY,
    } = useTouch('vertical', () => true, () => true)

    const blockXWhenY = () => {
        const isSwipeY = onTouchEndY()
        if (!isSwipeY)
            onTouchEndX()
    }

    const {user} = useUser()
    // console.log(user, 'uuuuuuuuuuuuuuuu')
    const content = [
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
        {
            name: 'No One - Captain Planet Disco Edit',
            coverUrl: 'https://i.scdn.co/image/ab67616d00001e022f7deda5a63cd3194111f594',
            bpmRange: '120 - 125 bpm',
            genres: ['balearic', 'soulful', 'house'],
            trackAmount: 34,
            playlistDuration: '13 h 22 m'
        },
    ]
    // const {data: seeds} = useGetPlaylist(user.seedsId)

    return (
        <Routes>
            <Route path={'/'} element={
                <MobilePageContainer>
                    <PageSwitcher pages={pageSwitcherContent} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                    <OutletContainer onTouchStart={(e) => {onTouchStartY(e); onTouchStartX(e)}}
                                     onTouchMove={(e) => {onTouchMoveY(e); onTouchMoveX(e)}}
                                     onTouchEnd={(e) => {blockXWhenY(e)}}>
                        <Outlet/>
                    </OutletContainer>
                </MobilePageContainer> }>
                <Route path='/seeds' element={
                    <>
                        <SeedsScrollContainer>
                            {content.map((item, i) =>
                                <Playlist key={i} content={item}/>
                            )}
                        </SeedsScrollContainer>
                        <LongButton>find similar tracks</LongButton>
                    </>
                }/>
                <Route path="/states" element={<States/>}/>
                <Route path="/genres" element={
                    <>
                        <ColumnFlexContainer>
                            <h1>🛠 coming soon...</h1>
                        </ColumnFlexContainer>
                    </>
                }/>
                <Route path='/similar' element={
                    <>

                    </>
                }/>

                {/*<Route path="/likes" element={*/}
                {/*    <div style={{height: '57vh', overflow: 'scroll'}}>*/}
                {/*        <LongButton>import likes</LongButton>*/}
                {/*        /!*<TrackList content={response ? response.data.tracks ? response.data.tracks.allTracks : null : null} setSelectedSeedTrack={setSelectedSeedTrack}/>*!/*/}
                {/*    </div>*/}
                {/*}/>*/}
                {/*<Route path="/track-search" element={<></>}/>*/}
            </Route>
        </Routes>
    )
};