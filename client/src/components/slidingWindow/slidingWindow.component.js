import {ArrowButton, StyledSlidingWindow} from "./slidingWindow.styles";
import arrowIcon from "./../../images/icon-arrow-right.png"
import {useSlidingWindow} from "../../hooks/useSlidingWindow";
import {useTouch} from "../../hooks/useTouch";

export const SlidingWindow = ({options}) => {

    const {closeSlidingWindow} = useSlidingWindow()

    const {
        onTouchStart: onTouchStartY,
        onTouchMove: onTouchMoveY,
        onTouchEnd: onTouchEndY,
    } = useTouch('vertical', () => {}, () => closeSlidingWindow())

    return (
        <StyledSlidingWindow isActive={options.isActive}
                             onTouchStart={(e) => {onTouchStartY(e)}}
                             onTouchMove={(e) => {onTouchMoveY(e)}}
                             onTouchEnd={(e) => {onTouchEndY(e)}}>
            <ArrowButton src={arrowIcon} onClick={closeSlidingWindow}/>
            {options.content ? options.content : null}
        </StyledSlidingWindow>
    )
}