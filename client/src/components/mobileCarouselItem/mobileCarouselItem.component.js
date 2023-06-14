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
                {/*<CoverShadow src={trackInfo.album.images[0].url}/>*/}
            </CoverContainer>
            <Info>
                <div style={{display: 'flex', 'flex-direction': 'column', width: '80%'}}>
                    <SongName>{trackInfo.name}</SongName>
                    <Artists>{artists}</Artists>
                    <Year>2023</Year>
                </div>
                <Bpm>

                    <p>  BPM</p>
                    {Math.round(trackInfo.audio_features.tempo)}
                </Bpm>
            </Info>
        </StyledCarouselItem>
    )
}