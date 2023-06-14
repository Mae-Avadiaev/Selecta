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
import {MobileCarousel} from "../mobileCarousel/mobileCarousel.component";

export const Seeds = () => {

    const [seeds, setSeeds] = useState()
    const requestSentRef = useRef(false)

    useEffect(() => {

        if (requestSentRef.current) return
        requestSentRef.current = true

        const requestSeeds = async () => {
            const response = await getPlaylist('seeds')
            setSeeds(response.data.tracks.allTracks)
        }
        requestSeeds()
    }, [])

    console.log(seeds, 'seeeeeeeeeds')

    const navigate = useNavigate()

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
                        <MobileCarousel tracksInfo={data}/>
                    </SelectContainer>
                }/>
            </Routes>
        </StyledSeeds>
    )
}