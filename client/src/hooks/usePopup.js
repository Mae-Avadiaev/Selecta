import {usePopupOptions} from "../contexts/popup.context";

export const usePopup = () => {

    const {popupOptions: options, setPopupOptions: setOptions} = usePopupOptions()

    const openPopup = (content) => {
        setOptions({
            isActive: true,
            content: content,
            confirmed: false
        })
    }

    const cancelPopup = () => {
        setOptions(prevState => { return {
            ...prevState,
            isActive: false,
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

    return {options, openPopup, cancelPopup, confirmPopup, resetConfirm}
}