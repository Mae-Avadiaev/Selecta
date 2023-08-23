import React, {useState} from "react";

const SlidingWindowContext = React.createContext(null)

export const SlidingWindowProvider = ({options, children}) => {

    const [slidingWindowOptions, setSlidingWindowOptions] = useState(options)

    return (
        <SlidingWindowContext.Provider value={{slidingWindowOptions, setSlidingWindowOptions}}>
            {children}
        </SlidingWindowContext.Provider>
    )
}

export const useSlidingWindowOptions = () => React.useContext(SlidingWindowContext)