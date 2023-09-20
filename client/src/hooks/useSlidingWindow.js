import {useSlidingWindowOptions} from "../contexts/slidingWindow.context";
import {useQueryClient} from "react-query";

export const useSlidingWindow = () => {

    const queryClient = useQueryClient()
    const {slidingWindowOptions: options, setSlidingWindowOptions: setOptions} = useSlidingWindowOptions()

    const openSlidingWindow = (content, closingFunction) => {
        queryClient.invalidateQueries('playing-track');
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