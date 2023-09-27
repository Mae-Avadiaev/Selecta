import {
    CoverContainer,
    CoverPreview,
    CoverShadow,
    StyledCarouselItem,
    Artists,
    Bpm,
    Info,
    SongName,
    Year
} from "./mobileCarouselItem.styles";
import {useAudio} from "../../hooks/useAudio";
import React, {useEffect} from "react";
import {usePlayingAudioOptions} from "../../contexts/playingAudio.context";
import {useState} from "react";

export const MobileCarouselItem = ({i, activeItemIndex, animationItemIndex, trackInfo, isFirstLoad, audioMode, setAudioMode}) => {

    // const [audio, setAudio] = useState(null)
    const {pause, play, ref: audioRef, audioId} = useAudio(setAudioMode)
    const [source, setSource] = useState()
    const [stream, setStream] = useState()

    // useEffect(() => {
    //     if (trackInfo.preview)
    //         setAudio(new Audio(trackInfo.preview))
    // }, [trackInfo])
    // const [autoPlay, setAutoPlay] = useState(false)

    function createAudioContext (desiredSampleRate) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext

        desiredSampleRate = typeof desiredSampleRate === 'number'
            ? desiredSampleRate
            : 44100
        let context = new AudioCtor()

        // Check if hack is necessary. Only occurs in iOS6+ devices
        // and only when you first boot the iPhone, or play a audio/video
        // with a different sample rate
        if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
            context.sampleRate !== desiredSampleRate) {
            console.log(context.sampleRate, 'hi')
            const buffer = context.createBuffer(1, 1, desiredSampleRate)
            const dummy = context.createBufferSource()
            dummy.buffer = buffer
            dummy.connect(context.destination)
            dummy.start(0)
            dummy.disconnect()

            context.close() // dispose old context
            context = new AudioCtor()
        }

        return context
    }

    useEffect( () => {
        // if (audioMode && activeItemIndex === i) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                setStream(stream)
                const ac = createAudioContext()
                const source = ac.createBufferSource();
                console.log(source.context)
                // source.addEventListener('ended', () => {
                //     source.stop();
                //     // audioContext.close();
                // });

                const request = new XMLHttpRequest();

                request.open('GET', trackInfo.preview, true);
                request.responseType = 'arraybuffer';
                request.onload = () => {
                    audioContext.decodeAudioData(
                        request.response,
                        (buffer) => {
                            source.buffer = buffer;
                            source.connect(ac.destination);
                            setSource(source)
                            source.start();
                            source.context.suspend()
                            source.loop = true
                        },
                        (e) => {
                            console.log('Error with decoding audio data' + e.message);
                        });
                }

                request.send();
            })
            .catch(reason => console.error(`Audio permissions denied: ${reason}`))

    }, [])


    useEffect(() => {
        console.log(source && source.context.state)
        if (source) {
            // console.log(activeItemIndex, i, trackInfo.name, 'here')
            if (!audioMode || activeItemIndex !== i)
                if (source.context.state === 'running')
                    source.context.suspend()

            // if (!audioMode || activeItemIndex !== i)
            //     setAutoPlay(false)

            if (audioMode && activeItemIndex === i)
                if (source.context.state === 'suspended')
                    source.context.resume()
            // setAutoPlay(true)
        }


    }, [audioMode, activeItemIndex, i, trackInfo])



    let artists = ''
    trackInfo.artists.forEach((artist) => {
        artists += artist.name + ', '
    })
    artists = artists.slice(0, -2)

    let animation
    let styles
    let isUpper
    // console.log(animationItemIndex, i, activeItemIndex)
    if (activeItemIndex - i === 1) {
        isUpper = true
    }
    if (animationItemIndex === i && i === activeItemIndex) {
        styles = 'swipe out'
        // console.log('swipe-out')
    } else if (animationItemIndex + 1 === i) {
        styles = 'pop up'
        // console.log('pop-up')
    }
    else if (i === activeItemIndex) {
        styles = 'active'
        animation = !isFirstLoad
    } else if (i !== activeItemIndex) {
        styles = 'inactive'
        if (i - activeItemIndex > -2 && i - activeItemIndex < 2)
            animation = !isFirstLoad
    }


    // stop mic
    function stopAudio(stream) {
        stream.getTracks().forEach((track) => {
            if (track.readyState === 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }


    // const {playingAudio} = usePlayingAudioOptions()
    useEffect(() => {
        return () => {
            console.log('out', trackInfo.name)
            if (source && source.context.state === 'running') {
                source.stop()
                source.context.close();
            }
            console.log(stream, 'STR')
            if (stream)
                stopAudio(stream)
        }
    }, [source, activeItemIndex, i])


    return (
        <StyledCarouselItem id={i} key={i} styles={styles} animation={animation}
                             isUpper={isUpper}
        >
            <CoverContainer>
                <CoverPreview src={trackInfo.album.imageUrl} alt="project preview" onClick={() => setAudioMode(prevState => !prevState)}/>
                {/*<CoverShadow src={trackInfo.album.imageUrl}/>*/}
            </CoverContainer>
            <Info>
                <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <SongName>{trackInfo.name}</SongName>
                    <Artists>{artists}</Artists>
                    <Year>2023</Year>
                </div>
                <Bpm>
                    {Math.round(trackInfo.bpm)}
                    <p>BPM</p>
                </Bpm>
            </Info>
            <audio src={trackInfo.preview} ref={audioRef} id={audioId}/>
        </StyledCarouselItem>
    )
}