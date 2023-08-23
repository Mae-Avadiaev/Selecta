import {useState, useEffect} from "react";
import {useSnackbarOptions} from "../contexts/snackbar.context";

export const useSnackbar = () => {
    // const [isActive, setIsActive] = useState(false);
    // const [message, setMessage] = useState('');
    // const [type, setType] = useState('')

    const {snackbarOptions: options, setSnackbarOptions: setOptions} = useSnackbarOptions()

    useEffect(() => {
        if (options.isActive === true) {
            setTimeout(() => {
                setOptions({
                    isActive: false,
                    message: '',
                    type: ''
                })
            }, 3000);
        }
    }, [options.isActive]);

    const openSnackbar = (msg = 'Something went wrong...', type) => {
        setOptions({
            isActive: true,
            message: msg,
            type: type
        })
    }

    return { options, openSnackbar }
}