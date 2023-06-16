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

    // const [isPseudoBackground, setIsPseudoBackground] = useState(false)
    // const [backgroundGradient, setBackgroundGradient] = useState('black')
    // const [pseudoBackgroundGradient, setPseudoBackgroundGradient] = useState('white')

    // useEffect(() => {
    //
    // }, [])
    // document.html.style.background = "linear-gradient(rgba(232, 232, 232, 0.9), rgba(18,18,18, 0.9), rgba(42, 42, 42, 0.9)), url('https://i.gifer.com/ZTrl.gif') repeat;"
    // document.body.style.background = "linear-gradient(rgba(232, 232, 232, 0.9), rgba(18,18,18, 0.9), rgba(42, 42, 42, 0.9))"

    const debouncedDeviceRefresh = useDebouncedCallback(async () => {
        // console.log('inside')

        // set refresh
        setDeviceRefresh((prevState) => { return {
            selectaDeviceId: prevState.selectaDeviceId, refresh: !prevState.refresh}})

        // change playback to the previous device
        // get current devices
        // const devicesResponse = await axios({
        //     method: 'GET',
        //     url: 'https://api.spotify.com/v1/me/player/devices',
        //     headers: {
        //         Authorization: 'Bearer ' + user.accessToken
        //     }
        // }).catch((err) => console.log(err))
        //
        // console.log(devicesResponse.data.devices)
        // const device = devicesResponse.data.devices.filter(obj => obj.name !== "Refresh Selecta")
        // console.log(device)
        //
        // if (device.length === 1) {
        //     // transfer playback back to Spotify
        //         axios({
        //             method: 'PUT',
        //             url: 'https://api.spotify.com/v1/me/player',
        //             data: {device_ids: [device.device_id]},
        //             headers: {
        //                 Authorization: 'Bearer ' + user.accessToken
        //             }
        //         }).then((response) => {
        //             console.log(response)
        //         }).catch((err) => console.log(err))
        // }


    }, 500);

    // Spotify SDK script loading too slower than useEffect in the head of html - Patch
    // useEffect(() => { setTimeout(() => {setscriptLoadTimePatch(true)}, 5000)}, [])

    useEffect(() => {
        // console.log('in')

        // const player = window.Spotify ? user ? new window.Spotify.Player({
        //     name: 'Refresh Selecta',
        //     getOAuthToken: (cb) => {
        //         cb(user.accessToken)
        //     },
        //     volume: 0
        // }) : 0 : 0

        // if (window.Spotify !== null && window.Spotify !== undefined && user && user.accessToken) {
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

    // console.log(backgroundGradient)
    // console.log(isPseudoBackground)
    // console.log(pseudoBackgroundGradient)


    return (
        <>
            {/*<GlobalStyle isPseudoBackground={isPseudoBackground}*/}
            {/*             backgroundGragient={backgroundGradient}*/}
            {/*             pseudoBackgroundGradient={pseudoBackgroundGradient}*/}
            {/*/>*/}
            <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <BrowserView><Header user={user} /><Outlet /></BrowserView>
                        {/*<MobileView><Header user={user}/><Outlet /><Menu user={user}/>{showCaptions ? <HandWrittenCaptions src={handWrittenCaptions}/> : null}</MobileView>*/}
                        <MobileView><Header user={user}/><Outlet /><Menu user={user}/></MobileView>

                    </>}>
                    <Route index element={<Landing />} />
                    <Route path="setup" element={<Setup user={user} setUser={setUser}/>} />
                    <Route path="seeds/*" element={<Seeds user={user}/>} />
                    <Route path="add-to-collection" element={<AddToCollection />} />
                    <Route path="account/*" element={<Account user={user} setUser={setUser}/>}/>
                    <Route path="likes" element={<Likes user={user}/>}/>
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App