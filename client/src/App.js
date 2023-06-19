import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Outlet, useLocation} from "react-router-dom";
import {Landing} from "./components/landing/landing.component";
import AddToCollection from "./components/addToCollection/addToCollection.component";
import Account from "./components/account/account.component";
import Page404 from "./components/404page/404page.component";
import React, {useEffect, useRef, useState} from "react";
import {Seeds} from "./components/seeds/seeds.component";
import cookie from 'cookie';
import Cookies from 'js-cookie';
import Header from "./components/header/header.component";
import {Setup} from "./components/setup/setup.component";
import Script from "react-load-script";
import axios from "axios";
import {lazy} from "react";
import { useDebouncedCallback } from "use-debounce";
import { BrowserView, MobileView } from "react-device-detect";
import {Menu} from "./components/menu/menu.component";
import {Likes} from "./components/likes/likes.component";
import handWrittenCaptions from "./images/hand-written-captions3.png";
import {HandWrittenCaptions} from "./components/landing/mobileLandind.styles";
import {deleteSimilar, postQueues} from "./utils/requests";
// import {GlobalStyle} from "./app.styles";


// export const serverAddress = "http://localhost:3000"
// export const serverAddress = "http://192.168.1.98:3000"
export const serverAddress = ""


const App = () => {

    const [user, setUser] = useState(null)
    const [deviceRefresh, setDeviceRefresh] = useState({selectaDeviceId: null, refresh: false})
    const playerCreatedRef = useRef(false)
    const refreshRequestedRef = useRef(false)
    const [requestRefreshInitSuppressor, setRequestRefreshInitSuppressor] = useState(0)

    const [similar, setSimilar] = useState([])

    // store user in local storage
    useState(() => {
        // console.log(JSON.parse(window.localStorage.getItem('user')))
        setUser(JSON.parse(window.localStorage.getItem('user')))
    }, [])

    // localStorage.clear()

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);



    // location monitoring
    let location = useLocation()
    const [showCaptions, setShowCaptions] = useState()
    useEffect(() => {
        setShowCaptions(window.location.pathname === '/')

        if (window.location.pathname !== '/seeds/select') {
            document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

            // send selected and seen tracks from local storage if user quit immersive mode
            const selected = JSON.parse(window.localStorage.getItem('selected'))
            const seen = JSON.parse(window.localStorage.getItem('seen'))
            if (selected) {
                // post /v1/tracks/queues
                postQueues(selected)
                //delete from similar DB
                deleteSimilar(selected)
                // erase selected from local storage
                window.localStorage.removeItem('selected')
            }
            if (seen) {


                let uniqueSeenArray = [
                    ...new Map(seen.map((item) => [item["_id"], item])).values(),
                ];

                // remove from similar state
                setSimilar((prevState) => prevState.filter(
                    object1 => !uniqueSeenArray.some(object2 => object1._id === object2._id)))
                // console.log(similar[0], uniqueSeenArray[0])
                // console.log((similar.filter((n) => !uniqueSeenArray.includes(n))).length, 'new similar')
                // post request to delete tracks from DB _similar playlist
                deleteSimilar(uniqueSeenArray)
                // erase seen from local storage
                window.localStorage.removeItem('seen')
            }
        }
    }, [location])





    const debouncedDeviceRefresh = useDebouncedCallback(async () => {
        // set refresh
        setDeviceRefresh((prevState) => { return {
            selectaDeviceId: prevState.selectaDeviceId, refresh: !prevState.refresh}})

    }, 500);

    // Spotify SDK script loading too slower than useEffect in the head of html - Patch
    // useEffect(() => { setTimeout(() => {setscriptLoadTimePatch(true)}, 5000)}, [])

    useEffect(() => {

        if (window.Spotify && user && user.likes) {

            // suppress double rendering
            if (playerCreatedRef.current) return;
            playerCreatedRef.current = true;

            // create Spotify device
            const player = new window.Spotify.Player({
                name: 'Refresh Selecta',
                getOAuthToken: (cb) => {
                    cb(user.accessToken)
                },
                volume: 0
            })
            player.addListener('ready', ({device_id}) => {
                setDeviceRefresh((prevState) => {
                    return {
                        selectaDeviceId: device_id, refresh: prevState.refresh
                    }
                })
                console.log('Ready with Device ID', device_id);
                // setRefresh((prevState) => !prevState)
            })
            player.addListener('initialization_error', ({message}) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({message}) => {
                console.error(message);
            });

            player.addListener('account_error', ({message}) => {
                console.error(message);
            });
            player.addListener('player_state_changed', () => {
                debouncedDeviceRefresh()
            });
            player.connect()
        }
    }, [user])

    // request tracks from the seeds playlist when refresh
    const debouncedRequestRefresh = useDebouncedCallback(async () => {
        return await axios({
            method: 'GET',
            url: serverAddress + '/v1/tracks/similar',
            params: {type: 'seeds', limit: 20},
            withCredentials: true
        }).catch((err) => console.log(err))

    }, 3000);

    useEffect(() => {
        console.log("refresh")
        // suppress initial render call
        setRequestRefreshInitSuppressor(prevState => prevState += 1)
        if (requestRefreshInitSuppressor && requestRefreshInitSuppressor % 2 === 1) {
            console.log('req')
            const response = debouncedRequestRefresh();
            // console.log(response.data)
        }
    }, [deviceRefresh])

    return (
        <>
            {/*<GlobalStyle isPseudoBackground={isPseudoBackground}*/}
            {/*             backgroundGragient={backgroundGradient}*/}
            {/*             pseudoBackgroundGradient={pseudoBackgroundGradient}*/}
            {/*/>*/}
            {/*<BrowserRouter>*/}
            <Routes>
                <Route path="/" element={
                    <>
                        <BrowserView><Header user={user} /><Outlet /></BrowserView>
                        {/*<MobileView><Header user={user}/><Outlet /><Menu user={user}/>{showCaptions ? <HandWrittenCaptions src={handWrittenCaptions}/> : null}</MobileView>*/}
                        <MobileView><Header user={user}/><Outlet /><Menu showCaptions={showCaptions}/></MobileView>

                    </>}>
                    <Route index element={<Landing />} />
                    <Route path="setup" element={<Setup user={user} setUser={setUser}/>} />
                    <Route path="seeds/*" element={<Seeds
                        user={user}
                        similar={similar}
                        setSimilar={setSimilar}/>} />
                    <Route path="add-to-collection" element={<AddToCollection />} />
                    <Route path="account/*" element={<Account user={user} setUser={setUser}/>}/>
                    <Route path="likes" element={<Likes user={user}/>}/>
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        {/*</BrowserRouter>*/}
        </>
    );
}

export default App