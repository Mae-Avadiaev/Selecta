import {TrackList} from "../trackList/trackList.component";
import {StyledSeeds} from "./seeds.styles";
import {getPlaylist} from "../../utils/requests";
import {useEffect, useRef, useState} from "react";

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

    return (
        <StyledSeeds>
            <TrackList content={seeds}/>
        </StyledSeeds>
    )
}