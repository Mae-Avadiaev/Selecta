import React, {useState, useEffect, useRef} from "react";
import {usePlayingAudioOptions} from "../contexts/playingAudio.context";

export const useAudio = (setAudioMode) => {

    // const [audio] = useState(new Audio(url));
    const ref = useRef()
    const [audioId] = useState((Math.random() * 10000000).toString())
    // ref.current.id = audioId
    // audio.id = audioId

    const {playingAudio, setPlayingAudio} = usePlayingAudioOptions()

    const toggle = () => {
        if (ref) {
            // console.log(`audio`)
            console.log(playingAudio)
            if (playingAudio && playingAudio.current.id === ref.current.id) {
                ref.current.pause()
                setPlayingAudio(null)
            } else {
                // console.log(playingAudio)
                console.log(playingAudio)
                if (playingAudio) {
                    playingAudio.current.pause()
                    console.log('here2')
                }
                ref.current.play()
                setPlayingAudio(ref)
            }
        }
    }

    const play = () => {
        console.log(playingAudio)
        if (playingAudio)
            playingAudio.current.pause()
        let promise = ref.current.play()
        promise.then(() => {})
            .catch(e => {
                setAudioMode(false)
                pause()
                console.log("[H3 Autoplay Enable] Autoplay failed for an element.\nTrying again on next event.");
            });
        setPlayingAudio(ref)
    }

    const pause = () => {
        if (playingAudio) {
            playingAudio.current.pause()
            setPlayingAudio(null)
        }
    }

    return {toggle, play, pause, ref, audioId};
};

// export const Player = ({ url }) => {
//     const [playing, toggle] = useAudio(url);
//
//     return (
//         <div>
//             <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//         </div>
//     );
// };
