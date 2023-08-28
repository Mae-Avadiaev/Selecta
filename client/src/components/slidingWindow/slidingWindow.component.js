import {ArrowButton, StyledSlidingWindow} from "./slidingWindow.styles";
import arrowIcon from "./../../images/icon-arrow-right.png"
import {useSlidingWindow} from "../../hooks/useSlidingWindow";
import {useTouch} from "../../hooks/useTouch";
import Draggable from 'react-draggable';
import {useState} from "react";

export const SlidingWindow = ({options}) => {

    const {closeSlidingWindow} = useSlidingWindow()
    const [position, setPosition] = useState(0);
    const trackPosition = (data) => {
        setPosition(data.y)
    }

    const handleStop = () => {
        if (position > 140) closeSlidingWindow()
    }

    // const {
    //     onTouchStart: onTouchStartY,
    //     onTouchMove: onTouchMoveY,
    //     onTouchEnd: onTouchEndY,
    // } = useTouch('vertical', () => {}, () => closeSlidingWindow())

    return (
        <Draggable
            axis='y'
            onDrag={(e, data) => trackPosition(data)}
            onStop={handleStop}
            bounds={{top: 30}}
            position={{x: 0, y: options.isActive ? 30 : undefined}}
        >
            <StyledSlidingWindow isActive={options.isActive}
                                 // onTouchStart={(e) => {onTouchStartY(e)}}
                                 // onTouchMove={(e) => {onTouchMoveY(e)}}
                                 // onTouchEnd={(e) => {onTouchEndY(e)}}
            >
                <ArrowButton src={arrowIcon} onClick={closeSlidingWindow}/>
                {options.content ? options.content : null}
            </StyledSlidingWindow>
        </Draggable>

    )
}