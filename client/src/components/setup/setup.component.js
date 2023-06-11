import React, {useEffect, useState} from "react";
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
import {createPlaylist} from "../../utils/createPlaylist";
import {customEmojisplosion} from "../../utils/customEmojisplosion";
import queuePreviewSimple from "./../../images/queue-preview-simple.png"
import queuePreviewPro from "./../../images/queue-preview-pro.png"
import qsFolderPreview from "./../../images/qs-folder-preview.png"
import otherQPreview from './../../images/other-q-preview.png'
import meditateQPreview from './../../images/meditate-q-preview.png'
import playlistsFolderPreview from "./../../images/playlists-folder-preview.png"
import qsFolder16Preview from "./../../images/qs-folder-16-preview.png"

import Script from 'react-load-script'

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

    // get me
    useEffect(() => {

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

        //set the page where user has interrupted setup
        const setPageOfSetup = async () => {
            if (user && !user.seedsPool) {
                // continue
            } else if (user && user.queues.length === 0) {
                setSlide(3)
            } else if (user && !user.likesPool) {
                setSlide(5)
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


    const nextSlide = (emoji) => {
        customEmojisplosion(emoji)
        setSlide(prevState => prevState += 1)
    }

    const createSeeds = () => {

        // create seeds pool
        createPlaylist({
            name: 'Seeds',
            description: "Add tracks from which you want to get similar tracks and switch your device to ‘Selecta’. The tracks will automatically be sorted to your Qs folder :)",
            coverUrl: 'https://i.imgur.com/rYcQuuv.jpg',
            public: false,
            type: 'seeds pool',
            rules: undefined
        })
        nextSlide('🪰')
    }

    const [selected, setSelected] = useState('')

    const createQueues = () => {

        const content = [
            {
                name: selected === 'simple' ? '🔺 Other Q' : '🔺 Other Q (135+)',
                rules: ['bpm_range_135_160'],
                orderNumber: 0
            }, {
                name: selected === 'simple' ? '💥 Rave Q' : '💥 Rave Q (130)',
                rules: ['bpm_range_130_135'],
                orderNumber: 1
            }, {
                name: selected === 'simple' ? '⚡️ Dance Q' : '⚡️ Dance Q (125)',
                rules: ['bpm_range_125_130'],
                orderNumber: 2
            }, {
                name: selected === 'simple' ? '🌐 Slow-Dance Q' : '🌐 Slow-Dance Q (120)',
                rules: ['bpm_range_120_125'],
                orderNumber: 3
            }, {
                name: selected === 'simple' ? '🍸 Pre-party Q' : '🍸 Pre-party Q (115)',
                rules: ['bpm_range_115_120'],
                orderNumber: 4
            }, {
                name: selected === 'simple' ? '🗣 Socialising Q' : '🗣 Socialising Q (110)',
                rules: ['bpm_range_110_115'],
                orderNumber: 5
            }, {
                name: selected === 'simple' ? '🔥 Warm-up Q' : '🔥 Warm-up Q (105)',
                rules: ['bpm_range_105_110'],
                orderNumber: 6
            }, {
                name: selected === 'simple' ? '🎱 Vibe to Hip Hop Q' : '🎱 Vibe to Hip Hop Q (75-100)',
                rules: ['bpm_range_75_100', 'parent_genre_hip-hop'],
                orderNumber: 7
            }, {
                name: selected === 'simple' ? '🍽 Sitting Q' : '🍽 Sitting Q (100)',
                rules: ['bpm_range_100_105'],
                orderNumber: 8
            }, {
                name: selected === 'simple' ? '🏖 Lounge Q' : '🏖 Lounge Q (95)',
                rules: ['bpm_range_95_100'],
                orderNumber: 9
            }, {
                name: selected === 'simple' ? '💻 Do Your Thing Q' : '💻 Do Your Thing Q (90)',
                rules: ['bpm_range_90_95'],
                orderNumber: 10
            }, {
                name: selected === 'simple' ? '👂 Be All Ears Q' : '👂 Be All Ears Q (80-90)',
                rules: ['bpm_range_80_90'],
                orderNumber: 11
            }, {
                name: selected === 'simple' ? '💃 Move to Latino Rhythms Q' : '💃 Move to Latino Rhythms Q (60-75)',
                rules: ['bpm_range_60_75', 'parent_genre_latino'],
                orderNumber: 12
            }, {
                name: selected === 'simple' ? '🪶 Relax Q' : '🪶 Relax Q (70-80)',
                rules: ['bpm_range_70_80'],
                orderNumber: 13
            }, {
                name: selected === 'simple' ? '🕉 Meditate Q' : '🕉 Meditate Q (60-70)',
                rules: ['bpm_range_60_70'],
                orderNumber: 14
            }, {
                name: selected === 'simple' ? '🔻 Other Q' : '🔻 Other Q (45-60)',
                rules: ['bpm_range_45_60'],
                orderNumber: 15
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
            }), 300 * i)
        })

        nextSlide('🎈')
    }

    const createLikesPool = () => {
        //create
        createPlaylist({
            name: '_likesPool',
            type: 'likes pool',
        })
        nextSlide('🕶')
    }

    let content
    if (slide === 0 ) {
        content =
            <>
                <SetupTitleContainer>
                    <SetupSuperHeader>Now we can organise our folders.</SetupSuperHeader>
                    <h1>This setup won't take more than 3 minutes</h1>
                </SetupTitleContainer>
                <br/><br/>
                <FireButton onClick={() => setSlide(prevState => prevState += 1)}>Let's go</FireButton>
            </>

    } else if (slide === 1) {
        content =
            <>
                <SetupTitleContainer>
                    <h1>Go to your Spotify and<br/>create a folder named Selecta</h1>
                    <br/><br/><br/>
                </SetupTitleContainer>
                <div>
                    <SetupColumnsContainer>
                        <SetupPlaylistPreview src={selectaPreview}/>
                    </SetupColumnsContainer>
                    <br/><br/><br/>
                    <h3>In your Spotify, create a folder called Selecta</h3>
                    <p>• In the desktop app or web player, go to <strong>Your Library</strong> <LittlePreview src={library}/>.</p>
                    <p>• Click <LittlePreview src={plus}/> at at the top.</p>
                    <p>• Click Create a playlist folder.</p>
                    <p>• Give it a name Selecta <span style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText("Selecta")}>[COPY]</span></p>
                    <br/><br/><br/>
                </div>
                <SetupButtonContainer>
                    <SetupNextButton onClick={() => nextSlide('✨')}>I've created</SetupNextButton>
                </SetupButtonContainer>
            </>

    } else if (slide === 2) {
        content =
            <>
                <SetupBorderContainer>
                    <SetupSuperHeader>Seeds</SetupSuperHeader>
                    <h2>- tracks from which Selecta will find<br/>similar tracks.</h2>
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

            </>

    } else if (slide === 3) {
        content =
            <>
                <SetupTitleContainer>
                    <h1>Create a folder named Qs</h1>
                    <br/><br/><br/>
                </SetupTitleContainer>
                <div>
                    <SetupColumnsContainer>
                        <SetupPlaylistPreview src={qsFolderPreview}/>
                    </SetupColumnsContainer>
                    <br/><br/><br/>
                    <h3>In your Spotify, create a folder called Qs</h3>
                    <p>• In the desktop app or web player, go to <strong>Your Library</strong> <LittlePreview src={library}/>.</p>
                    <p>• Click <LittlePreview src={plus}/> at at the top.</p>
                    <p>• Click Create a playlist folder.</p>
                    <p>• Give it a name Selecta <span style={{cursor: "pointer"}} onClick={() => navigator.clipboard.writeText("Selecta")}>[COPY]</span></p>
                    <br/><br/><br/>
                </div>
                <SetupButtonContainer>
                    <SetupNextButton onClick={() => nextSlide('💸')}>I've created</SetupNextButton>
                </SetupButtonContainer>
            </>

    } else if (slide === 4) {
        content =
            <>
                <SetupBorderContainer>
                    <SetupSuperHeader>Qs</SetupSuperHeader>
                    <h2>- playlists with new music<br/>where similar tracks will be sorted</h2>
                </SetupBorderContainer>
                <br/><br/>
                <SetupTitleContainer>
                    <h1>Let's create some Q playlists in your Spotify</h1>
                </SetupTitleContainer>
                <br/>
                <SetupColumnsContainer>
                    <SetupOptionContainer selected={selected === 'simple'} onClick={() => setSelected('simple')}>
                        <div/>
                        <h2>Simple</h2>
                        <SetupPlaylistPreview src={queuePreviewSimple} style={{height: "100px"}}/>
                    </SetupOptionContainer>
                    <SetupOptionContainer selected={selected === 'pro'} onClick={() => setSelected('pro')}>
                        <div/>
                        <h2>BPM</h2>
                        <SetupPlaylistPreview src={queuePreviewPro} style={{height: "100px"}}/>
                    </SetupOptionContainer>
                </SetupColumnsContainer>
                <br/><br/><br/><br/><br/>
                <SetupButtonContainer>
                    <SetupNextButton onClick={createQueues}>Create Qs</SetupNextButton>
                </SetupButtonContainer>
            </>
    } else if (slide === 5) {
        content =
            <>
                <SetupTitleContainer>
                    <h1>Move all the 16 Qs to the Qs folder,<br/>starting from the bottom</h1>
                    <br/><br/>
                </SetupTitleContainer>
                <SetupPlaylistPreview src={meditateQPreview} style={{margin: "0 0 10px 0"}}/>
                <SetupPlaylistPreview src={otherQPreview}/>
                <SetupPlaylistPreview src={arrow} style={{height: "100px", width: "inherit"}}/>
                <SetupPlaylistPreview src={qsFolderPreview}/>
                <br/><br/><br/>
                <SetupButtonContainer>
                    <SetupNextButton onClick={() => nextSlide('🥏')}>Done</SetupNextButton>
                </SetupButtonContainer>
            </>
    } else if (slide === 6) {
        content =
            <>
                <SetupBorderContainer>
                    <SetupSuperHeader>Playlists</SetupSuperHeader>
                    <h2>- when you like new music,<br/>from now on it is sorted to Playlists by your custom rules.</h2>
                    <p>Your previous likes won't go to Playlists now. You can import them later.<br/>You can create rules in the Playlist section.</p>
                </SetupBorderContainer>
                <br/><br/>
                <SetupTitleContainer>
                    <h1>Create a folder named Playlists</h1>
                    <br/><br/>
                </SetupTitleContainer>
                    <SetupColumnsContainer>
                        <SetupPlaylistPreview src={playlistsFolderPreview}/>
                    </SetupColumnsContainer>
                <SetupButtonContainer style={{"margin-top": "90px"}}>
                    <SetupNextButton onClick={() => createLikesPool()}>I've created</SetupNextButton>
                </SetupButtonContainer>
            </>
    } else if (slide === 7) {
        content =
            <>
                <SetupTitleContainer>
                    <h1>Move all folders and playlists that we've created,<br/>to the Selecta folder</h1>
                </SetupTitleContainer>
                <SetupSuperHeader style={{"margin-top": "-25px"}}>•••</SetupSuperHeader>
                <SetupPlaylistPreview src={qsFolder16Preview} style={{margin: "0 0 10px 0"}}/>
                <SetupPlaylistPreview src={seedsPreview}/>
                <SetupPlaylistPreview src={arrow} style={{height: "100px", width: "inherit"}}/>
                <SetupPlaylistPreview src={selectaPreview}/>
                <br/><br/><br/>
                <SetupButtonContainer>
                    <SetupNextButton onClick={() => {nextSlide('✅'); navigate('/seeds') }}>Done</SetupNextButton>
                </SetupButtonContainer>
            </>
    }

// } else if (slide === 4) {
//


    return (
        <StyledSetup>
            {content}
        </StyledSetup>
    )
}