import {TrackList} from "../trackList/trackList.component";
import {LabInput, LabTrackLinkContainer, StyledLabPage, LabRequestParams, LabResults} from "./lab.styles";
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";
import {serverAddress} from "../../App";
import {
    addToSimilar,
    getRecommendations,
    getTracksAudioFeatures,
    getTracksInfo,
    requestRefresh
} from "../../utils/requests";
import {FireButton} from "../setup/setup.styles";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {LabelSelect} from "../seeds/mobileSeeds.styles";
import {LabTrack} from "./labTrack.component";
import {convertKeyCamelot, findNeighbourKeys} from "../../utils/misc";
import qe from "styled-components/dist/styled-components.browser.esm";

export const Lab = ({user}) => {

    document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/account")
    }, [])

    const [track, setTrack] = useState()
    const [trackLink, setTrackLink] = useState('');

    const handleChangeTrackInput = (event) => {
        // 👇 Get input value from "event"
        setTrackLink(event.target.value);
    };

    const onSubmitTrack = async () => {
        const tracksIds = [trackLink.substring(31).split('?')[0]]
        // console.log(tracksIds[0])
        const infoResp = await getTracksInfo(tracksIds, navigate)
        // console.log(infoResp)

        const audioFeaturesResp = await getTracksAudioFeatures(tracksIds, navigate)
        // console.log(response.data.tracks.allTracks)
        const trackObject = infoResp.data.tracks.allTracks[0]
        Object.assign(trackObject, audioFeaturesResp.data.tracks.allTracks[0])
        setTrack(trackObject)
    }


    // const debouncedRequestRefresh = useDebouncedCallback(async () => {
    //     return await requestRefresh();
    // }, 3000);

    const [requestParams, setRequestParams] = useState({})
    const handleChangeRequestParams = (e) => {
        setRequestParams(prevState => {return {
            ...prevState,
            [e.target.id]: e.target.value
        }})
        // console.log(requestParams)
    }

    const [recommended, setRecommended] = useState()
    const onRequestParamsSubmit = async () => {

        let allRecommendedTracks = []
        console.log(requestParams.camelotNeighbours, 'yes?')
        let allKeys
        if (requestParams.camelotNeighbours)
            allKeys = findNeighbourKeys(requestParams.key)
        else
            allKeys = [{key: requestParams.key, mode: requestParams.mode}]

        await Promise.all(allKeys.map(async (key) => {
            const updatedReqParams = Object.assign(requestParams, key)

            const recResp = await getRecommendations(updatedReqParams, navigate)
            let recommendedTracksInfo = recResp.data.tracks.allTracks

            const recommendedIds = recommendedTracksInfo.map(track => track.id)
            const featuresResp = await getTracksAudioFeatures(recommendedIds)
            const featuresTracksInfo = featuresResp.data.tracks.allTracks

            const trackObjects = recommendedTracksInfo.map((info, i) => Object.assign(info, featuresTracksInfo[i]))

            allRecommendedTracks = [...allRecommendedTracks, ...trackObjects]
        }))

        setRecommended(allRecommendedTracks)
    }

    let resultTracks = recommended ? recommended.map((track, i) => <><LabTrack track={track} i={i}/><br/><br/><br/><br/></>) : null



    return (
        <StyledLabPage>
            <LabTrackLinkContainer>
                {/*<h1>INFO</h1>*/}
                <p>Tracks link</p>
                <input
                    type="text"
                    id="trackLink"
                    onChange={handleChangeTrackInput}/>
                <button onClick={onSubmitTrack}>Submit</button>
            </LabTrackLinkContainer>
            <LabTrack track={track} i={'main'}/>
            <LabRequestParams>
                <div>
                    <LabInput
                        style={{width: "105px"}}
                        type="text"
                        id="limit"
                        onChange={handleChangeRequestParams}/>
                    <span> limit</span>
                </div>

                    <br/>

                <div>
                    <LabInput
                        style={{width: "105px"}}
                        type="text"
                        id="seed_artists"
                        onChange={handleChangeRequestParams}/>
                    <span> seed_artists</span>
                </div>

                <div>
                    <LabInput
                        style={{width: "105px"}}
                        type="text"
                        id="seed_genres"
                        onChange={handleChangeRequestParams}/>
                    <span> seed_genres</span>
                </div>

                <LabInput
                    style={{width: "105px"}}
                    type="text"
                    id="seed_tracks"
                    onChange={handleChangeRequestParams}/>
                <span> seed_tracks</span>

                <br/><br/>

                <div>
                    <LabInput
                        type="text"
                        id="min_duration_ms"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_duration_ms"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_duration_ms"
                        onChange={handleChangeRequestParams}/>
                    <span> duration_ms</span>
                </div>

                <div>
                    <LabInput
                        type="text"
                        id="min_acousticness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_acousticness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_acousticness"
                        onChange={handleChangeRequestParams}/>
                    <span> acousticness</span>
                </div>

                <div>
                    <LabInput
                        type="text"
                        id="min_danceability"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_danceability"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_danceability"
                        onChange={handleChangeRequestParams}/>
                    <span> danceability</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_ energy"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_ energy"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_energy"
                        onChange={handleChangeRequestParams}/>
                    <span> energy</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_instrumentalness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_instrumentalness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_instrumentalness"
                        onChange={handleChangeRequestParams}/>
                    <span> instrumentalness</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_key"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_key"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_key"
                        onChange={handleChangeRequestParams}/>
                    <input
                        type='checkbox'
                        id='camelotNeighbours'
                        onChange={handleChangeRequestParams}/>
                    <span> key [neighbours]</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_liveness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_liveness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_liveness"
                        onChange={handleChangeRequestParams}/>
                    <span> liveness</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_mode"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_mode"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_mode"
                        onChange={handleChangeRequestParams}/>
                    <span> mode</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_popularity"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_popularity"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_popularity"
                        onChange={handleChangeRequestParams}/>
                    <span> popularity</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_speechiness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_speechiness"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_speechiness"
                        onChange={handleChangeRequestParams}/>
                    <span> speechiness</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_tempo"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_tempo"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_tempo"
                        onChange={handleChangeRequestParams}/>
                    <span> bpm</span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="min_valence"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_valence"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="target_valence"
                        onChange={handleChangeRequestParams}/>
                    <span> valence</span>
                </div>
                <br/><br/>
                <button onClick={onRequestParamsSubmit}>Submit</button>
            </LabRequestParams>
            <div>
                <LabResults>
                    {resultTracks}
                </LabResults>
                <button onClick={() => addToSimilar(recommended, navigate)} style={{margin: '1em 0 0 2.5em'}}>{`Post ${recommended ? recommended.length : '0'} tracks`}</button>
            </div>

        </StyledLabPage>
    )
}