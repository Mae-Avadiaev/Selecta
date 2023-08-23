import {useSlidingWindowOptions} from "../contexts/slidingWindow.context";

export const useSlidingWindow = () => {

    const {slidingWindowOptions: options, setSlidingWindowOptions: setOptions} = useSlidingWindowOptions()

    const openSlidingWindow = (content) => {
        setOptions({
            isActive: true,
            content: content
        })
    }

    const closeSlidingWindow = () => {
        setOptions(prevState => { return {
            ...prevState,
            isActive: false
        }})
    }

    return { options, openSlidingWindow, closeSlidingWindow }
}