import Slider from "./../../patches/react-slick";
import React, {useEffect, useMemo, useRef, useState} from "react";
import "./mobileCarousel.styles.css"
import {
    Arrow,
    ArrowContainer,
    Caption,
    CarouselContainer, CarouselFader, SelectAllButton,
    SelectTrackButton,
    StyledCarousel
} from "./mobileCarousel.styles";
import arrow from "../../images/icon-arrow-right-white.png";
import {MobileCarouselItem} from "../mobileCarouselItem/mobileCarouselItem.component";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {autoSort} from "../../utils/autoSort";
import axios from "axios";
import {FireButton} from "../setup/setup.styles";
import useColorThief from "use-color-thief";
import {set} from "react-ga";
import {useAudio} from "../../hooks/useAudio";
import {usePlayingAudioOptions} from "../../contexts/playingAudio.context";
import {useTouch} from "../../hooks/useTouch";
// import GlobalStyle from './../../app.styles';


const CAROUSEL_SPEED = 400
const MAX_ANIMATION_SPEED = 400

// export const MobileCarousel = ({content, setContent, setBackgroundGradient, setIsPseudoBackground, setPseudoBackgroundGradient, isPseudoBackground}) => {
export const MobileCarousel = ({resultTracks, setResultTracks, selectedIndex}) => {

    const [content, setContent] = useState(resultTracks.filter(track => track.selected))

// VERTICAL TOUCHES (just for blocking simultaneous X and Y swipes)
    const [touchStartY, setTouchStartY] = useState(null)
    const [touchEndY, setTouchEndY] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistanceY = 50
    const maxSwipeDistanceY = 200

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
        // if (isUpSwipe) sliderRef.current.slickNext()
        // if (isDownSwipe) sliderRef.current.slickPrev()
        if (isUpSwipe || isDownSwipe)
            return true
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
        // if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        // add your conditional logic here
        if (isLeftSwipe) addToQueue()
        if (isRightSwipe) addToQueue()

        // if (isRightSwipe)
    }

    const blockXWhenY = () => {
        const isSwipeY = onTouchEndY()
        if (!isSwipeY)
            onTouchEndX()
    }


    // const addToSeen = () => {
    //
    //     if (content) {
    //         let index
    //         if (activeItemIndex - 1 >= 0) index = activeItemIndex - 1
    //         if (activeItemIndex === content.length - 1) index = activeItemIndex
    //
    //         // console.log(activeItemIndex)
    //         if (activeItemIndex - 1 >= 0) {
    //             // add to local storage
    //             let seen = JSON.parse(window.localStorage.getItem('seen'))
    //             // console.log(seen, 'seen')
    //             if (seen && seen.length) seen.push(content[index])
    //             else seen = [content[activeItemIndex - 1]]
    //             window.localStorage.setItem('seen', JSON.stringify(seen))
    //         }
    //     }
    // }

    // const [refreshWhenAddToQueue, setRefreshWhenAddToQueue] = useState(false)

    // const {play} = useAudio(content[activeItemIndex + 1])
    const [skipCount, setSkipCount] = useState(0)

    const addToQueue = () => {
        setAnimationItemIndex(activeItemIndex)

        // put selected array to local storage
        // let selected = JSON.parse(window.localStorage.getItem('selected'))
        // console.log(selected, 'selected')
        // if (selected && selected.length) selected.push(content[activeItemIndex])
        // else selected = [content[activeItemIndex]]
        // window.localStorage.setItem('selected', JSON.stringify(selected))

        setTimeout(() => {
            // playingAudio.pause()
            setContent((prevState) => {
                // const newArray = JSON.parse(JSON.stringify(prevState))
                return prevState.filter((trackInfo, i) => i !== activeItemIndex)
            })
            setSkipCount(prevState => prevState += 1)
            setIsFirstLoad(true)
            setAnimationItemIndex(-10)
            // setRefreshWhenAddToQueue(prevState => !prevState)
            // setResultTracks(prevState => {
            //     const newArray = prevState
            //     newArray[activeItemIndex].selected = false
            //     return (newArray)
            // })
        }, MAX_ANIMATION_SPEED)
    }

    // console.log(content, 'cont')

    const [activeItemIndex, setActiveItemIndex] = useState(0)

    // const [tracksInfo, setTracksInfo] = useState(props.tracksInfo)
    const sliderRef = useRef()
    // const animationReloadHelper = Math.random().toString()
    const [animationItemIndex, setAnimationItemIndex] = useState(-10)
    const [isFirstLoad, setIsFirstLoad] = useState(false)

    // function carouselItemClickHandler(id) {
    //     if (id < activeItemIndex)
    //         sliderRef.current.slickPrev()
    //     else if (id > activeItemIndex)
    //         sliderRef.current.slickNext()
    //     else if (id === activeItemIndex)
    //         addToQueue()
    // }

    // const carouselItemsElems =
    // })

    // console.log(selectedIndex)

    const sliderSettings = {
        vertical: true,
        useTransform: true,
        // verticalScrolling: true,
        infinite: false,
        lazyLoad: true,
        autoplay: false,
        // autoplaySpeed: 10000,
        speed: CAROUSEL_SPEED,
        slidesToShow: 5,
        centerMode: true,
        centerPadding: 0,
        arrows: false,
        accessibility: false,
        waitForAnimate: false,
        verticalSwiping: true,
        animation: false,
        touchThreshold: 100,
        // initialSlide: selectedIndex,
        // swipeToSlide: false,
        beforeChange: (current, next) => {
            setActiveItemIndex(next < content.length ? next : current)
            // eslint-disable-next-line no-unused-expressions
            isFirstLoad ? setIsFirstLoad(false) : 0
            setResultTracks(prevState => {
                const newArray = prevState
                newArray[current + skipCount].selected = false
                return (newArray)
            })
        },
        // variableWidth: true,
        variableHeight: true
    }

    // initialSlide = initialSlide > numberOfSlides - slidesToShow
    //     ?  initialSlide - (slidesToShow - 1)
    //     : initialSlide
    // do('.slider).slick('slickGoTo', initialSlide, true );
   // useEffect(() => {
   //     // if (sliderRef.current) {
   //         console.log('HEEEEEEEEEEEEEEEEEEE')
   //     //     sliderRef.current.slickGoTo(selectedIndex)
   //     // setTimeout(()=> {sliderRef.current.slickGoTo(4)}, 1000)
   //     // setTimeout(()=> {sliderRef.current.slickGoTo(selectedIndex)}, 2000)
   //     const slickTrack = document.getElementsByClassName('slick-track')[0]
   //     console.log(slickTrack)
   //     // slickTrack.style = "height: 6000px"
   //     // slickTrack
   //     // setTimeout(()=> {sliderRef.current.slickGoTo(2)}, 1000)
   //     // setTimeout(()=> {sliderRef.current.slickGoTo(selectedIndex)}, 1000)
   //
   //
   //     // }
   //
   // }, [])

    // const putToQueue = (trackInfo) => {
    //
    //     fetch('http://localhost:3000/queue/any/track', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(trackInfo)
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    //     // fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks' + queueID, requestOptions)
    //     //     .then(response => response.json())
    //     //     .then(data => console.log(data));
    //
    // }

    // useEffect(() => {
    //     addToSeen()
    // }, [activeItemIndex])

    // BACKGROUND COLOURS
    const [colourPalette, setColourPalette] = useState()

    const imgSource = content && content[activeItemIndex] ? content[activeItemIndex].album.imageUrl : null
    const { palette } = useColorThief(imgSource, {
        format: 'rgb',
        colorCount: 3,
        quality: 10,
    });

    // const palette = [[23, 234, 234], [23,232,234], [234,123,12]]
    // console.log(palette, 'PAL')

    useEffect(() => {
        // console.log(content[activeItemIndex])
        if (content) {
            setColourPalette(palette)
        }

        // setIsPseudoBackground(prevState => !prevState)
        // console.log(content[activeItemIndex].album)
    // }, [palette, activeItemIndex, refreshWhenAddToQueue, animationItemIndex])
    }, [palette])

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

    const [audioMode, setAudioMode] = useState(false)
    console.log(audioMode, content[activeItemIndex].preview)

    // const { onTouchStart, onTouchMove, onTouchEnd} = useTouch('horizontal', addToQueue, addToQueue)

    return (
        <>
            <CarouselFader/>
            <CarouselContainer onTouchStart={(e) => {onTouchStartY(e); onTouchStartX(e)}}
                               onTouchMove={(e) => {onTouchMoveY(e); onTouchMoveX(e)}}
                               onTouchEnd={(e) => {blockXWhenY(e)}}>
            {/*<CarouselContainer onTouchStart={(e) => {onTouchStart(e)}}*/}
            {/*                   onTouchMove={(e) => {onTouchMove(e)}}*/}
            {/*                   onTouchEnd={(e) => {onTouchEnd(e)}}>*/}
            {/*<CarouselContainer>*/}

                {/*<ReactScrollWheelHandler*/}
                {/*    upHandler={(e) => {if (activeItemIndex > 0) sliderRef.current.slickPrev()}}*/}
                {/*    downHandler={(e) => {if (activeItemIndex < tracksInfo.length - 1) sliderRef.current.slickNext()}}*/}
                {/*    style={{outline: "none"}}*/}
                {/*>*/}
                    {/* eslint-disable-next-line no-unused-expressions */}
                    <StyledCarousel id="carousel" onClick={(e) => {e.detail === 2 ? addToQueue() : 0}}>
                        <Slider id="slider" {...sliderSettings} ref={sliderRef} style={{maxWidth: '500px'}}>
                            {content && content.map((trackInfo, i) => {
                                // const key = (Math.random() * 1000000).toString()
                                // console.log(animationItemIndex, 'INNNNNNNNNNNNNN')
                                return (
                                    <MobileCarouselItem
                                        i={i}
                                        key={i}
                                        activeItemIndex={activeItemIndex}
                                        trackInfo={trackInfo}
                                        animationItemIndex={animationItemIndex}
                                        isFirstLoad={isFirstLoad}
                                        audioMode={audioMode}
                                        setAudioMode={setAudioMode}
                                    />
                                )
                            })}
                        </Slider>
                    </StyledCarousel>
                    {/*<FireButton>Select</FireButton>*/}
                    {/*<ArrowContainer key={animationReloadHelper}>*/}
                    {/*    <Arrow src={arrow}/>*/}
                    {/*    <Caption>add to queue</Caption>*/}
                    {/*</ArrowContainer>*/}
                {/*</ReactScrollWheelHandler>*/}
            </CarouselContainer>
            {audioMode && <audio src={content[activeItemIndex].preview} autoPlay={true} loop/>}
        </>
    )
}