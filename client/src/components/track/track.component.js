import {
    StyledTrackListItem, ThreeDots, TrackListArtist,
    TrackListCover,
    TrackListTitle,
    TrackListTitleContainer
} from "./track.styles";
import seedIcon from "../../images/seeds-icon1.png";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {usePostTracks} from "../../hooks/requests/usePostTracks";
import {useQuery} from "react-query";

export const Track = ({track, setSelectedParams, inViewRef, playingAudioId, setPlayingAudioId}) => {

    let artistsUnited = ''
    track.artists.forEach((artist) => {
        artistsUnited += artist.name + ', '
    })
    artistsUnited = artistsUnited.slice(0, -2)

    const navigate = useNavigate()

    const {mutateAsync: postTracks} = usePostTracks()

    const handleSelectClick = async () => {

        if (!track.spotifyId)
            track = (await postTracks([track])).data.tracks[0]

        setSelectedParams(prevState => {return ({
            ...prevState,
            track: track,
            params: {
                ...prevState.params,
                seedTracks: track.spotifyId
            }
        })})
        navigate('/add/presets')
    }

    // if (inViewRef !== null) console.log(inViewRef, 'riho')


    const [audioId, _] = useState((Math.random() * 10000000).toString())

    const togglePlay = () => {
        if (trackPreview) {
            const audio = document.getElementById(audioId)
            console.log(`audio`)
            if (playingAudioId === audioId) {
                audio.pause()
                setPlayingAudioId(null)
            } else {
                console.log(playingAudioId)
                if (playingAudioId) {
                    const playingAudio = document.getElementById(playingAudioId)
                    playingAudio.pause()
                }
                audio.play()
                setPlayingAudioId(audioId)
            }
        }
    }

    const imageUrl = track.album.imageUrl ? track.album.imageUrl : track.album.images[1].url
    const trackPreview = track.preview ? track.preview : track.preview_url

    return (
        <StyledTrackListItem ref={inViewRef}>
            <TrackListCover onClick={() => {togglePlay()}} src={imageUrl}/>
            <TrackListTitleContainer>
                <TrackListTitle> {track.name} </TrackListTitle>
                <TrackListArtist> {artistsUnited} </TrackListArtist>
            </TrackListTitleContainer>
            {/*<TrackSubsectionContainer>*/}
            {/*    <TrackInfo>{track.bpm}</TrackInfo>*/}
            {/*    <TrackInfo>{track.album.releaseYear}</TrackInfo>*/}
            {/*    <TrackInfo>{track.duration.representation}</TrackInfo>*/}
            {/*</TrackSubsectionContainer>*/}
            <ThreeDots src={seedIcon} onClick={handleSelectClick}/>
            <audio id={audioId}>
                <source src={trackPreview} type="audio/mpeg"/>
            </audio>
        </StyledTrackListItem>
    )
}