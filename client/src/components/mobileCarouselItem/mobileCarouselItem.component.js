import {
    CoverContainer,
    CoverPreview,
    CoverShadow,
    StyledCarouselItem,
    Artists,
    Bpm,
    Info,
    SongName,
    Year,
    CarouselItemGenre,
    CarouselItemGenreContainer,
    CarouselItemGenresContainer,
    CarouselItemSlidingContainer,
    Key,
    Label
} from "./mobileCarouselItem.styles";
import React, {useEffect, useRef} from "react";
import {PlaylistTag, PlaylistTagContainer} from "../playlist/playlist.styles";

export const MobileCarouselItem = ({i, activeItemIndex, animationItemIndex, trackInfo, isFirstLoad, setAudioMode, lightText}) => {

    let artists = ''
    trackInfo.artists.forEach((artist) => {
        artists += artist.name + ', '
    })
    artists = artists.slice(0, -2)

    let animation
    let styles
    let isUpper
    // console.log(animationItemIndex, i, activeItemIndex)
    if (activeItemIndex - i === 1) {
        isUpper = true
    }
    if (animationItemIndex === i && i === activeItemIndex) {
        styles = 'swipe out'
        // console.log('swipe-out')
    } else if (animationItemIndex + 1 === i) {
        styles = 'pop up'
        // console.log('pop-up')
    }
    else if (i === activeItemIndex) {
        styles = 'active'
        animation = !isFirstLoad
    } else if (i !== activeItemIndex) {
        styles = 'inactive'
        if (i - activeItemIndex > -2 && i - activeItemIndex < 2)
            animation = !isFirstLoad
    }


    const slidingContainerRef = useRef()
    const widthContainerRef = useRef()

    let isOverflow
    if (slidingContainerRef.current)
        isOverflow = widthContainerRef.current.offsetWidth < slidingContainerRef.current.scrollWidth

    // console.log(trackInfo, 'gig')
    // console.log(lightText, palette && palette[1], 'liiiiiiiiiiii')

    return (
        <StyledCarouselItem id={i} key={i} styles={styles} animation={animation}
                             isUpper={isUpper} lightText={lightText}
        >
            <CoverContainer>
                {/*<CoverPreview src={trackInfo.album.imageUrl} alt="project preview" onClick={() => setAudioMode(prevState => !prevState)}/>*/}
                <CoverPreview src={trackInfo.album.imageUrl}/>
                {/*<CoverShadow src={trackInfo.album.imageUrl}/>*/}
            </CoverContainer>
            <Info>
                <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <SongName>{trackInfo.name}</SongName>
                    <Artists>{artists}</Artists>
                    {/*<CarouselItemGenreContainer style={{borderRadius: 0, margin: '.4rem 0 0 0'}}>*/}
                        <Label>Sub Pop Records</Label>
                    {/*</CarouselItemGenreContainer>*/}
                </div>
                <Bpm>
                    {Math.round(trackInfo.bpm)}
                    <Key>{trackInfo.key.camelot}</Key>
                    <Year>{trackInfo.album.releaseYear}</Year>
                </Bpm>
            </Info>
            <div style={{width: '60%'}} ref={widthContainerRef}>
            <CarouselItemGenresContainer>
                <CarouselItemSlidingContainer isOverflow={isOverflow} ref={slidingContainerRef}>
                    {trackInfo.genres.length ? trackInfo.genres.map((genre, i) =>
                        <CarouselItemGenreContainer key={i} lightText={lightText}>
                            <CarouselItemGenre>{genre}</CarouselItemGenre>
                        </CarouselItemGenreContainer>) :
                        <CarouselItemGenreContainer lightText={lightText}>
                            <CarouselItemGenre>no genre</CarouselItemGenre>
                        </CarouselItemGenreContainer>
                    }
                </CarouselItemSlidingContainer>
            </CarouselItemGenresContainer>
            </div>
        </StyledCarouselItem>
    )
}