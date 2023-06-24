import {TrackList} from "../trackList/trackList.component";
import {
    AddButton, AlgoRule, AlgoRuleContainer, AlgoRulesContainer, ButtonsContainer,
    LabelSelect, NewSeedsContainer,
    PlaylistHeader,
    PlaylistHeaderContainer,
    PlaylistSubheader, RadioCaption, RadioInput, RadioInputGroup, SelectContainer, StyledAlgoPage,
    StyledSeeds, SubheaderLink
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

    // console.log(seeds, 'seeeeeeeeeds')
    // similar ? console.log(similar.length, 'similar') : console.log('no similar')

    const seedsLink = user ? 'https://open.spotify.com/playlist/' + user.seeds.spotifyId : null

    const [selectedSeedTrack, setSelectedSeedTrack] = useState()

    return (
        <StyledSeeds>
            <Routes>
                <Route path="/" element={
                    <>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <PlaylistHeaderContainer>
                                <PlaylistHeader>Seeds
                                    {/*{similar.length ? <LabelSelect src={selectModeIcon} onClick={() => {navigate('/seeds/select')}}/> : null}*/}
                                </PlaylistHeader>
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
                        <div style={{height: '60vh', overflow: 'scroll'}}>
                            <TrackList content={seeds} setSelectedSeedTrack={setSelectedSeedTrack}/>
                        </div>
                    </>
                } />

                <Route path="/algo" element={
                    <StyledAlgoPage>
                        <PlaylistHeaderContainer style={{width: '100%', paddingLeft: '0', marginBottom: '25px'}}>
                            <PlaylistHeader>Rules
                                {/*{similar.length ? <LabelSelect src={selectModeIcon} onClick={() => {navigate('/seeds/select')}}/> : null}*/}
                            </PlaylistHeader>
                        </PlaylistHeaderContainer>
                        {/*<NewSeedsContainer></NewSeedsContainer>*/}
                        <div style={{height: '60vh', overflow: 'scroll'}}>
                        <AlgoRulesContainer>
                            <AlgoRuleContainer>
                                <input type='radio'/>
                                <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 10bpm</AlgoRule>
                            </AlgoRuleContainer>
                            <AlgoRuleContainer>
                                <input type='radio'/>
                                <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 5bpm</AlgoRule>
                            </AlgoRuleContainer>

                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 3bpm</AlgoRule>
                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>- 1bpm</AlgoRule>
                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 1bpm</AlgoRule>
                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 3bpm</AlgoRule>
                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 5bpm</AlgoRule>
                            <AlgoRule style={{background: 'rgb(231,214,168, 0.5)'}}>+ 10bpm</AlgoRule>

                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Chill🌶</AlgoRule>
                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Chiller</AlgoRule>
                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Little Chiller</AlgoRule>
                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Little more Intense</AlgoRule>
                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>More Intense</AlgoRule>
                            <AlgoRule style={{background: 'rgb(227,171,158, 0.5)'}}>Intense🔊</AlgoRule>

                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Not for Dance🪑</AlgoRule>
                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Not for Dance, but...</AlgoRule>
                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Little not for Dance</AlgoRule>
                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Little Dance</AlgoRule>
                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>More Dance</AlgoRule>
                            <AlgoRule style={{background: 'rgb(159,191,210, 0.5)'}}>Dance💃</AlgoRule>

                            <AlgoRule style={{background: 'rgb(145,197,181, 0.5)'}}>Without vocals🎻</AlgoRule>
                            <AlgoRule style={{background: 'rgb(145,197,181, 0.5)'}}>With vocals🎙</AlgoRule>

                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Acoustic🎷</AlgoRule>
                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>More Acoustic</AlgoRule>
                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Little more Acoustic</AlgoRule>
                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Little more Electronic</AlgoRule>
                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>More Electronic</AlgoRule>
                            <AlgoRule style={{background: 'rgba(75, 97, 110, 0.5)'}}>Electronic🎛</AlgoRule>

                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Dark🌚</AlgoRule>
                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Darker</AlgoRule>
                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Little Darker</AlgoRule>
                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Little Lighter</AlgoRule>
                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Lighter</AlgoRule>
                            <AlgoRule style={{background: 'rgba(164, 68, 44, 0.5)'}}>Light🌞</AlgoRule>
                        </AlgoRulesContainer>
                        <ButtonsContainer>
                            <AddButton style={{color: 'black'}}>Save and Go</AddButton>
                            <AddButton style={{color: 'black'}}>Go</AddButton>
                        </ButtonsContainer>
                        </div>
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
                    </StyledAlgoPage>
                }/>

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