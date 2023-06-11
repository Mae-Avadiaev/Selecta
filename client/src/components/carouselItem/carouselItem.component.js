import {CoverContainer, CoverPreview, CoverShadow, StyledCarouselItem, Artists, Bpm, Info, SongName} from "./carouselItem.styles";

export const CarouselItem = ({i, activeItemIndex, animationItemIndex, carouselItemClickHandler, trackInfo, isFirstLoad}) => {

    let artists = ''
    trackInfo.artists.forEach((artist) => {
        artists += artist.name + ', '
    })
    artists = artists.slice(0, -2)

    let animation
    let styles
    if (animationItemIndex === i && i === activeItemIndex)
        styles = 'swipe out'
    else if (animationItemIndex + 1 === i)
        styles = 'pop up'
    else if (i === activeItemIndex) {
        styles = 'active'
        animation = !isFirstLoad
    } else if (i !== activeItemIndex) {
        styles = 'inactive'
        if (i - activeItemIndex > -2 && i - activeItemIndex < 2)
            animation = !isFirstLoad
    }

    return (
        <StyledCarouselItem id={i} key={i} styles={styles} animation={animation}
             onClick={() => carouselItemClickHandler(i)}
        >
            <CoverContainer>
                <CoverPreview src={trackInfo.album.images[0].url} alt="project preview"/>
                <CoverShadow src={trackInfo.album.images[0].url}/>
            </CoverContainer>
            <Info>
                <Artists>{artists}</Artists>
                <SongName>{trackInfo.name}</SongName>
                <Bpm>
                    {Math.round(trackInfo.audio_features.tempo)}
                    <span>  BPM</span>
                </Bpm>
            </Info>
        </StyledCarouselItem>
    )
}