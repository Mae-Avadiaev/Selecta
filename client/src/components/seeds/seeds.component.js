import {TrackList} from "../trackList/trackList.component";
import {
    LabelSelect,
    PlaylistHeader,
    PlaylistHeaderContainer,
    PlaylistSubheader, SelectContainer,
    StyledSeeds, SubheaderLink
} from "./mobileSeeds.styles";
import {getPlaylist} from "../../utils/requests";
import React, {useEffect, useRef, useState} from "react";
import {SetupSuperHeader} from "../setup/setup.styles";
import labelSelect from "./../../images/select-label.GIF"
import {Route, Routes, useNavigate} from "react-router-dom";
import {Carousel} from "../carousel/carousel.component";
import data from "../../myjsonfile.json"
import heyData from "./../../hey.json"
import {MobileCarousel} from "../mobileCarousel/mobileCarousel.component";
import {getSimilar} from "../../utils/requests";

// export const Seeds = ({setBackgroundGradient, setIsPseudoBackground, setPseudoBackgroundGradient, isPseudoBackground}) => {
export const Seeds = ({user}) => {

    // document.body.style.background = "linear-gradient(rgba(232, 232, 232, 0.9), rgba(18,18,18, 0.9), rgba(42, 42, 42, 0.9))"
    document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    const navigate = useNavigate()

    const [seeds, setSeeds] = useState()
    const requestSentRef = useRef(false)
    const [similar, setSimilar] = useState([])

    useEffect(() => {

        if (!user) navigate("/account")

        if (requestSentRef.current) return
        requestSentRef.current = true

        const requestSeedsAndSimilar = async () => {

            // request seeds
            const seedResponse = await getPlaylist('seeds', null, navigate)
            if (seedResponse) setSeeds(seedResponse.data.tracks.allTracks)

            console.log(seedResponse.data)
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

    console.log(seeds, 'seeeeeeeeeds')
    console.log(similar, 'similar')

    const seedsLink = user ? 'https://open.spotify.com/playlist/' + user.seeds.spotifyId : null

    return (
        <StyledSeeds>
            <Routes>
                <Route path="/" element={
                    <>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <PlaylistHeaderContainer>
                                <PlaylistHeader>Seeds</PlaylistHeader>
                                <div style={{position: 'relative'}}>
                                <PlaylistSubheader>{(similar && similar.length) ? similar.length + ' new tracks':
                                    <SubheaderLink href={seedsLink}>No new seeds. Add</SubheaderLink>}
                                    {similar.length ? <LabelSelect src={labelSelect} onClick={() => {navigate('/seeds/select')}}/> : null}
                                </PlaylistSubheader>
                                </div>
                            </PlaylistHeaderContainer>

                        </div>
                        <TrackList content={seeds}/>
                    </>
                } />
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