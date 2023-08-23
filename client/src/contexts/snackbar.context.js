import React, {useState} from "react";

const SnackbarContext = React.createContext(null)

export const SnackbarProvider = ({options, children}) => {

    const [snackbarOptions, setSnackbarOptions] = useState(options)

    return (
        <SnackbarContext.Provider value={{snackbarOptions, setSnackbarOptions}}>
            {children}
        </SnackbarContext.Provider>
    )
}

export const useSnackbarOptions = () => React.useContext(SnackbarContext)