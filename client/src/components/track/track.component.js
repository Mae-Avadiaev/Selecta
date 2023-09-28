import {
    StyledTrackListItem, ThreeDots, TrackListArtist,
    TrackListCover,
    TrackListTitle,
    TrackListTitleContainer
} from "./track.styles";
import seedIcon from "../../images/seeds-icon1.png";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {usePostTracks} from "../../hooks/requests/usePostTracks";
import {useQuery} from "react-query";
import {useAudio} from "../../hooks/useAudio";
import selectorUnfilled from "../../images/circle-not-filled.png"
import selectorFilled from "../../images/check-circle-filled.svg"
import {SourcesPlaylistSelector} from "../../pages/likesPoolSources/likePoolSourcesPage.styles";
import {useSelector} from "../../hooks/useSelector";
import {usePlayingAudioOptions} from "../../contexts/playingAudio.context";

export const Track = React.forwardRef((props, ref) => {

    let {track, setSelectedParams, rightElem, setResultTracks, i, setSelectedIndex} = props

    const {changes, setChanges, handleSelectChanges} = useSelector()

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

    const imageUrl = track.album.imageUrl ? track.album.imageUrl : track.album.images[1].url
    const trackPreview = track.preview ? track.preview : track.preview_url


    const {toggle, ref: audioRef, audioId} = useAudio()
    // console.log(track, 'rrrrrrrrrrrrrrrirrrrrr')

    const handleSelectedChange = () => {
        setResultTracks(prevState => {
            prevState[i].selected = !prevState[i].selected
            return [...prevState]
        })
    }
     // console.log(playingAudio, 'PLAYA')

    // pause when leaving the page
    // const {playingAudio} = usePlayingAudioOptions()
    // useEffect(() => {
    //     return () => {pause()}
    // }, [playingAudio])

    const handleIndexSelection = () => {
        setSelectedIndex(i)
        navigate('select')
    }

    return (
        <StyledTrackListItem ref={ref}>
            <TrackListCover onClick={() => {toggle()}} src={imageUrl}/>
            <TrackListTitleContainer onClick={
                rightElem === 'select' ? handleSelectedChange : handleSelectClick
            }>
                <TrackListTitle> {track.name} </TrackListTitle>
                <TrackListArtist> {artistsUnited} </TrackListArtist>
            </TrackListTitleContainer>
            {/*<TrackSubsectionContainer>*/}
            {/*    <TrackInfo>{track.bpm}</TrackInfo>*/}
            {/*    <TrackInfo>{track.album.releaseYear}</TrackInfo>*/}
            {/*    <TrackInfo>{track.duration.representation}</TrackInfo>*/}
            {/*</TrackSubsectionContainer>*/}
            {rightElem === 'select' && (!track.selected ?
                <SourcesPlaylistSelector src={selectorUnfilled} onClick={handleSelectedChange}/> :
                <SourcesPlaylistSelector src={selectorFilled} onClick={handleSelectedChange}/>
            )}
            {rightElem === 'info' &&
                <ThreeDots src={seedIcon}/>
            }
            <audio src={track.preview} ref={audioRef} id={audioId}/>
        </StyledTrackListItem>
    )
})