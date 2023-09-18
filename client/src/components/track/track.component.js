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
import {useAudio} from "../../hooks/useAudio";

export const Track = React.forwardRef((props, ref) => {

    let {track, setSelectedParams, playingAudioId, setPlayingAudioId} = props

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

    const {toggle} = useAudio(trackPreview)

    return (
        <StyledTrackListItem ref={ref}>
            <TrackListCover onClick={() => {toggle(playingAudioId, setPlayingAudioId)}} src={imageUrl}/>
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
        </StyledTrackListItem>
    )
})