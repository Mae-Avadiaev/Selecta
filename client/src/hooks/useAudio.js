import React, { useState, useEffect } from "react";

export const useAudio = (url) => {

    const [audio] = useState(new Audio(url));
    const [audioId] = useState((Math.random() * 10000000).toString())

    audio.id = audioId

    const toggle = (playingAudio, setPlayingAudio) => {
        if (url) {
            // console.log(`audio`)
            // console.log(playingAudio && playingAudio.id, audio.id)
            if (playingAudio && playingAudio.id === audio.id) {
                audio.pause()
                setPlayingAudio(null)
            } else {
                // console.log(playingAudio)
                if (playingAudio)
                    playingAudio.pause()
                audio.play()
                setPlayingAudio(audio)
            }
        }
    }

    return {toggle};
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
