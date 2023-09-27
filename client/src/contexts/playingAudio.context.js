import React, {useState} from "react";

const PlayingAudioContext = React.createContext(null)

export const PlayingAudioProvider = ({options, children}) => {

    const [playingAudio, setPlayingAudio] = useState(options)

    return (
        <PlayingAudioContext.Provider value={{playingAudio, setPlayingAudio}}>
            {children}
        </PlayingAudioContext.Provider>
    )
}

export const usePlayingAudioOptions = () => React.useContext(PlayingAudioContext)