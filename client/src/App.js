import './App.css';
import {Routes, Route, Outlet, useLocation, useNavigate} from "react-router-dom";
import {LandingPage} from "./pages/landing/landing.page";
import AddToCollection from "./components/addToCollection/addToCollection.component";
import Account from "./components/account/account.component";
import Page404 from "./pages/404/404.page";
import React, {useEffect, useRef, useState} from "react";
import {Seeds} from "./components/seeds/seeds.component";
import Header from "./components/header/header.component";
import {Setup} from "./components/setup/setup.component";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { BrowserView, MobileView } from "react-device-detect";
// import {Menu} from "components/Menu/menu.component";
import {Menu} from "components/menu/menu.component";
import {deleteSimilar, makeRequest, postQueues} from "./utils/requests";
import {Lab} from "./components/lab/lab.component";
import {ListenPage} from "./pages/listen/listen.page";
import {useQuery} from "react-query";
import {Snackbar} from "./components/snackbar/snackbar.component";
import {useSnackbar} from "./hooks/useSnackbar";
import {useUser} from "./hooks/auth/useUser";
import {ProfilePage} from "./pages/profile/profile.page";
import {SnackbarProvider} from "./contexts/snackbar.context";
import {AddPage} from "./pages/add/add.page"
import {SlidingWindow} from "./components/slidingWindow/slidingWindow.component";
import {useSlidingWindow} from "./hooks/useSlidingWindow";
import {SettingsPage} from "./pages/settings/settings.page";
import {Popup} from "./components/popup/popup.component";
import {usePopup} from "./hooks/usePopup";
import {LandingDesktopPage} from "./desktop/pages/landing/landingDesktop.page";
import {Button} from "./app.styles";

// export const serverAddress = "http://localhost:3000"
// export const serverAddress = "http://192.168.1.98:3000"
export const serverAddress = ""

export const localIp = '192.168.1.98'

const App = () => {

    // const [user, setUser] = useState(null)
    const [similar, setSimilar] = useState([])

    const navigate = useNavigate()

    // useEffect(() => {
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, []);

    // store user in local storage
    // useEffect(() => {
    //     const localStorageUser = JSON.parse(window.localStorage.getItem('user'))
    //     if (localStorageUser) setUser(localStorageUser)
    // }, [])
    //
    // useEffect(() => {
    //     window.localStorage.setItem('user', JSON.stringify(user));
    // }, [user]);


    // vh units for CSS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    useEffect(() => {

        const resizeEventListener = () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        window.addEventListener('resize', resizeEventListener);

        return window.removeEventListener('resize', resizeEventListener, true)
    }, [])


    // const [error, setError] = useState({})
    const { options: snackbarOptions } = useSnackbar();
    const {options: slidingWindowOptions} = useSlidingWindow()
    const {options: popupOptions} = usePopup()
    // console.log(snackbarOptions)

    if (!slidingWindowOptions.isActive)
        document.body.style.background = 'linear-gradient(rgba(82, 100, 105, 0.9), rgba(190,182,191, 0.9), rgba(159, 159, 184, 0.9))'

    // user query
    // const [fetchUser, setFetchUser] = useState(false)
    // const userQuery = useQuery(
    //     ['user'],
    //     () => makeRequest('GET', '/v1/me'),
    //     {enabled: fetchUser}
    // )
    // if (userQuery.status === 'success')
    //     navigate('/listen/likes')
    // else if (userQuery.error)
    //     setError({type: 'error', text: 'try to do this later...', triggered: true})



    // console.log(userQuery)
    // console.log(fetchUser)

    // location monitoring
    let location = useLocation()
    const {user, fetchUser} = useUser()
    const [showCaptions, setShowCaptions] = useState()
    useEffect(() => {

        if (window.location.pathname === '/log-in') {
            fetchUser()
            navigate('/add')
        }
        // else if (userQuery.status === 'idle' && window.location.pathname !== '/look-at-me')
        //     navigate('/look-at-me')

        setShowCaptions(window.location.pathname === '/')

        if (window.location.pathname !== '/seeds/select') {
            // document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'
            // document.body.style.background = 'linear-gradient(rgba(65, 71, 58, 0.9), rgba(199,157,130, 0.9), rgba(146, 168, 159, 0.9))'

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
                // post request to delete tracks from DB _similar playlist
                deleteSimilar(uniqueSeenArray)
                // erase seen from local storage
                window.localStorage.removeItem('seen')
            }
        }
    }, [location])


    // //TRANSFERRED FROM LANDING
    // let authLink
    // if (process.env.NODE_ENV === 'production')
    //     authLink = 'https://selectaapp-33033c5c60ff.herokuapp.com/' + 'auth/request-authorization'
    // else
    //     authLink = `http://${localIp}:3000/auth/request-authorization`

    // console.log(window.location.pathname, 'pat')

    return (

            <Routes>
                {/*<Route path="/look-at-me" element={<></>} />*/}
                <Route path="/" element={
                    window.location.pathname !== '/s11' &&
                    !user ?
                    <>
                        <MobileView>
                            <Snackbar options={snackbarOptions}/>
                            <LandingPage/>
                        </MobileView>
                        <BrowserView>
                            <LandingDesktopPage/>
                        </BrowserView>
                    </> : <>
                        <MobileView>
                            <Snackbar options={snackbarOptions}/>
                            <Outlet />
                            <Menu/>
                            <Popup options={popupOptions}/>
                            <SlidingWindow options={slidingWindowOptions}/>
                        </MobileView>
                        <BrowserView>
                            <h1>We're developing desktop version for logged in users...</h1>
                        </BrowserView>
                    </>}>
                    {/*<Route path="/s11" element={<><Button onClick={()=>{window.location.href = authLink}}>log in with Spotify</Button></>}/>*/}
                    <Route path="/listen/*" element={<ListenPage/>}/>
                    <Route path="/add/*" element={<AddPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/settings/*" element={<SettingsPage/>}/>
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        // </SnackbarProvider>
    );
}

export default App