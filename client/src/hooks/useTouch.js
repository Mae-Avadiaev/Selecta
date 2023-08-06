import {useState} from "react";

export const useTouch = (mode, functionOne, functionTwo) => {
    // HORIZONTAL TOUCHES
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(mode === 'horizontal' ? e.targetTouches[0].clientX : e.targetTouches[0].clientY)
    }

    const onTouchMove = (e) => setTouchEnd(mode === 'horizontal' ? e.targetTouches[0].clientX : e.targetTouches[0].clientY)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isDirectionOneSwipe = distance > minSwipeDistance
        const isDirectionTwoSwipe = distance < -minSwipeDistance
        if (isDirectionOneSwipe) functionOne()
        if (isDirectionTwoSwipe) functionTwo()
    }

    return {onTouchStart, onTouchMove, onTouchEnd}
}