import {useSlidingWindowOptions} from "../contexts/slidingWindow.context";

export const useSlidingWindow = () => {

    const {slidingWindowOptions: options, setSlidingWindowOptions: setOptions} = useSlidingWindowOptions()

    const openSlidingWindow = (content, closingFunction) => {
        setOptions({
            isActive: true,
            content: content,
            closingFunction: closingFunction
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