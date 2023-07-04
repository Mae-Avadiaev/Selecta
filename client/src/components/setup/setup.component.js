import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {serverAddress} from "../../App";
import {redirect} from "react-router-dom";
import {
    StyledSetup,
    SetupTitleContainer,
    LittlePreview,
    SetupButtonContainer,
    SetupNextButton,
    SetupSuperHeader,
    SetupPlaylistPreview,
    SetupColumnsContainer,
    SetupButtonFire,
    FireButton,
    SetupBorderContainer,
    SetupOptionContainer
} from "./setup.styles";
import library from "./../../images/little-preview-library.svg"
import plus from "./../../images/little-preview-plus.svg"
import likesCover from "./../../images/likes-cover-compressed-base64.txt"
import mime from 'mime'
import {emojisplosion} from "emojisplosion";
import seedsPreview from "./../../images/seeds-preview.png"
import arrow from "./../../images/arrow.png"
import selectaPreview from "./../../images/selecta-preview.png"
import cookies from "js-cookie";
import {customEmojisplosion} from "../../utils/customEmojisplosion";
import queuePreviewSimple from "./../../images/queue-preview-simple.png"
import queuePreviewPro from "./../../images/queue-preview-pro.png"
import qsFolderPreview from "./../../images/qs-folder-preview.png"
import otherQPreview from './../../images/other-q-preview.png'
import meditateQPreview from './../../images/meditate-q-preview.png'
import playlistsFolderPreview from "./../../images/playlists-folder-preview.png"
import qsFolder16Preview from "./../../images/qs-folder-16-preview.png"

import Script from 'react-load-script'
import {createPlaylist, makeRequest} from "../../utils/requests";
import {MobileView, BrowserView} from "react-device-detect";
import {MobilePageContainerColumn} from "../../app.styles";
import {HandWrittenSeedsTutorial, MobileSetupBorderContainer, MobileSetupSuperHeader} from "./mobileSetup.styles";
import handWrittenSeedsTutorial from "./../../images/hand-written-seeds-tutorial1.png"
import {MobilePageContainer} from "../../app.styles";

// //create likes pool
// createPlaylist({
//     name: 'Drop liked tracks here',
//     description: "Add liked tracks to this playlist and switch you device to ‘Selecta’. The tracks will automatically be sorted to your Collection folder :)",
//     coverUrl: 'https://i.imgur.com/4e98FwF.jpg',
//     public: false,
//     type: 'likes pool',
//     rules: undefined
// })

export const Setup = ({user, setUser}) => {

    const [slide, setSlide] = useState(0)
    const navigate = useNavigate()
    const meRequestSentRef = useRef(false)

    // get me
    useEffect(() => {


        if (meRequestSentRef.current === false) {

            meRequestSentRef.current = true

            if (user === null) {
                // request user
                axios({
                    method: 'GET',
                    url: serverAddress + '/auth/me',
                    withCredentials: true
                }).then((response) => {
                    setUser(() => response.data.data)
                }).catch((err) => console.log(err))
            }
        }


        // console.log(user)
        //set the page where user has interrupted setup
        const setPageOfSetup = async () => {
            if (user && !user.seeds) {
                // continue
            // } else if (user && user.queues.length === 0) {
            //     setSlide(3)
            // } else if (user && !user.likes) {
            //     setSlide(5)
            } else if (user) {

                // request user
                await axios({
                    method: 'GET',
                    url: serverAddress + '/auth/me',
                    withCredentials: true
                }).then((response) => {
                    setUser(() => response.data.data)
                }).catch((err) => console.log(err))

                navigate('/seeds')
            }
        }

        setPageOfSetup()

    }, [user]);



    // const a = user ? console.log(user.seedsPool, user.queues.length, user.likesPools, "<-----------pools") : 0
    // console.log(user)

    const createDefaultPresets = async () => {
        const presets = [{
            name: 'Preset No 1',
            author: null,
            minBpm: 10,
            maxBpm: 10,
            minEnergy: 10,
            maxEnergy: 10,
            minDanceability: 10,
            maxDeanceability: 10,
            minInstrumentalnes: 10,
            maxInstrumentalness: 10,
            minAcousticness: 10,
            maxAcousticness: 10,
            minValence: 10,
            maxValence: 10,
            minYear: 10,
            maxYear: 10,
            keyMode: 'camelot adjacent',
            amount: 50,
            sort: [{}],
            defaultPlaylistName: 'Eshkere',
            rating: 42,
            color1: {r: 15, g: 148, b: 178},
            color2: {r: 77, g: 155, b: 96},
            color3: {r: 164, g: 157, b: 60},
            public: true,
            default: true,
            searchWords: ['face']
        }]

        const response = await makeRequest('POST', '/v1/preset/', null, navigate, {allPresets: presets})
    }

    const nextSlide = (emoji) => {
        customEmojisplosion(emoji)
        setSlide(prevState => prevState += 1)
    }

    const createSeeds = () => {

        // create seeds pool
        createPlaylist({
            name: 'Seeds',
            description: "Add tracks here to find similar ones :)",
            coverUrl: 'https://i.imgur.com/rYcQuuv.jpg',
            public: false,
            type: 'seeds',
            rules: undefined
        }, navigate)

        axios({
            method: 'GET',
            url: serverAddress + '/auth/me',
            withCredentials: true
        }).then((response) => {
            setUser(() => response.data.data)
        }).catch((err) => console.log(err))

        nextSlide('✅')
        navigate('/seeds')
    }

    const [selected, setSelected] = useState('')

    const createQueues = () => {

        const content = [
            {
                name: selected === 'simple' ? '🔺 Other Q' : '🔺 Other Q (135+)',
                rules: {bpmRange: {from: 135, to: 160}},
                orderNumber: 0
            }, {
                name: selected === 'simple' ? '💥 Rave Q' : '💥 Rave Q (130)',
                rules: {bpmRange: {from: 130, to: 135}},
                orderNumber: 1
            }, {
                name: selected === 'simple' ? '⚡️ Dance Q' : '⚡️ Dance Q (125)',
                rules: {bpmRange: {from: 125, to: 130}},
                orderNumber: 2
            }, {
                name: selected === 'simple' ? '🌐 Slow-Dance Q' : '🌐 Slow-Dance Q (120)',
                rules: {bpmRange: {from: 120, to: 125}},
                orderNumber: 3
            }, {
                name: selected === 'simple' ? '🍸 Pre-party Q' : '🍸 Pre-party Q (115)',
                rules: {bpmRange: {from: 115, to: 120}},
                orderNumber: 4
            }, {
                name: selected === 'simple' ? '🗣 Socialising Q' : '🗣 Socialising Q (110)',
                rules: {bpmRange: {from: 110, to: 115}},
                orderNumber: 5
            }, {
                name: selected === 'simple' ? '🔥 Warm-up Q' : '🔥 Warm-up Q (105)',
                rules: {bpmRange: {from: 105, to: 110}},
                orderNumber: 6
            // }, {
            //     name: selected === 'simple' ? '🎱 Vibe to Hip Hop Q' : '🎱 Vibe to Hip Hop Q (75-100)',
            //     rules: {bpmRange: {from: 75_100', 'parent_genre_hip-hop'],
            //     orderNumber: 7
            }, {
                name: selected === 'simple' ? '🍽 Sitting Q' : '🍽 Sitting Q (100)',
                rules: {bpmRange: {from: 100, to: 105}},
                orderNumber: 7
            }, {
                name: selected === 'simple' ? '🏖 Lounge Q' : '🏖 Lounge Q (95)',
                rules: {bpmRange: {from: 95, to: 100}},
                orderNumber: 8
            }, {
                name: selected === 'simple' ? '💻 Do Your Thing Q' : '💻 Do Your Thing Q (90)',
                rules: {bpmRange: {from: 90, to: 95}},
                orderNumber: 9
            }, {
                name: selected === 'simple' ? '👂 Be All Ears Q' : '👂 Be All Ears Q (80-90)',
                rules: {bpmRange: {from: 80, to: 90}},
                orderNumber: 10
            // }, {
            //     name: selected === 'simple' ? '💃 Move to Latino Rhythms Q' : '💃 Move to Latino Rhythms Q (60-75)',
            //     rules: {bpmRange: {from: 60, to: 75}} 'parent_genre_latino'],
            //     orderNumber: 12
            }, {
                name: selected === 'simple' ? '🪶 Relax Q' : '🪶 Relax Q (70-80)',
                rules: {bpmRange: {from: 70, to: 80}},
                orderNumber: 11
            }, {
                name: selected === 'simple' ? '🕉 Meditate Q' : '🕉 Meditate Q (60-70)',
                rules: {bpmRange: {from: 60, to: 70}},
                orderNumber: 12
            }, {
                name: selected === 'simple' ? '🔻 Other Q' : '🔻 Other Q (45-60)',
                rules: {bpmRange: {from: 45, to: 60}},
                orderNumber: 13
            }
        ]

        content.reverse().map((playlist, i) => {

            setTimeout(() => createPlaylist({
                name: playlist.name,
                description: "Listen to new music. You're beautiful :)",
                coverUrl: '',
                public: false,
                type: 'queue',
                rules: playlist.rules
            }), 1000 * i)
        })

        nextSlide('💸')
    }

    const createDefaultPlaylists = () => {

        createPlaylist({
            name: '_likes',
            type: 'likes',
        }, navigate)

        createPlaylist({
            name: '_similarTracks',
            type: 'similar'
        }, navigate)

        nextSlide('🕶')
    }

    let content
    if (slide === 0 ) {
        content =
            <>
                <MobileView>
                    <SetupTitleContainer>
                        <MobileSetupSuperHeader>Let's create some playlists.</MobileSetupSuperHeader>
                        <p>This setup will take less than a minute</p>
                    </SetupTitleContainer>
                    <br/><br/>
                    <FireButton  onClick={() => setSlide(prevState => prevState += 1)}>Let's go</FireButton>
                </MobileView>
                <BrowserView>
                    <SetupTitleContainer>
                        <SetupSuperHeader>Let's create some playlists.</SetupSuperHeader>
                        <h1>This setup will take less than a minute</h1>
                    </SetupTitleContainer>
                    <br/><br/>
                    <FireButton onClick={() => setSlide(prevState => prevState += 1)}>Let's go</FireButton>
                </BrowserView>
            </>

    // } else if (slide === 1) {
    //     content =
    //         <>
    //             <SetupTitleContainer>
    //                 <h1>Go to your Spotify and<br/>create a folder named Selecta</h1>
    //                 <br/><br/><br/>
    //             </SetupTitleContainer>
    //             <div>
    //                 <SetupColumnsContainer>
    //                     <SetupPlaylistPreview src={selectaPreview}/>
    //                 </SetupColumnsContainer>
    //                 <br/><br/><br/>
    //                 <h3>In your Spotify, create a folder called Selecta</h3>
    //                 <p>• In the desktop app or web player, go to <strong>Your Library</strong> <LittlePreview src={library}/>.</p>
    //                 <p>• Click <LittlePreview src={plus}/> at at the top.</p>
    //                 <p>• Click Create a playlist folder.</p>
    //                 <p>• Give it a name Selecta <span style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText("Selecta")}>[COPY]</span></p>
    //                 <br/><br/><br/>
    //             </div>
    //             <SetupButtonContainer>
    //                 <SetupNextButton onClick={() => nextSlide('✨')}>I've created</SetupNextButton>
    //             </SetupButtonContainer>
    //         </>

    } else if (slide === 1) {
        content =
            <>
                <MobileView>
                    {/*<MobileSetupBorderContainer>*/}
                    {/*    <MobileSetupSuperHeader>Seeds</MobileSetupSuperHeader>*/}
                    {/*    <h2>- add tracks to "Seeds"<br/>playlist in your Spotify<br/>to get similar tracks.</h2>*/}
                    {/*</MobileSetupBorderContainer>*/}
                    {/*<br/>*/}
                    <SetupTitleContainer>
                        <h1  style={{margin: '0 0 -20px 0'}}>Let's create</h1>
                        <MobileSetupSuperHeader>Seeds</MobileSetupSuperHeader>
                        <h1 style={{margin: '-10px 0 0 0'}}>in your Spotify</h1>
                        <br/><br/>
                    </SetupTitleContainer>
                    <SetupPlaylistPreview src={seedsPreview}/>
                    <br/><br/><br/><br/>
                    <SetupButtonContainer>
                        <SetupNextButton style={{zIndex: 20}} onClick={createSeeds}>Create playlist</SetupNextButton>
                    </SetupButtonContainer>
                    {/*<HandWrittenSeedsTutorial src={handWrittenSeedsTutorial}/>*/}
                </MobileView>
                <BrowserView>
                    <SetupBorderContainer>
                        <SetupSuperHeader>Seeds</SetupSuperHeader>
                        <h2>- add tracks to this playlist in your Spotify<br/>to get similar tracks.</h2>
                    </SetupBorderContainer>
                    <br/>
                    <SetupTitleContainer>
                        <h1>Let's create a 'Seeds' playlist in your Spotify</h1>
                        <br/><br/><br/>
                    </SetupTitleContainer>
                    <SetupPlaylistPreview src={seedsPreview}/>
                    <br/><br/><br/><br/><br/>
                    <SetupButtonContainer>
                        <SetupNextButton onClick={createSeeds}>Create playlist</SetupNextButton>
                    </SetupButtonContainer>
                </BrowserView>
            </>

    // } else if (slide === 3) {
    //     content =
    //         <>
    //             <SetupTitleContainer>
    //                 <h1>Create a folder named Qs</h1>
    //                 <br/><br/><br/>
    //             </SetupTitleContainer>
    //             <div>
    //                 <SetupColumnsContainer>
    //                     <SetupPlaylistPreview src={qsFolderPreview}/>
    //                 </SetupColumnsContainer>
    //                 <br/><br/><br/>
    //                 <h3>In your Spotify, create a folder called Qs</h3>
    //                 <p>• In the desktop app or web player, go to <strong>Your Library</strong> <LittlePreview src={library}/>.</p>
    //                 <p>• Click <LittlePreview src={plus}/> at at the top.</p>
    //                 <p>• Click Create a playlist folder.</p>
    //                 <p>• Give it a name Selecta <span style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText("Selecta")}>[COPY]</span></p>
    //                 <br/><br/><br/>
    //             </div>
    //             <SetupButtonContainer>
    //                 <SetupNextButton onClick={() => nextSlide('💸')}>I've created</SetupNextButton>
    //             </SetupButtonContainer>
    //         </>

    } else if (slide === 2) {
        content =
            <>
                <SetupBorderContainer>
                    <SetupSuperHeader>Qs</SetupSuperHeader>
                    <h2>- here you can listen<br/>for the similar music sorted by energy</h2>
                </SetupBorderContainer>
                {/*<br/><br/>*/}
                {/*<SetupTitleContainer>*/}
                {/*    <h1>Let's create some Q playlists in your Spotify</h1>*/}
                {/*</SetupTitleContainer>*/}
                {/*<br/>*/}
            {/*    <SetupColumnsContainer>*/}
            {/*        <SetupOptionContainer selected={selected === 'simple'} onClick={() => setSelected('simple')}>*/}
            {/*            <div/>*/}
            {/*            <h2>Simple</h2>*/}
            {/*            <SetupPlaylistPreview src={queuePreviewSimple} style={{height: "100px"}}/>*/}
            {/*        </SetupOptionContainer>*/}
            {/*        <SetupOptionContainer selected={selected === 'pro'} onClick={() => setSelected('pro')}>*/}
            {/*            <div/>*/}
            {/*            <h2>BPM</h2>*/}
            {/*            <SetupPlaylistPreview src={queuePreviewPro} style={{height: "100px"}}/>*/}
            {/*        </SetupOptionContainer>*/}
            {/*    </SetupColumnsContainer>*/}
                <br/><br/><br/><br/><br/>
                <SetupButtonContainer>
                    <SetupNextButton onClick={() => createQueues()}>Next</SetupNextButton>
                </SetupButtonContainer>
            </>
    // } else if (slide === 5) {
    //     content =
    //         <>
    //             <SetupTitleContainer>
    //                 <h1>Move all the 16 Qs to the Qs folder,<br/>starting from the bottom</h1>
    //                 <br/><br/>
    //             </SetupTitleContainer>
    //             <SetupPlaylistPreview src={meditateQPreview} style={{margin: "0 0 10px 0"}}/>
    //             <SetupPlaylistPreview src={otherQPreview}/>
    //             <SetupPlaylistPreview src={arrow} style={{height: "100px", width: "inherit"}}/>
    //             <SetupPlaylistPreview src={qsFolderPreview}/>
    //             <br/><br/><br/>
    //             <SetupButtonContainer>
    //                 <SetupNextButton onClick={() => nextSlide('🥏')}>Done</SetupNextButton>
    //             </SetupButtonContainer>
    //         </>
    } else if (slide === 3) {
        content =
            <>
                <SetupBorderContainer>
                    <SetupSuperHeader>Playlists</SetupSuperHeader>
                    <h2>- select tracks from your likes<br/>and decide what to play on a party or in your trip</h2>
                    {/*<p>Your previous likes won't go to Playlists now. You can import them later.<br/>You can create rules in the Playlist section.</p>*/}
                </SetupBorderContainer>
                {/*<br/><br/>*/}
                {/*<SetupTitleContainer>*/}
                {/*    <h1>Create a folder named Playlists</h1>*/}
                {/*    <br/><br/>*/}
                {/*</SetupTitleContainer>*/}
                {/*    <SetupColumnsContainer>*/}
                {/*        <SetupPlaylistPreview src={playlistsFolderPreview}/>*/}
                {/*    </SetupColumnsContainer>*/}
                <SetupButtonContainer style={{"margin-top": "90px"}}>
                    <SetupNextButton onClick={() => {createDefaultPlaylists(); navigate('/seeds')}}>Got it</SetupNextButton>
                </SetupButtonContainer>
            </>
    // } else if (slide === 7) {
    //     content =
    //         <>
    //             <SetupTitleContainer>
    //                 <h1>Move all folders and playlists that we've created,<br/>to the Selecta folder</h1>
    //             </SetupTitleContainer>
    //             <SetupSuperHeader style={{"margin-top": "-25px"}}>•••</SetupSuperHeader>
    //             <SetupPlaylistPreview src={qsFolder16Preview} style={{margin: "0 0 10px 0"}}/>
    //             <SetupPlaylistPreview src={seedsPreview}/>
    //             <SetupPlaylistPreview src={arrow} style={{height: "100px", width: "inherit"}}/>
    //             <SetupPlaylistPreview src={selectaPreview}/>
    //             <br/><br/><br/>
    //             <SetupButtonContainer>
    //                 <SetupNextButton onClick={() => {nextSlide('✅'); navigate('/seeds') }}>Done</SetupNextButton>
    //             </SetupButtonContainer>
    //         </>
    }

// } else if (slide === 4) {
//


    return (
        <>
            <MobileView>
                <MobilePageContainerColumn>
                    {content}
                </MobilePageContainerColumn>
                {/*<MobilePageContainerColumn>*/}

                {/*</MobilePageContainerColumn>*/}
            </MobileView>
            <BrowserView>
                <StyledSetup>
                    {content}
                </StyledSetup>
            </BrowserView>
        </>
    )
}