import {TrackList} from "../trackList/trackList.component";
import {
    AddButton,
    AlgoRule,
    AlgoRuleContainer,
    AlgoRulesContainer,
    AlgoSelect,
    AlgoSelectsContainer,
    ButtonsContainer,
    LabelSelect,
    NewSeedsContainer,
    OptionsContainer,
    PlaylistHeader,
    PlaylistHeaderContainer,
    PlaylistSubheader,
    RadioCaption,
    RadioInput,
    RadioInputGroup,
    SelectContainer,
    SimpleTextButton,
    SlidersContainer,
    StyledAlgoPage,
    StyledSeeds,
    SubheaderLink
} from "./mobileSeeds.styles";
import {getPlaylist} from "../../utils/requests";
import React, {createContext, useEffect, useRef, useState} from "react";
import {SetupSuperHeader} from "../setup/setup.styles";
import labelSelect from "./../../images/select-label.GIF"
import {Route, Routes, useNavigate} from "react-router-dom";
import {Carousel} from "../carousel/carousel.component";
import data from "../../myjsonfile.json"
import heyData from "./../../hey.json"
import {MobileCarousel} from "../mobileCarousel/mobileCarousel.component";
import {getSimilar} from "../../utils/requests";
import selectModeIcon from "./../../images/select-mode-icon.png"
import {SelectAllButton} from "../mobileCarousel/mobileCarousel.styles";
import {RangeSlider} from "../rangeSlider/rangeSlider.component";
import {Presets} from "../presets/presets.component";

// export const Seeds = ({setBackgroundGradient, setIsPseudoBackground, setPseudoBackgroundGradient, isPseudoBackground}) => {
export const Seeds = ({user, similar, setSimilar}) => {

    // document.body.style.background = "linear-gradient(rgba(232, 232, 232, 0.9), rgba(18,18,18, 0.9), rgba(42, 42, 42, 0.9))"
    // document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    const navigate = useNavigate()

    const [seeds, setSeeds] = useState()
    const requestSentRef = useRef(false)


    useEffect(() => {

        if (!user) navigate("/account")

        if (requestSentRef.current) return
        requestSentRef.current = true

        const requestSeedsAndSimilar = async () => {

            // request seeds
            const seedResponse = await getPlaylist('seeds', null, navigate)
            if (seedResponse) setSeeds(seedResponse.data.tracks.allTracks)

            // console.log(seedResponse.data)
            // request similar
            // let allSimilarTracks
            // if (seedResponse && seedResponse.data.tracks.newTracks.length) {
            const similarResponse = await getSimilar(seedResponse.data.tracks.newTracks)
            if (similarResponse) setSimilar(similarResponse.data.tracks.allTracks)
            // }

            // // request yet unsorted from DB
            // const similarUnsortedResponse = await getPlaylist('similar', null, navigate)
            // if (similarUnsortedResponse && similarUnsortedResponse.data.tracks.allTracks.length) {
            //     setSimilar([...similarUnsortedResponse.data.tracks.allTracks, ...allSimilarTracks])
            // }
        }
        requestSeedsAndSimilar()


        // setSeeds(heyData)
    }, [])

    // console.log(seeds[0], 'seeeeeeeeeds')
    // similar ? console.log(similar.length, 'similar') : console.log('no similar')

    const seedsLink = user ? 'https://open.spotify.com/playlist/' + user.seeds.spotifyId : null

    const [selectedSeedTrack, setSelectedSeedTrack] = useState()

    if (!selectedSeedTrack && window.location.pathname === '/seeds/algo')
        navigate('/seeds')

    const getElementRGB = (ref, i) => {
        const element = ref.current[i]
        // console.log(ref.current[i])
        const style = window.getComputedStyle(element,"");
        return style.getPropertyValue("background-color");
    }

    // const itemsRef = useRef([])
    const colors = [
    //     'rgb(231,214,168, 0.5)',
    //     'rgb(227,171,158, 0.5)',
    //     'rgb(159,191,210, 0.5)',
    //     'rgb(145,197,181, 0.5)',
    //     'rgba(75, 97, 110, 0.5)',
    //     'rgba(164, 68, 44, 0.5)',
    //     'rgba(255,255,255,0.5)',
        'rgba(255,255,255,0.5)',
    ]
    //
    const types = [
    //     'min_tempo',
    //     'max_tempo',
    //     'max_energy',
    //     'min_energy',
    //     'max_danceability',
    //     'min_danceability',
    //     'instrumentalness',
    //     'max_acousticness',
    //     'min_acousticness',
    //     'max_valence',
    //     'min_valence',
        'sort_by_bpm',
        'sort_by_year',
        'sort_latest',
        'key_match',
        'destination',
        'custom_playlist_name'
    ]

    // const functions = [
    //     (value, type, track) => {
    //         // console.log(track)
    //         // console.log(track)
    //         return track.bpm + value
    //     },
    //     (value, type, track) => {
    //         return track.energy + value
    //     },
    //     (value, type, track) => {
    //         return track.danceability + value
    //     },
    //     (value, type, track) => {
    //         return track.instrumentalnes + value
    //     },
    //     (value, type, track) => {
    //         return track.accousticnes + value
    //     },
    //     (value, type, track) => {
    //         return track.valence + value
    //     }
    // ]
    //
    // const propertiesContent = [{
    //     name: '- 10bpm',
    //     type: types[0],
    //     color: colors[0],
    //     value: -10,
    //     getValue: functions[0]
    // }, {
    //     name: '- 5bpm',
    //     type: types[0],
    //     color: colors[0],
    //     value: -5,
    //     getValue: functions[0]
    // }, {
    //     name: '- 3bpm',
    //     type: types[0],
    //     color: colors[0],
    //     value: -3,
    //     getValue: functions[0]
    // }, {
    //     name: '- 1bpm',
    //     type: types[0],
    //     color: colors[0],
    //     value: -1,
    //     getValue: functions[0]
    // }, {
    //     name: '+ 1bpm',
    //     type: types[1],
    //     color: colors[0],
    //     value: 1,
    //     getValue: functions[0]
    // }, {
    //     name: '+ 3bpm',
    //     type: types[1],
    //     color: colors[0],
    //     value: 3,
    //     getValue: functions[0]
    // }, {
    //     name: '+ 5bpm',
    //     type: types[1],
    //     color: colors[0],
    //     value: 5,
    //     getValue: functions[0]
    // }, {
    //     name: '+ 10bpm',
    //     type: types[1],
    //     color: colors[0],
    //     value: 10,
    //     getValue: functions[0]
    // },
    //
    // {
    //     name: 'Chill🌶',
    //     type: types[2],
    //     color: colors[1],
    //     value: 0.01,
    //     getValue: functions[1]
    // }, {
    //     name: 'Chiller',
    //     type: types[2],
    //     color: colors[1],
    //     value: 0.1,
    //     getValue: functions[1]
    // }, {
    //     name: 'Little Chiller',
    //     type: types[2],
    //     color: colors[1],
    //     value: 0.2,
    //     getValue: functions[1]
    // }, {
    //     name: 'Little more Intense',
    //     type: types[3],
    //     color: colors[1],
    //     value: -0.2,
    //     getValue: functions[1]
    // }, {
    //     name: 'More Intense',
    //     type: types[3],
    //     color: colors[1],
    //     value: -0.1,
    //     getValue: functions[1]
    // }, {
    //     name: 'Intense🔊',
    //     type: types[3],
    //     color: colors[1],
    //     value: -0.01,
    //     getValue: functions[1]
    // },
    //
    // {
    //     name: 'Not for Dance🪑',
    //     type: types[4],
    //     color: colors[2],
    //     value: 0.01,
    //     getValue: functions[2]
    // }, {
    //     name: 'Not for Dance, but...',
    //     type: types[4],
    //     color: colors[2],
    //     value: 0.1,
    //     getValue: functions[2]
    // }, {
    //     name: 'Little not for Dance',
    //     type: types[4],
    //     color: colors[2],
    //     value: 0.2,
    //     getValue: functions[2]
    // }, {
    //     name: 'Little Danceable',
    //     type: types[5],
    //     color: colors[2],
    //     value: -0.2,
    //     getValue: functions[2]
    // }, {
    //     name: 'More Danceable',
    //     type: types[5],
    //     color: colors[2],
    //     value: -0.1,
    //     getValue: functions[2]
    // }, {
    //     name: 'Danceable💃',
    //     type: types[5],
    //     color: colors[2],
    //     value: -0.01,
    //     getValue: functions[2]
    // },
    //
    // {
    //     name: 'Without Vocals🎻',
    //     type: types[6],
    //     color: colors[3],
    //     value: 0.01,
    //     getValue: functions[3]
    // }, {
    //     name: 'Less Vocals',
    //     type: types[6],
    //     color: colors[3],
    //     value: 0.2,
    //     getValue: functions[3]
    // }, {
    //     name: 'More Vocals',
    //     type: types[6],
    //     color: colors[3],
    //     value: -0.2,
    //     getValue: functions[3]
    // }, {
    //     name: 'With Vocals🎙',
    //     type: types[6],
    //     color: colors[3],
    //     value: -0.01,
    //     getValue: functions[3]
    // },
    //
    // {
    //     name: 'Acoustic🎷',
    //     type: types[7],
    //     color: colors[4],
    //     value: -0.01,
    //     getValue: functions[4]
    // }, {
    //     name: 'More Acoustic',
    //     type: types[7],
    //     color: colors[4],
    //     value: -0.1,
    //     getValue: functions[4]
    // }, {
    //     name: 'Little more Acoustic',
    //     type: types[7],
    //     color: colors[4],
    //     value: -0.2,
    //     getValue: functions[4]
    // }, {
    //     name: 'Little more Electronic',
    //     type: types[8],
    //     color: colors[4],
    //     value: 0.2,
    //     getValue: functions[4]
    // }, {
    //     name: 'More Electronic',
    //     type: types[8],
    //     color: colors[4],
    //     value: 0.1,
    //     getValue: functions[4]
    // }, {
    //     name: 'Electronic🎛',
    //     type: types[8],
    //     color: colors[4],
    //     value: 0.01,
    //     getValue: functions[4]
    // },
    //
    // {
    //     name: 'Dark🌚',
    //     type: types[9],
    //     color: colors[5],
    //     value: -0.01,
    //     getValue: functions[5]
    // }, {
    //     name: 'Darker',
    //     type: types[9],
    //     color: colors[5],
    //     value: -0.1,
    //     getValue: functions[5]
    // }, {
    //     name: 'Little Darker',
    //     type: types[9],
    //     color: colors[5],
    //     value: -0.2,
    //     getValue: functions[5]
    // }, {
    //     name: 'Little Lighter',
    //     type: types[10],
    //     color: colors[5],
    //     value: 0.2,
    //     getValue: functions[5]
    // }, {
    //     name: 'Lighter',
    //     type: types[10],
    //     color: colors[5],
    //     value: 0.1,
    //     getValue: functions[5]
    // }, {
    //     name: 'Light🌞',
    //     type: types[10],
    //     color: colors[5],
    //     value: 0.01,
    //     getValue: functions[5]
    // }]
    //
    const sortContent = [{
            name: 'by BPM from Low to High',
            type: types[0],
            color: colors[0],
            value: 'BPM ASC'
        }, {
            name: 'by Year from Low to High',
            type: types[1],
            color: colors[0],
            value: 'YEAR ASK'
        }, {
            name: 'by Year from High to Low',
            type: types[1],
            color: colors[0],
            value: 'YEAR DEC'
        },
        // {
        //     name: 'Last 6 month',
        //     type: types[2],
        //     color: colors[0],
        //     value: [new Date().setMonth(new Date().getMonth() - 6), new Date()]
        // },
        // {
        //     name: 'Last 2 month',
        //     type: types[2],
        //     color: colors[0],
        //     value: [new Date().setMonth(new Date().getMonth() - 2), new Date()]
        // },
        {
            name: 'Last 2 weeks',
            type: types[2],
            color: colors[0],
            value: [new Date().setDate(new Date().getDate() - 14), new Date()]
        },

        {
            name: 'Try to Match the Key',
            type: types[3],
            color: colors[0],
            value: 'KEY CAMELOT'
        },
    ]
    //
    //     {
    //         name: '50s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1950-01-01"), new Date("1954-12-31")]
    //     }, {
    //         name: '50s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1955-01-01"), new Date("1959-12-31")]
    //     }, {
    //         name: '60s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1960-01-01"), new Date("1964-12-31")]
    //     }, {
    //         name: '60s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1965-01-01"), new Date("1969-12-31")]
    //     }, {
    //         name: '70s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1970-01-01"), new Date("1974-12-31")]
    //     }, {
    //         name: '70s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1975-01-01"), new Date("1979-12-31")]
    //     }, {
    //         name: '80s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1980-01-01"), new Date("1984-12-31")]
    //     }, {
    //         name: '80s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1985-01-01"), new Date("1989-12-31")]
    //     }, {
    //         name: '90s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1990-01-01"), new Date("1994-12-31")]
    //     }, {
    //         name: '90s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("1995-01-01"), new Date("1999-12-31")]
    //     }, {
    //         name: '00s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("2000-01-01"), new Date("2004-12-31")]
    //     }, {
    //         name: '00s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("2005-01-01"), new Date("2009-12-31")]
    //     }, {
    //         name: '10s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("2010-01-01"), new Date("2014-12-31")]
    //     }, {
    //         name: '10s II',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("2015-01-01"), new Date("2019-12-31")]
    //     }, {
    //         name: '20s I',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date("2020-01-01"), new Date("2024-12-31")]
    //     }, {
    //         name: 'Last Year',
    //         type: types[12],
    //         color: colors[6],
    //         value: [new Date().setFullYear(new Date().getFullYear() - 1), new Date()]
    //     },
    // ]
    //
    // const destinationsContent = [{
    //         name: 'to Queue',
    //         type: types[13],
    //         color: colors[7]
    //     }, {
    //         name: 'to Playlist',
    //         type: types[13],
    //         color: colors[7]
    //     }, {
    //         name: 'Custom Playlist Name',
    //         type: types[14],
    //         color: colors[7]
    //     },
    // ]
    let sliderData
    if (selectedSeedTrack) {
        sliderData = [{
            minCaption: 'Slow',
            maxCaption: 'Fast',
            param: selectedSeedTrack.bpm
        }, {
            minCaption: 'Chill',
            maxCaption: 'Intense',
            param: selectedSeedTrack.energy
        }, {
            minCaption: 'Not for Dance',
            maxCaption: 'Danceable',
            param: selectedSeedTrack.danceability
        }, {
            minCaption: 'Instrumental',
            maxCaption: 'With Vocals',
            param: selectedSeedTrack.instrumentalness
        }, {
            minCaption: 'Acoustic',
            maxCaption: 'Electronic',
            param: selectedSeedTrack.acousticness
        }, {
            minCaption: 'Dark',
            maxCaption: 'Light',
            param: selectedSeedTrack.valence
        }, {
            minCaption: 'Old',
            maxCaption: 'New',
            param: selectedSeedTrack.album.releaseYear
        }]

        // console.log(selectedSeedTrack)
    }

    console.log(selectedSeedTrack)

    const [requestParams, setRequestParams] = useState({})
    const [sortOptions, setSortOptions] = useState({})

    const handleChangeAlgoRule = (e, type, setState) => {
        setState(prevState => ({
            ...prevState,
            [type]: e.target.value
        }))
    }

    const [sortingOptions, setSortingOptions] = useState([])
    const [sortCount, setSortCount] = useState(0)

    const deleteSortingOption = (i) => {
        // console.log(i, 'index')
        // console.log(sortingOptions[i], 'option')
        setSortingOptions(prevState => {
            const res = prevState.filter((elem, index) => elem.props.id !== i)
            return res
        })

        setSortCount(prevState => prevState -= 1)
    }

    const addSortingOption = () => {

        if (sortCount < 3) {
            setSortingOptions((prevState) => {

                const id = sortCount

                const res = [...prevState,
                    <AlgoSelectsContainer id={id} key={id}>
                        <h3 onClick={() => deleteSortingOption(sortCount === 0 ? 0 : sortCount === 1 ? 1 : 2)} style={{marginLeft: '30px'}}>-</h3>
                        <AlgoSelect>
                            <option value=''>None</option>
                            <option value=''>by BPM </option>
                            <option value=''>by Year</option>
                            <option value=''>by Energy</option>
                        </AlgoSelect>
                        <AlgoSelect>
                            <option>from Low to High ↑</option>
                            <option>from High to Low ↓</option>
                        </AlgoSelect>
                    </AlgoSelectsContainer>]
                return res
            })

            setSortCount(prevState => prevState += 1)
        }

    }

    return (
        <StyledSeeds>
            <Routes>
                <Route path="/" element={
                    <>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <PlaylistHeaderContainer>
                                <PlaylistHeader>Seeds</PlaylistHeader>
                                    {/*{similar.length ? <LabelSelect src={selectModeIcon} onClick={() => {navigate('/seeds/select')}}/> : null}*/}
                                <div style={{position: 'relative'}}>
                                {/*<PlaylistSubheader>*/}
                                    <div style={{display: 'flex', alignItems: 'center', margin: '15px 0 15px 0'}}>
                                    {/*No new seeds. <a link={seedsLink}>To</a>*/}
                                    {/*<NewSeedsContainer>*/}
                                        <a href={seedsLink} target='_blank' style={{textDecoration: 'none'}}>
                                            <AddButton>
                                                <span style={{fontWeight: 'bold', letterSpacing: '0.4rem', fontSize: '1.7em', marginRight: '0.3em'}}>+</span> Add tracks
                                            </AddButton>
                                        </a>
                                        {/*<span style={{color: '#cbc8c8'}}>A d d t r a c k s</span>*/}
                                    {/*</NewSeedsContainer>*/}
                                    </div>
                                {/*</PlaylistSubheader>*/}
                                </div>
                            </PlaylistHeaderContainer>
                        </div>
                        {/*<div style={{height: '300px', background: 'rgba(100, 100, 100, 0.5)', position: 'fixed'}}>xxxxxxxxx</div>*/}
                        {/*<NewSeedsContainer>*/}
                        {/*    <AddButton>+</AddButton><span style={{color: '#cbc8c8'}}>Add tracks</span>*/}
                        {/*</NewSeedsContainer>*/}
                        <div style={{height: '57vh', overflow: 'scroll'}}>
                            <TrackList content={seeds} setSelectedSeedTrack={setSelectedSeedTrack}/>
                        </div>
                    </>
                } />

                <Route path="/presets" element={
                    <Presets/>
                }/>

                <Route path="/algo" element={
                    <StyledAlgoPage>
                        <PlaylistHeaderContainer style={{width: '100%', paddingLeft: '0', marginBottom: '25px'}}>
                            <PlaylistHeader style={{marginLeft: '5%'}}>Rules</PlaylistHeader>
                        </PlaylistHeaderContainer>
                        <div style={{height: '60vh', overflow: 'scroll', width: '100%'}}>
                            {/*<h1>Properties</h1>*/}
                            {/*<AlgoRulesContainer>*/}
                            <SlidersContainer>
                                {selectedSeedTrack && sliderData.map((data, i) => <RangeSlider
                                    key={i} minCaption={data.minCaption} maxCaption={data.maxCaption} param={data.param}/>)}
                            </SlidersContainer>
                            <OptionsContainer style={{marginTop: '-30px'}}>
                                <h1>Amount</h1>
                                <AlgoSelect>
                                    <option value=''>5</option>
                                    <option value=''>10</option>
                                    <option selected="selected" value=''>20</option>
                                    <option value=''>30</option>
                                    <option value=''>50</option>
                                </AlgoSelect>
                            </OptionsContainer>
                            <OptionsContainer>
                                <h1>Key</h1>
                                <AlgoSelect>
                                    <option value=''>Same</option>
                                    <option value=''>Same and Others</option>
                                    <option selected="selected" value=''>Camelot Adjacent</option>
                                    <option value=''>All</option>
                                </AlgoSelect>
                            </OptionsContainer>
                            <OptionsContainer>
                                <h1>Sort</h1>
                                <AddButton onClick={addSortingOption} style={{background: 'none', color: '#2b283a', filter: 'none'}}>add Sorting</AddButton>
                            </OptionsContainer>
                            {sortingOptions}
                            <OptionsContainer>
                                <h1>Destination</h1>
                                <AlgoSelect>
                                    <option value=''>to Playlist</option>
                                    <option value=''>to Queue</option>
                                </AlgoSelect>
                            </OptionsContainer>
                            <OptionsContainer style={{marginBottom: '30px'}}>
                                <h1>Name</h1>
                                <input type='text' placeholder='Auto Generated'/>
                            </OptionsContainer>
                            <ButtonsContainer>
                                <AddButton style={{color: 'black'}}>Go</AddButton>
                                <AddButton style={{color: 'black'}}>Save and Go</AddButton>
                            </ButtonsContainer>
                        </div>
                    </StyledAlgoPage>
                }/>

                {/*<Route path="/algo" element={*/}
                {/*    <StyledAlgoPage>*/}
                {/*        <PlaylistHeaderContainer style={{width: '100%', paddingLeft: '0', marginBottom: '25px'}}>*/}
                {/*            <PlaylistHeader>Rules*/}
                {/*                /!*{similar.length ? <LabelSelect src={selectModeIcon} onClick={() => {navigate('/seeds/select')}}/> : null}*!/*/}
                {/*            </PlaylistHeader>*/}
                {/*        </PlaylistHeaderContainer>*/}
                {/*        /!*<NewSeedsContainer></NewSeedsContainer>*!/*/}
                {/*        <div style={{height: '60vh', overflow: 'scroll'}}>*/}
                {/*            <h1>Properties</h1>*/}
                {/*            <AlgoRulesContainer>*/}

                {/*                {selectedSeedTrack && propertiesContent.map((pContent, i) =>*/}
                {/*                    <AlgoRuleContainer key={i} backgroundColor={pContent.color} onChange={(e) => handleChangeAlgoRule(e, pContent.type, setRequestParams)}>*/}
                {/*                        <input type='radio' name={pContent.type} value={pContent.getValue(pContent.value, pContent.type, selectedSeedTrack)}/>*/}
                {/*                        <AlgoRule style={{backgroundColor: pContent.color}}>{pContent.name}</AlgoRule>*/}
                {/*                    </AlgoRuleContainer>)}*/}

                {/*            </AlgoRulesContainer>*/}
                {/*            <h1>Sort</h1>*/}
                {/*            <AlgoRulesContainer style={{marginTop: '5px'}}>*/}

                {/*                {sortContent.map((sContent, i) =>*/}
                {/*                    <AlgoRuleContainer key={i} backgroundColor={sContent.color} onChange={(e) => handleChangeAlgoRule(e, sContent.type, setSortOptions)}>*/}
                {/*                        <input type='radio' name={sContent.type} value={sContent.value}/>*/}
                {/*                        <AlgoRule style={{backgroundColor: sContent.color}}>{sContent.name}</AlgoRule>*/}
                {/*                    </AlgoRuleContainer>)}*/}

                {/*            </AlgoRulesContainer>*/}
                {/*            <h1>Destinations</h1>*/}
                {/*            <AlgoRulesContainer style={{marginTop: '5px'}}>*/}

                {/*                {destinationsContent.map((dContent, i) =>*/}
                {/*                    <AlgoRuleContainer key={i} backgroundColor={dContent.color}>*/}
                {/*                        <input type='radio' name={dContent.type} value=''/>*/}
                {/*                        <AlgoRule style={{backgroundColor: dContent.color}}>{dContent.name}</AlgoRule>*/}
                {/*                    </AlgoRuleContainer>)}*/}

                {/*            </AlgoRulesContainer>*/}
                {/*        </div>*/}
                {/*    </StyledAlgoPage>*/}
                {/*}/>*/}
                                {/*<AlgoRuleContainer background={getElementRGB('-10bpm')}>*/}
                                {/*    <input type='radio' name='min_tempo' value=''/>*/}
                                {/*    <AlgoRule id={'-10bpm'} style={{backgroundColor: 'rgb(231,214,168, 0.5)'}}>- 10bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio' name='min_tempo' value=''/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 5bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio' name='min_tempo' value=''/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 3bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio' name='min_tempo' value=''/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 1bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 1bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 3bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 5bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 10bpm</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Chill🌶</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Chiller</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Little Chiller</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Little more Intense</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>More Intense</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Intense🔊</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Not for Dance🪑</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Not for Dance, but...</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Little not for Dance</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Little Dance</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>More Dance</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Dance💃</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(145,197,181, 0.5)'}}>Without vocals🎻</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgb(145,197,181, 0.5)'}}>With vocals🎙</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Acoustic🎷</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>More Acoustic</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Little more Acoustic</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Little more Electronic</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>More Electronic</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Electronic🎛</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Dark🌚</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Darker</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Little Darker</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Little Lighter</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Lighter</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}
                                {/*<AlgoRuleContainer>*/}
                                {/*    <input type='radio'/>*/}
                                {/*    <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Light🌞</AlgoRule>*/}
                                {/*</AlgoRuleContainer>*/}

                        {/*</AlgoRulesContainer>*/}
                        {/*<h1>Sort</h1>*/}
                        {/*<AlgoRulesContainer style={{marginTop: '5px'}}>*/}

                        {/*    <AlgoRuleContainer>*/}
                        {/*        <input type='radio'/>*/}
                        {/*        <AlgoRule style={{background: 'rgba(255,255,255,0.5)'}}>Sort by BPM from Low to High</AlgoRule>*/}
                        {/*    </AlgoRuleContainer>*/}
                        {/*    <AlgoRuleContainer>*/}
                        {/*        <input type='radio'/>*/}
                        {/*        <AlgoRule style={{background: 'rgba(255,255,255,0.5)'}}>Try to Match the Key</AlgoRule>*/}
                        {/*    </AlgoRuleContainer>*/}

                        {/*</AlgoRulesContainer>*/}
                        {/*<h1>Destinations</h1>*/}
                        {/*<AlgoRulesContainer style={{marginTop: '5px'}}>*/}

                        {/*    <AlgoRuleContainer>*/}
                        {/*        <input type='radio'/>*/}
                        {/*        <AlgoRule style={{background: 'rgba(255,255,255,0.5)'}}>to Queue</AlgoRule>*/}
                        {/*    </AlgoRuleContainer>*/}
                        {/*    <AlgoRuleContainer>*/}
                        {/*        <input type='radio'/>*/}
                        {/*        <AlgoRule style={{background: 'rgba(255,255,255,0.5)'}}>to Playlist</AlgoRule>*/}
                        {/*    </AlgoRuleContainer>*/}

                        {/*    <AlgoRuleContainer>*/}
                        {/*        <input type='radio'/>*/}
                        {/*        <AlgoRule style={{background: 'rgba(255,255,255,0.5)'}}>Playlist Custom Name</AlgoRule>*/}
                        {/*    </AlgoRuleContainer>*/}

                        {/*</AlgoRulesContainer>*/}
                        {/*<ButtonsContainer>*/}
                        {/*    <AddButton style={{color: 'black'}}>Save and Go</AddButton>*/}
                        {/*    <AddButton style={{color: 'black'}}>Go</AddButton>*/}
                        {/*</ButtonsContainer>*/}
                        {/*</div>*/}


                        {/*<AddButton>Create</AddButton>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🐢</RadioCaption>*/}
                        {/*    <select>*/}
                        {/*        <option value=''>none</option>*/}
                        {/*        <option value=''>± 1</option>*/}
                        {/*        <option value=''>± 3</option>*/}
                        {/*        <option value=''>± 5</option>*/}
                        {/*        <option value=''>± 7</option>*/}
                        {/*        <option value=''>± 10</option>*/}
                        {/*    </select>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>🐇️</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🏖</RadioCaption>*/}
                        {/*    <RadioInput type='radio' value='chill' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='all' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='more intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>🔊</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🪑</RadioCaption>*/}
                        {/*    <RadioInput type='radio' value='chill' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='all' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='more intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>💃</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🚫</RadioCaption>*/}
                        {/*    <RadioInput type='radio' value='chill' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>🎙</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🎸</RadioCaption>*/}
                        {/*    <RadioInput type='radio' value='chill' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='all' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='more intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>🎶</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                        {/*<RadioInputGroup>*/}
                        {/*    <RadioCaption>🌚</RadioCaption>*/}
                        {/*    <RadioInput type='radio' value='chill' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='chiller' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='all' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='more intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioInput type='radio' value='intense' name='energy'/>*/}
                        {/*    <RadioCaption style={{textAlign: 'right'}}>🌞</RadioCaption>*/}
                        {/*</RadioInputGroup>*/}
                    {/*</StyledAlgoPage>*/}


                <Route path="/select" element={
                    <SelectContainer>
                        <MobileCarousel content={similar}
                                        setContent={setSimilar}
                                        // setIsPseudoBackground={setIsPseudoBackground}
                                        // setBackgroundGradient={setBackgroundGradient}
                                        // setPseudoBackgroundGradient={setPseudoBackgroundGradient}
                                        // isPseudoBackground={isPseudoBackground}
                        />
                    </SelectContainer>
                }/>
            </Routes>
        </StyledSeeds>
    )
}