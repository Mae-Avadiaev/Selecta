import React, {useState} from "react";

const PopupContext = React.createContext(null)

export const PopupProvider = ({options, children}) => {

    const [popupOptions, setPopupOptions] = useState(options)

    return (
        <PopupContext.Provider value={{popupOptions, setPopupOptions}}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopupOptions = () => React.useContext(PopupContext)