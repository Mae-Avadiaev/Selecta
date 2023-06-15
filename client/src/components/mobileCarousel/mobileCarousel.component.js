import Slider from "./../../patches/react-slick";
import {useEffect, useMemo, useRef, useState} from "react";
import "./mobileCarousel.styles.css"
import {Arrow, ArrowContainer, Caption, CarouselContainer, StyledCarousel} from "./mobileCarousel.styles";
import arrow from "../../images/icon-arrow-right-white.png";
import {MobileCarouselItem} from "../mobileCarouselItem/mobileCarouselItem.component";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {autoSort} from "../../utils/autoSort";
import axios from "axios";
import GlobalStyle from './../../app.styles';



const CAROUSEL_SPEED = 400
const MAX_ANIMATION_SPEED = 400

// export const MobileCarousel = ({content, setContent, setBackgroundGradient, setIsPseudoBackground, setPseudoBackgroundGradient, isPseudoBackground}) => {
export const MobileCarousel = ({content, setContent}) => {

// VERTICAL TOUCHES
    const [touchStartY, setTouchStartY] = useState(null)
    const [touchEndY, setTouchEndY] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistanceY = 50

    const onTouchStartY = (e) => {
        setTouchEndY(null) // otherwise the swipe is fired even with usual touch events
        setTouchStartY(e.targetTouches[0].clientY)
    }

    const onTouchMoveY = (e) => setTouchEndY(e.targetTouches[0].clientY)

    const onTouchEndY = () => {
        if (!touchStartY || !touchEndY) return
        const distance = touchStartY - touchEndY
        const isUpSwipe = distance > minSwipeDistanceY
        const isDownSwipe = distance < -minSwipeDistanceY
        // if (isUpSwipe || isDownSwipe) console.log('swipe', isUpSwipe ? 'up' : 'down')
        // add your conditional logic here
        if (isUpSwipe) sliderRef.current.slickNext()
        if (isDownSwipe) sliderRef.current.slickPrev()
    }

// HORIZONTAL TOUCHES
    const [touchStartX, setTouchStartX] = useState(null)
    const [touchEndX, setTouchEndX] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistanceX = 50

    const onTouchStartX = (e) => {
        setTouchEndX(null) // otherwise the swipe is fired even with usual touch events
        setTouchStartX(e.targetTouches[0].clientX)
    }

    const onTouchMoveX = (e) => setTouchEndX(e.targetTouches[0].clientX)

    const onTouchEndX = () => {
        if (!touchStartX || !touchEndX) return
        const distance = touchStartX - touchEndX
        const isLeftSwipe = distance > minSwipeDistanceX
        const isRightSwipe = distance < -minSwipeDistanceX
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        // add your conditional logic here
        if (isLeftSwipe) addToQueue()
        if (isRightSwipe) addToQueue()

        // if (isRightSwipe)
    }


    // const [tracksInfo, setTracksInfo] = useState(props.tracksInfo)
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const sliderRef = useRef()
    const animationReloadHelper = Math.random().toString()
    const [animationItemIndex, setAnimationItemIndex] = useState(-10)
    const [isFirstLoad, setIsFirstLoad] = useState(false)

    function carouselItemClickHandler(id) {
        if (id < activeItemIndex)
            sliderRef.current.slickPrev()
        else if (id > activeItemIndex)
            sliderRef.current.slickNext()
    }

    const carouselItemsElems = content.map((trackInfo, i) => {

        return (
            <MobileCarouselItem
                i={i}
                key={i}
                activeItemIndex={activeItemIndex}
                carouselItemClickHandler={carouselItemClickHandler}
                trackInfo={trackInfo}
                animationItemIndex={animationItemIndex}
                isFirstLoad={isFirstLoad}
            />
        )
    })

    const sliderSettings = {
        vertical: true,
        useTransform: true,
        // verticalScrolling: true,
        infinite: false,
        lazyLoad: true,
        autoplay: false,
        autoplaySpeed: 4500,
        speed: CAROUSEL_SPEED,
        slidesToShow: 5,
        centerMode: true,
        centerPadding: 0,
        arrows: false,
        accessibility: false,
        waitForAnimate: false,
        verticalSwiping: true,
        animation: false,
        beforeChange: (current, next) => {
            setActiveItemIndex(next)
            // eslint-disable-next-line no-unused-expressions
            isFirstLoad ? setIsFirstLoad(false) : 0
        },
        // variableWidth: true,
        variableHeight: true
    }

    const putToQueue = (trackInfo) => {


        fetch('http://localhost:3000/queue/any/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trackInfo)
        })
            .then(response => response.json())
            .then(data => console.log(data));
        // fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks' + queueID, requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data));

    }

    const [refreshWhenAddToQueue, setRefreshWhenAddToQueue] = useState(false)

    const addToQueue = () => {
        setAnimationItemIndex(activeItemIndex)
        console.log(refreshWhenAddToQueue)

        // autoSort()
        // putToQueue(content[activeItemIndex])
        setTimeout(() => {
            setContent(() => content.filter((trackInfo, i) => i !== activeItemIndex))
            setIsFirstLoad(true)
            setAnimationItemIndex(-10)
            setRefreshWhenAddToQueue(prevState => !prevState)
        }, MAX_ANIMATION_SPEED)
    }

    // BACKGROUND COLOURS
    const [colourPalette, setColourPalette] = useState()


    useEffect(() => {
        // console.log(content[activeItemIndex])
        setColourPalette(content[activeItemIndex].album.dominantColors)
        // setIsPseudoBackground(prevState => !prevState)
        // console.log(content[activeItemIndex].album)
    }, [activeItemIndex, refreshWhenAddToQueue, animationItemIndex])

    // let backgroundGragient = `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0,0,0, 0.9), rgba(0, 0, 0, 0.9))`
    useEffect(() => {
        if (colourPalette) {
            const [r1, g1, b1] = colourPalette[0]
            const [r2, g2, b2] = colourPalette[1]
            const [r3, g3, b3] = colourPalette[2]
            document.body.style.background =`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`

            // if (!isPseudoBackground)
            //     setBackgroundGradient(`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`)
            //     // setBackgroundGradient(`purple`)
            // else
            //     // setPseudoBackgroundGradient(`red`)
            //     setPseudoBackgroundGradient(`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`)


            // const styles = window.getComputedStyle(document.querySelector('body'),':after')
            // const background =`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`
            // if (!isPseudoBackground) {
            //     document.body.style.background = background
            //     styles.opacity = 0
            // } else {
            //     styles.background = background
            //     styles.opacity = 1
            // }
        }
    }, [colourPalette])

    return (
        <>
        <CarouselContainer onTouchStart={(e) => {onTouchStartY(e); onTouchStartX(e)}}
                           onTouchMove={(e) => {onTouchMoveY(e); onTouchMoveX(e)}}
                           onTouchEnd={(e) => {onTouchEndY(e); onTouchEndX(e)}}>

            {/*<ReactScrollWheelHandler*/}
            {/*    upHandler={(e) => {if (activeItemIndex > 0) sliderRef.current.slickPrev()}}*/}
            {/*    downHandler={(e) => {if (activeItemIndex < tracksInfo.length - 1) sliderRef.current.slickNext()}}*/}
            {/*    style={{outline: "none"}}*/}
            {/*>*/}
                {/* eslint-disable-next-line no-unused-expressions */}
                <StyledCarousel id="carousel" onClick={(e) => {e.detail === 2 ? addToQueue() : 0}}>
                    <Slider id="slider" {...sliderSettings} ref={sliderRef}>
                        {carouselItemsElems}
                    </Slider>
                </StyledCarousel>
                {/*<ArrowContainer key={animationReloadHelper}>*/}
                {/*    <Arrow src={arrow}/>*/}
                {/*    <Caption>add to queue</Caption>*/}
                {/*</ArrowContainer>*/}
            {/*</ReactScrollWheelHandler>*/}
        </CarouselContainer>
        </>
    )
}