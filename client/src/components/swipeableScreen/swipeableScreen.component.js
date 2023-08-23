import React, {useEffect, useState} from "react";
import {useTouch} from "../../hooks/useTouch";
import {MobilePageContainer} from "../../app.styles";
import {PageSwitcher} from "../pageSwitcher/pageSwitcher.component";
import {OutletContainer} from "../../pages/listen/listenPage.styles";
import {Outlet, useNavigate} from "react-router-dom";

export const SwipeableScreen = ({pageSwitcherContent, startingPage, children}) => {

    const [activeIndex, setActiveIndex] = useState(startingPage)
    const navigate = useNavigate()

    useEffect(() => {
        navigate(pageSwitcherContent[activeIndex].link)
    }, [activeIndex])

    const switchPage = (to) => {
        if (to === 'prev' && activeIndex !== 0)
            setActiveIndex(prevState => prevState - 1)
        else if (to === 'next' && activeIndex !== pageSwitcherContent.length - 1)
            setActiveIndex(prevState => prevState + 1)
    }

    const {
        onTouchStart: onTouchStartX,
        onTouchMove: onTouchMoveX,
        onTouchEnd: onTouchEndX
    } = useTouch('horizontal', () => switchPage('next'), () => switchPage('prev'))

    const {
        onTouchStart: onTouchStartY,
        onTouchMove: onTouchMoveY,
        onTouchEnd: onTouchEndY,
    } = useTouch('vertical', () => true, () => true)

    const blockXWhenY = () => {
        const isSwipeY = onTouchEndY()
        if (!isSwipeY)
            onTouchEndX()
    }

    return (
        <>
            <MobilePageContainer>
                <PageSwitcher pages={pageSwitcherContent} activeIndex={activeIndex}
                              setActiveIndex={setActiveIndex}/>
                <OutletContainer onTouchStart={(e) => {onTouchStartY(e); onTouchStartX(e)}}
                                 onTouchMove={(e) => {onTouchMoveY(e); onTouchMoveX(e)}}
                                 onTouchEnd={(e) => {blockXWhenY(e)}}>
                    {children}
                </OutletContainer>
            </MobilePageContainer>
        </>
    )
}