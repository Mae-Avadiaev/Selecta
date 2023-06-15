import {TrackList} from "../trackList/trackList.component";
import {
    LabelSelect,
    PlaylistHeader,
    PlaylistHeaderContainer,
    PlaylistSubheader, SelectContainer,
    StyledSeeds
} from "./seeds.styles";
import {getPlaylist} from "../../utils/requests";
import React, {useEffect, useRef, useState} from "react";
import {SetupSuperHeader} from "../setup/setup.styles";
import labelSelect from "./../../images/select-label.GIF"
import {Route, Routes, useNavigate} from "react-router-dom";
import {Carousel} from "../carousel/carousel.component";
import data from "../../myjsonfile.json"
import heyData from "./../../hey.json"
import {MobileCarousel} from "../mobileCarousel/mobileCarousel.component";

// export const Seeds = ({setBackgroundGradient, setIsPseudoBackground, setPseudoBackgroundGradient, isPseudoBackground}) => {
export const Seeds = () => {

    document.body.style.background = "linear-gradient(rgba(232, 232, 232, 0.9), rgba(18,18,18, 0.9), rgba(42, 42, 42, 0.9))"

    const [seeds, setSeeds] = useState()
    const requestSentRef = useRef(false)

    const navigate = useNavigate()

    useEffect(() => {

        if (requestSentRef.current) return
        requestSentRef.current = true

        // const requestSeeds = async () => {
        //     const response = await getPlaylist('seeds', null, navigate)
        //     if (response) setSeeds(response.data.tracks.allTracks)
        // }
        // requestSeeds()

        const findSimilar = async () => {
            const response = await getSimilar()
        }
        setSeeds(heyData)
    }, [])

    console.log(seeds, 'seeeeeeeeeds')

    return (
        <StyledSeeds>
            <Routes>
                <Route path="/" element={
                    <>
                        <div style={{display: 'flex', 'align-items': 'center', 'justify-content': 'space-between'}}>
                            <PlaylistHeaderContainer>
                                <PlaylistHeader>Seeds</PlaylistHeader>
                                <PlaylistSubheader>{seeds ? seeds.length : '0'} songs</PlaylistSubheader>
                            </PlaylistHeaderContainer>
                            <LabelSelect src={labelSelect} onClick={() => {navigate('/seeds/select')}}/>
                        </div>
                        <TrackList content={seeds}/>
                    </>
                } />
                <Route path="/select" element={
                    <SelectContainer>
                        <MobileCarousel content={seeds}
                                        setContent={setSeeds}
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