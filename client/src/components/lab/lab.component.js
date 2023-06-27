import {TrackList} from "../trackList/trackList.component";
import {
    LabInput,
    LabTrackLinkContainer,
    StyledLabPage,
    LabRequestParams,
    LabResults,
    LabPresets,
    LabPresetColumn, LabPreset
} from "./lab.styles";
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";
import {serverAddress} from "../../App";
import {
    addToSimilar, createPlaylist,
    getRecommendations, getSimilar,
    getTracksAudioFeatures,
    getTracksInfo, makeRequest,
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
    const [tuneBatTracks, setTuneBatTracks] = useState()

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
        console.log(trackObject, 'traaaaaaaaaaaaaaaaaaaaaaaaaaaackOBJ')
    }


    // const debouncedRequestRefresh = useDebouncedCallback(async () => {
    //     return await requestRefresh();
    // }, 3000);

    const [requestParams, setRequestParams] = useState({})
    const handleChangeRequestParams = (e) => {
        console.log(e.target.name)

        if (e.target.id) {
            setRequestParams(prevState => {return {
                ...prevState,
                [e.target.id]: e.target.value
            }})
        } else if (e.target.name) {
            setRequestParams(prevState => {return {
                ...prevState,
                [e.target.name]: e.target.value
            }})
        }
        // console.log(requestParams)
    }

    const [recommended, setRecommended] = useState()
    const onRequestParamsSubmit = async () => {

        let allRecommendedTracks = []
        // console.log(requestParams.camelotNeighbours, 'yes?')
        let allKeys
        // console.log(requestParams, 'params')
        if (requestParams.camelotNeighbours) {
            allKeys = findNeighbourKeys(requestParams.target_key, requestParams.target_mode)
            allKeys.push({target_key: requestParams.target_key, target_mode: requestParams.target_mode})
            console.log(allKeys, allKeys)
        } else
            allKeys = [{target_key: requestParams.target_key, target_mode: requestParams.target_mode}]

        await Promise.all(allKeys.map(async (key) => {
            // const copyRequestParams = JSON.parse(JSON.stringify(requestParams))
            console.log(key, 'key')
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

        if (allRecommendedTracks.length) {

            const requestSimilar = async () => {
                const response = await getSimilar([track], navigate)
                console.log(response.data)
                return response.data.tracks.allTracks
            }

            const tuneBatTracks = await requestSimilar()

            setTuneBatTracks(tuneBatTracks)
        }
    }

    let resultTracks = recommended ? recommended.map((track, i) => <><LabTrack key={i} track={track} i={i}/><br/><br/><br/><br/></>) : null
    let resultTuneBatTracks = tuneBatTracks ? tuneBatTracks.map((track, i) => <><LabTrack key={i} track={track} i={i}/><br/><br/><br/><br/></>) : null


    const handleSubmitTracks = (recommended, navigate) => {
        // console.log(recommended.length)
        if (recommended.length > 50) {
            const numRequests = Math.ceil(recommended.length / 50)
            // console.log(numRequests)
            for (let i = 0; i < numRequests; i++) {
                const floor = 50 * (i)
                const ceil = 50 * (i + 1)
                addToSimilar(recommended.slice(floor, ceil), navigate)
                // console.log(floor, ceil)
            }
        } else {
            addToSimilar(recommended, navigate)
        }
    }

    let amountSimilar = 0
    if (recommended) {
        const uniqueValues = new Set(recommended.map(track => track.id));
        amountSimilar = recommended.length - uniqueValues.size
    }

    console.log(requestParams)
    // console.log(track)

    const date = new Date()
    const postToDifferentPlaylist = async () => {
        const resp = await createPlaylist({
            name: date.getDate() + ' ' + date.getMonth() + ' exp',
            description: JSON.stringify(requestParams),
            type: 'collection playlist',
        }, navigate)


        const tracksSpotifyIds = recommended.map((track) => track.id)
        makeRequest('PATCH', '/v1/playlist/tracks', {
            tracksSpotifyIds: tracksSpotifyIds,
            type: 'collection playlist',
            playlistId: resp.data.playlistId,
            spotifyPlaylistId: resp.data.spotifyPlaylistId
        }, navigate)
    }

    let matchedAmount = 0
    if (tuneBatTracks) {
        const uniqueValues1 = new Set(tuneBatTracks.map(track => track.id ? track.id : track.spotifyId));
        const uniqueValues2 = new Set(recommended.map(track => track.id))
        const uniqueValues = new Set([...uniqueValues1, ...uniqueValues2])
        matchedAmount = (recommended.length + tuneBatTracks.length) - uniqueValues.size
    }

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
                        id="min_energy"
                        onChange={handleChangeRequestParams}/>
                    <LabInput
                        type="text"
                        id="max_energy"
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
            {track && <LabPresets>
                <LabPresetColumn>
                    <LabPreset>
                        <span>+</span>
                        <select name='min_energy' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.energy / 100 * 99}>1</option>
                            <option value={track.energy / 100 * 97}>3</option>
                            <option value={track.energy / 100 * 95}>5</option>
                            <option value={track.energy / 100 * 93}>7</option>
                            <option value={track.energy / 100 * 90}>10</option>
                            <option value={track.energy / 100 * 85}>15</option>
                            <option value={track.energy / 100 * 80}>20</option>
                        </select>
                        <span>% chill</span>
                    </LabPreset>
                    <LabPreset>
                        <span>-</span>
                        <select name='min_danceability' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.danceability / 100 * 99}>1</option>
                            <option value={track.danceability / 100 * 97}>3</option>
                            <option value={track.danceability / 100 * 95}>5</option>
                            <option value={track.danceability / 100 * 93}>7</option>
                            <option value={track.danceability / 100 * 90}>10</option>
                            <option value={track.danceability / 100 * 85}>15</option>
                            <option value={track.danceability / 100 * 80}>20</option>
                        </select>
                        <span>% dance</span>
                    </LabPreset>
                    <LabPreset>
                        <span>-</span>
                        <select name='min_instrumentalness' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.instrumentalness / 100 * 99}>1</option>
                            <option value={track.instrumentalness / 100 * 97}>3</option>
                            <option value={track.instrumentalness / 100 * 95}>5</option>
                            <option value={track.instrumentalness / 100 * 93}>7</option>
                            <option value={track.instrumentalness / 100 * 90}>10</option>
                            <option value={track.instrumentalness / 100 * 85}>15</option>
                            <option value={track.instrumentalness / 100 * 80}>20</option>
                        </select>
                        <span>% vocals</span>
                    </LabPreset>
                    <LabPreset>
                        <span>-</span>
                        <select name='min_acousticness' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.acousticness / 100 * 99}>1</option>
                            <option value={track.acousticness / 100 * 97}>3</option>
                            <option value={track.acousticness / 100 * 95}>5</option>
                            <option value={track.acousticness / 100 * 93}>7</option>
                            <option value={track.acousticness / 100 * 90}>10</option>
                            <option value={track.acousticness / 100 * 85}>15</option>
                            <option value={track.acousticness / 100 * 80}>20</option>
                        </select>
                        <span>% acoustic</span>
                    </LabPreset>
                    <LabPreset>
                        <span>-</span>
                        <select name='min_tempo' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.tempo - 1}>1</option>
                            <option value={track.tempo - 3}>3</option>
                            <option value={track.tempo - 5}>5</option>
                            <option value={track.tempo - 7}>7</option>
                            <option value={track.tempo - 10}>10</option>
                            <option value={track.tempo - 15}>15</option>
                            <option value={track.tempo - 20}>20</option>
                        </select>
                        <span>bpm</span>
                    </LabPreset>
                    <LabPreset>
                        <span>-</span>
                        <select name='min_valence' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.valence / 100 * 99}>1</option>
                            <option value={track.valence / 100 * 97}>3</option>
                            <option value={track.valence / 100 * 95}>5</option>
                            <option value={track.valence / 100 * 93}>7</option>
                            <option value={track.valence / 100 * 90}>10</option>
                            <option value={track.valence / 100 * 85}>15</option>
                            <option value={track.valence / 100 * 80}>20</option>
                        </select>
                        <span> % darker</span>
                    </LabPreset>
                </LabPresetColumn>
                <LabPresetColumn>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_energy' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.energy / 100 * 101}>1</option>
                            <option value={track.energy / 100 * 103}>3</option>
                            <option value={track.energy / 100 * 105}>5</option>
                            <option value={track.energy / 100 * 107}>7</option>
                            <option value={track.energy / 100 * 110}>10</option>
                            <option value={track.energy / 100 * 115}>15</option>
                            <option value={track.energy / 100 * 120}>20</option>
                        </select>
                        <span> % intensity</span>
                    </LabPreset>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_danceability' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.danceability / 100 * 101}>1</option>
                            <option value={track.danceability / 100 * 103}>3</option>
                            <option value={track.danceability / 100 * 105}>5</option>
                            <option value={track.danceability / 100 * 107}>7</option>
                            <option value={track.danceability / 100 * 110}>10</option>
                            <option value={track.danceability / 100 * 115}>15</option>
                            <option value={track.danceability / 100 * 120}>20</option>
                        </select>
                        <span> % dance</span>
                    </LabPreset>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_acousticness' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.acousticness / 100 * 101}>1</option>
                            <option value={track.acousticness / 100 * 103}>3</option>
                            <option value={track.acousticness / 100 * 105}>5</option>
                            <option value={track.acousticness / 100 * 107}>7</option>
                            <option value={track.acousticness / 100 * 110}>10</option>
                            <option value={track.acousticness / 100 * 115}>15</option>
                            <option value={track.acousticness / 100 * 120}>20</option>
                        </select>
                        <span> % vocals</span>
                    </LabPreset>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_instrumentalness' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.instrumentalness / 100 * 101}>1</option>
                            <option value={track.instrumentalness / 100 * 103}>3</option>
                            <option value={track.instrumentalness / 100 * 105}>5</option>
                            <option value={track.instrumentalness / 100 * 107}>7</option>
                            <option value={track.instrumentalness / 100 * 110}>10</option>
                            <option value={track.instrumentalness / 100 * 115}>15</option>
                            <option value={track.instrumentalness / 100 * 120}>20</option>
                        </select>
                        <span> % electronic</span>
                    </LabPreset>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_tempo' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.tempo + 1}>1</option>
                            <option value={track.tempo + 3}>3</option>
                            <option value={track.tempo + 5}>5</option>
                            <option value={track.tempo + 7}>7</option>
                            <option value={track.tempo + 10}>10</option>
                            <option value={track.tempo + 15}>15</option>
                            <option value={track.tempo + 20}>20</option>
                        </select>
                        <span> bpm</span>
                    </LabPreset>
                    <LabPreset>
                        <span>+</span>
                        <select name='max_valence' onClick={handleChangeRequestParams}>
                            <option value="inf">∞</option>
                            <option value={track.valence / 100 * 101}>1</option>
                            <option value={track.valence / 100 * 103}>3</option>
                            <option value={track.valence / 100 * 105}>5</option>
                            <option value={track.valence / 100 * 107}>7</option>
                            <option value={track.valence / 100 * 110}>10</option>
                            <option value={track.valence / 100 * 115}>15</option>
                            <option value={track.valence / 100 * 120}>20</option>
                        </select>
                        <span> % lighter</span>
                    </LabPreset>
                </LabPresetColumn>
            </LabPresets> }
            <div>
                <LabResults>
                    {resultTracks}
                </LabResults>
                <div style={{display: 'flex',}}>
                    <button onClick={() => handleSubmitTracks(recommended, navigate)} style={{margin: '1em 0 0 2.5em'}}>{`Post ${recommended ? recommended.length : '0'} tracks`}</button>
                    {recommended && <p style={{color: 'white'}}>unique: {recommended.length - amountSimilar},  similar: {amountSimilar}</p>}
                    <button onClick={() => postToDifferentPlaylist()}>Post to one playlist</button>
                </div>
            </div>
            <div>
                <LabResults>
                    {resultTuneBatTracks}
                </LabResults>
                <div style={{display: 'flex',}}>
                    {/*<button onClick={() => handleSubmitTracks(recommended, navigate)} style={{margin: '1em 0 0 2.5em'}}>{`Post ${recommended ? recommended.length : '0'} tracks`}</button>*/}
                    {tuneBatTracks && <p style={{color: 'white'}}>matched: {matchedAmount}</p>}
                    {/*<button onClick={() => postToDifferentPlaylist()}>Post to one playlist</button>*/}
                </div>
            </div>

        </StyledLabPage>
    )
}