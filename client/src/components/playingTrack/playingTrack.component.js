import {
    CircleIcon, FlexContainerColumn, FlexContainerRow, InfoAlbumName, InfoBPM,
    InfoCircleContainer, InfoCountryOfOrigin, InfoGenreTag, InfoLabel,
    InfoSection, InfoSectionButton, InfoTrackArtists,
    InfoTrackCover,
    InfoTrackName
} from "../header/mobileHeader.styles";
import circleFilled from "../../images/circle-filled.png";
import circleUnfilled from "../../images/circle-not-filled2.png";
import {convertKeyCamelot} from "../../utils/misc";
import rymIcon from "../../images/rym-icon.png";
import likeIcon from "../../images/heart-icon.png";
import seedIcon from "../../images/seeds-icon1.png";
import {useEffect, useState} from "react";
import {useGetPlayingTrack} from "../../hooks/requests/useGetPlayingTrack";
import useColorThief from 'use-color-thief';
import {useSlidingWindow} from "../../hooks/useSlidingWindow";

export const PlayingTrack = () => {

    const [screen, setScreen] = useState(0)
    const {data: playingTrack} = useGetPlayingTrack()
    const {options} = useSlidingWindow()

    const source = playingTrack ? playingTrack.album.imageUrl : null

    const { palette } = useColorThief(source, {
        format: 'rgb',
        colorCount: 3,
        quality: 10,
    });

    console.log(palette)

    const artistString = playingTrack ? playingTrack.artists.map(artist => artist.name).join(', ') : null

    console.log(options.isActive, 'aaa')

    // useEffect(() => {
    //     console.log('change detected')
    //
    // }, [options.isActive])

    if (palette && playingTrack && options.isActive) {
        const [r1, g1, b1] = palette[0]
        const [r2, g2, b2] = palette[1]
        const [r3, g3, b3] = palette[2]
        console.log(r1,g1,b1, 'lola')
        setTimeout(() => {
            document.body.style.background =`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`
        }, 200)
        // console.log(`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`)
    } else {
        document.body.style.background = 'linear-gradient(rgba(82, 100, 105, 0.9), rgba(190,182,191, 0.9), rgba(159, 159, 184, 0.9))'
    }

    // console.log(playingTrack, 'playa')
    // console.log(playingTrack && playingTrack.album)

    return (
        <InfoSection
            screen={screen}
            onTouchStart={(e) => {}}
            onTouchMove={(e) => {}}
            onTouchEnd={(e) => {}}>
            {playingTrack ?
                <>
                    {/*{screen === 0 ?*/}
                    {/*    <InfoCircleContainer>*/}
                    {/*        <CircleIcon src={circleFilled}/>*/}
                    {/*        <CircleIcon src={circleUnfilled}/>*/}
                    {/*    </InfoCircleContainer>*/}
                    {/*    :*/}
                    {/*    <InfoCircleContainer>*/}
                    {/*        <CircleIcon src={circleUnfilled}/>*/}
                    {/*        <CircleIcon src={circleFilled}/>*/}
                    {/*    </InfoCircleContainer>*/}
                    {/*}*/}

                    <InfoTrackCover onClick={() => setScreen(prevState => prevState ? 0 : 1)} src={playingTrack.album.imageUrl}/>
                    {screen === 0 && <>
                        <InfoTrackName>{playingTrack.name}</InfoTrackName>
                        <InfoTrackArtists>{artistString}</InfoTrackArtists>
                        <FlexContainerRow style={{marginBottom: '15px'}}>
                            <InfoBPM>{playingTrack.key.camelot}<span>KEY</span></InfoBPM>
                            <InfoBPM>{Math.round(playingTrack.bpm)}<span>BPM</span></InfoBPM>
                            <InfoBPM>{playingTrack.album.releaseYear}</InfoBPM>
                        </FlexContainerRow>
                    </>}
                    {screen === 1 &&
                        <>
                            <InfoAlbumName>{playingTrack.item.album.name}</InfoAlbumName>
                            <FlexContainerRow style={{marginTop: '20px'}}>
                                {/*<InfoBPM>{playingTrack.item.album.release_date.substr(0, 4)}</InfoBPM>*/}
                                <InfoCountryOfOrigin>🇯🇲 Kingston, Jamaica</InfoCountryOfOrigin>
                            </FlexContainerRow>
                            <FlexContainerRow style={{margin: '0 0 15px 0'}}>
                                <FlexContainerColumn>
                                    <InfoGenreTag>Neo-Soul</InfoGenreTag>
                                    <InfoGenreTag>Soul</InfoGenreTag>
                                </FlexContainerColumn>
                                {/*<FlexContainerColumn style={{alignItems: 'flex-end'}}>*/}
                                {/*    <InfoBPM>105</InfoBPM>*/}
                                {/*    <InfoBPM>9A</InfoBPM>*/}
                                {/*</FlexContainerColumn>*/}
                            </FlexContainerRow>
                            <FlexContainerRow>
                                <InfoLabel>EQT Recordings</InfoLabel>
                                <InfoLabel> Capitol Records</InfoLabel>
                            </FlexContainerRow>
                        </>}
                    <FlexContainerRow style={{justifyContent: 'space-around', margin: '15px 0 0 0'}}>
                        <InfoSectionButton screen={screen} src={rymIcon}/>
                        <InfoSectionButton screen={screen} src={likeIcon}/>
                        <InfoSectionButton screen={screen} src={seedIcon}/>
                    </FlexContainerRow>
                </> :
                <h1>music on pause<br/><br/><br/>play some music in your Spotify 🎧</h1>

            }
        </InfoSection>
    )
}