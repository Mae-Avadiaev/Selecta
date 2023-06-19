import {TrackList} from "../trackList/trackList.component";
import {LabInput, LabTrackLinkContainer, StyledLabPage} from "./lab.styles";
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";
import {serverAddress} from "../../App";
import {getTracksAudioFeatures, getTracksInfo, requestRefresh} from "../../utils/requests";
import {FireButton} from "../setup/setup.styles";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {LabelSelect} from "../seeds/mobileSeeds.styles";
import {LabTrack} from "./labTrack.component";

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
        console.log(infoResp)

        const audioFeaturesResp = await getTracksAudioFeatures(tracksIds, navigate)
        // console.log(response.data.tracks.allTracks)
        const trackObject = infoResp.data.tracks.allTracks[0]
        Object.assign(trackObject, audioFeaturesResp.data.tracks.allTracks[0])
        setTrack(trackObject)
    }



    // const debouncedRequestRefresh = useDebouncedCallback(async () => {
    //     return await requestRefresh();
    // }, 3000);

    return (
        <StyledLabPage>
            <LabTrackLinkContainer>
                {/*<h1>INFO</h1>*/}
                <p>Tracks link</p>
                <input
                    type="text"
                    id="trackLink"
                    name="trackLink"
                    onChange={handleChangeTrackInput}/>
                <button onClick={onSubmitTrack}>Submit</button>
            </LabTrackLinkContainer>
            <LabTrack track={track}/>
            <div style={{margin: '0 0 0 1em'}}>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <span> </span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <span> </span>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
                <div>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                    <LabInput
                        type="text"
                        id="trackLink"
                        name="trackLink"
                        onChange={handleChangeTrackInput}/>
                </div>
            </div>
        </StyledLabPage>
    )
}