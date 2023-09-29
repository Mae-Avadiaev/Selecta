import {
    CoverContainer,
    CoverPreview,
    CoverShadow,
    StyledCarouselItem,
    Artists,
    Bpm,
    Info,
    SongName,
    Year
} from "./mobileCarouselItem.styles";
import React, {useEffect, useRef} from "react";

export const MobileCarouselItem = ({i, activeItemIndex, animationItemIndex, trackInfo, isFirstLoad, setAudioMode}) => {

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

    console.log(trackInfo.name, 'from')

    return (
        <StyledCarouselItem id={i} key={i} styles={styles} animation={animation}
                             isUpper={isUpper}
        >
            <CoverContainer>
                <CoverPreview src={trackInfo.album.imageUrl} alt="project preview" onClick={() => setAudioMode(prevState => !prevState)}/>
                {/*<CoverShadow src={trackInfo.album.imageUrl}/>*/}
            </CoverContainer>
            <Info>
                <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                    <SongName>{trackInfo.name}</SongName>
                    <Artists>{artists}</Artists>
                    <Year>{trackInfo.album.releaseYear}</Year>
                </div>
                <Bpm>
                    {Math.round(trackInfo.bpm)}
                    <p>BPM</p>
                </Bpm>
            </Info>
        </StyledCarouselItem>
    )
}