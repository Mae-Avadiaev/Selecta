import Slider from "./../../patches/react-slick";
import {useEffect, useMemo, useRef, useState} from "react";
import "./carousel.styles.css"
import {Arrow, ArrowContainer, Caption, CarouselContainer, StyledCarousel} from "./carousel.styles";
import arrow from "../../images/icon-arrow-right-white.png";
import {CarouselItem} from "../carouselItem/carouselItem.component";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {autoSort} from "../../utils/autoSort";

const CAROUSEL_SPEED = 150
const MAX_ANIMATION_SPEED = 400

export const Carousel = (props) => {

    const [tracksInfo, setTracksInfo] = useState(props.tracksInfo)
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const sliderRef = useRef()
    const animationReloadHelper = Math.random().toString()
    const [animationItemIndex, setAnimationItemIndex] = useState(-10)
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    function carouselItemClickHandler(id) {
        if (id < activeItemIndex)
            sliderRef.current.slickPrev()
        else if (id > activeItemIndex)
            sliderRef.current.slickNext()
    }

    const carouselItemsElems = tracksInfo.map((trackInfo, i) => {

        return (
            <CarouselItem
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

    const addToQueue = () => {
        setAnimationItemIndex(activeItemIndex)
        autoSort()
        putToQueue(tracksInfo[activeItemIndex])
        setTimeout(() => {
            setTracksInfo(() => tracksInfo.filter((trackInfo, i) => i !== activeItemIndex))
            setIsFirstLoad(true)
            setAnimationItemIndex(-10)
        }, MAX_ANIMATION_SPEED)
    }

    // detect key press
    useEffect(() => {

        const keyHandler = (e) => {
            if(e.key === 'ArrowUp' && activeItemIndex > 0) {
                sliderRef.current.slickPrev();
            } else if (e.key === 'ArrowDown' && activeItemIndex < tracksInfo.length - 1) {
                sliderRef.current.slickNext();
            } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
                addToQueue()
            }
        }

        window.addEventListener("keydown", keyHandler);
        return () => window.removeEventListener("keydown", keyHandler)

    }, [activeItemIndex, tracksInfo])

    return (
        <CarouselContainer>

            <ReactScrollWheelHandler
                upHandler={(e) => {if (activeItemIndex > 0) sliderRef.current.slickPrev()}}
                downHandler={(e) => {if (activeItemIndex < tracksInfo.length - 1) sliderRef.current.slickNext()}}
                style={{outline: "none"}}
            >
                {/* eslint-disable-next-line no-unused-expressions */}
            <StyledCarousel id="carousel" onClick={(e) => {e.detail === 2 ? addToQueue() : 0}}>
                <Slider id="slider" {...sliderSettings} ref={sliderRef}>
                    {carouselItemsElems}
                </Slider>
            </StyledCarousel>
            <ArrowContainer key={animationReloadHelper}>
                <Arrow src={arrow}/>
                <Caption>add to queue</Caption>
            </ArrowContainer>
            </ReactScrollWheelHandler>
        </CarouselContainer>

    )
}