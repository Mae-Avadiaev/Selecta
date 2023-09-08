import {ArrowButton, StyledSlidingWindow} from "./slidingWindow.styles";
import arrowIcon from "./../../images/icon-arrow-right.png"
import {useSlidingWindow} from "../../hooks/useSlidingWindow";
import {useTouch} from "../../hooks/useTouch";
import Draggable from 'react-draggable';
import {useState} from "react";

export const SlidingWindow = ({options}) => {

    const {closeSlidingWindow} = useSlidingWindow()
    const [position, setPosition] = useState({ x: 0, y: 30 });
    const [isControlled, setIsControlled] = useState(true);

    const handleStart = () => {
        setIsControlled(false)
    }

    const trackPosition = (data) => {
        setPosition({ x: 0, y: data.y })
    }

    const handleStop = () => {

        if (position.y > 140) {
            if (options.closingFunction)
                options.closingFunction()
            closeSlidingWindow()
            setIsControlled(true)
            setTimeout(() => {
                setPosition({x: 0, y: 30})
            }, 300)
        } else {
            setIsControlled(true)
            setPosition({x: 0, y: 30})
        }
    }

    return (
        <Draggable
            axis='y'
            onStart={handleStart}
            onDrag={(e, data) => trackPosition(data)}
            onStop={handleStop}
            bounds={{top: 30}}
            position={position}
            cancel=".prevent-drag"
        >
            <StyledSlidingWindow isActive={options.isActive} isControlled={isControlled}>
                <ArrowButton src={arrowIcon} onClick={closeSlidingWindow}/>
                {options.content ? options.content : null}
            </StyledSlidingWindow>
        </Draggable>

    )
}