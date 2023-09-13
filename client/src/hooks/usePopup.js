import {usePopupOptions} from "../contexts/popup.context";

export const usePopup = () => {

    const {popupOptions: options, setPopupOptions: setOptions} = usePopupOptions()

    const openPopup = (content) => {
        setOptions({
            isActive: true,
            content: content,
            confirmed: false,
            canceled: false
        })
    }

    const cancelPopup = () => {
        setOptions(prevState => { return {
            ...prevState,
            isActive: false,
            canceled: true
        }})
    }

    const confirmPopup = () => {
        setOptions(prevState => { return {
            ...prevState,
            isActive: false,
            confirmed: true
        }})
    }

    const resetConfirm = () => {
        setOptions(prevState => {return {
            ...prevState,
            confirmed: false
        }})
    }

    const resetCancel = () => {
        setOptions(prevState => {return {
            ...prevState,
            canceled: false
        }})
    }

    return {options, openPopup, cancelPopup, confirmPopup, resetConfirm, resetCancel}
}