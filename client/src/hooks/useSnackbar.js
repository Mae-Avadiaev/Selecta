import {useState, useEffect} from "react";

export const useSnackbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('')

    useEffect(() => {
        if (isActive === true) {
            setTimeout(() => {
                setIsActive(false);
            }, 3000);
        }
    }, [isActive]);

    const openSnackbar = (msg = 'Something went wrong...', type) => {
        setMessage(msg)
        setType(type)
        setIsActive(true);
    }

    return { isActive, message, type, openSnackbar }
}