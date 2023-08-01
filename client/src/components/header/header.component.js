import {Outlet, useNavigate} from "react-router-dom";
import {StyledLink, StyledHeader, Links, Logo, SpotifyLogo, UserAvatar, LinkStroke} from "./header.styles";
import spotifyLogo from "../../images/spotify-logo.png"
import {useState} from "react";
import selectaLogo1 from "./../../images/selecta-logo1.png"
import selectaLogo2 from "./../../images/selecta-logo2.png"
import selectaLogo3 from "./../../images/selecta-logo3.png"
import { BrowserView, MobileView } from "react-device-detect";
import {
    MobileLogo,
    MobilePlayContainer,
    MobileStyledHeader,
    MobilePlaySecondText,
    MobilePlayFirstText,
    InfoSection,
    InfoTrackCover,
    InfoTrackName,
    InfoTrackArtists,
    ParamIconsContainer,
    ParamIcon,
    FlexContainerRow,
    InfoSectionButton,
    InfoBPM,
    InfoGenreTag,
    InfoLabel,
    InfoAlbumName,
    InfoCountryOfOrigin,
    FlexContainerColumn,
    MobilePlayBackground,
    MobilePlayBackgroundSecond,
    MobilePlayBackgroundFirst,
    CircleIcon,
    InfoCircleContainer, AccountMenu, AccountMenuLink
} from "./mobileHeader.styles";
import {localIp} from "../../App";
import {makeRequest} from "../../utils/requests";
import {SecondaryText} from "../seedsPage/seedsPage.styles";
import energyIconNotFilled from './../../images/energy-icon-not-filled.png'
import energyIconBlue from './../../images/energy-icon-blue.png'
import likeIcon from './../../images/heart-icon.png'
import seedIcon from './../../images/seeds-icon1.png'
import {Bpm} from "../mobileCarouselItem/mobileCarouselItem.styles";
import rymIcon from "./../../images/rym-icon.png"
import circleFilled from './../../images/circle-filled.png'
import circleUnfilled from './../../images/circle-not-filled2.png'
import {convertKeyCamelot} from "../../utils/misc";

const Header = ({user, setUser}) => {

    const navigate = useNavigate()
    const [page, setPage] = useState("none")
    const [isOpenedInfoSection, setIsOpenedInfoSection] = useState(false)
    const [playingTrack, setPlayingTrack] = useState()

    if (playingTrack && isOpenedInfoSection) {
        const [r1, g1, b1] = playingTrack.item.album.dominantColors[0]
        const [r2, g2, b2] = playingTrack.item.album.dominantColors[1]
        const [r3, g3, b3] = playingTrack.item.album.dominantColors[2]
        document.body.style.background =`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`
        // console.log(`linear-gradient(rgba(${r1}, ${g1}, ${b1}, 0.9), rgba(${r2},${g2},${b2}, 0.9), rgba(${r3}, ${g3}, ${b3}, 0.9))`)
    } else {
        document.body.style.background = 'linear-gradient(rgba(65, 71, 58, 0.9), rgba(199,157,130, 0.9), rgba(146, 168, 159, 0.9))'
    }
    // else
    //     document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    // const [clicked, setClicked] = useState(false)
    const toggleInfoSection = async () => {

        // if (isOpenedInfoSection) {
        //     setIsOpenedInfoSection(false)
        //     document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'
        // }
        // make a request
        let response
        if (!playingTrack) {
            response = await makeRequest('GET', 'v1/tracks/playing', {}, navigate )
            if (Object.keys(response.data.tracks.allTracks[0]).length)
                setPlayingTrack(response.data.tracks.allTracks[0])
            else
                setPlayingTrack(null)
            console.log(response.data.tracks.allTracks[0], 'playingTrack')
        }
        // if (response && Object.keys(response.data.tracks.allTracks[0]).length)
        setIsOpenedInfoSection(prevState => !prevState)
        // setClicked(prevState => !prevState)
    }

    let playerMessage
    let artistString
    if (!user)
        playerMessage = 'Log in to track'
    else {
        if (!playingTrack && playingTrack !== null)
            playerMessage = "What's playing?"
        else if (playingTrack === null) {
            playerMessage = 'Music on pause'
        } else {
            artistString = playingTrack.item.artists.map(artist => artist.name).join(', ')
            playerMessage = artistString + ' - ' + playingTrack.item.name
        }
    }

    const [screen, setScreen] = useState(0)

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
        if (isLeftSwipe) setScreen(1)
        if (isRightSwipe) setScreen(0)

        // if (isRightSwipe)
    }

    const [menuOpened, setMenuOpened] = useState(false)

    const logOut = () => {

        makeRequest('GET', '/v1/auth/log-out', null, navigate)
        window.localStorage.removeItem('user')
        setUser(null)
        setMenuOpened(false)
        navigate('/')
    }

    return (
        <>
            <MobileView>
                <MobileStyledHeader>
                    <MobileLogo to="/"><img src={selectaLogo3}/> </MobileLogo>
                    {/*<SpotifyLogo src={spotifyLogo} style={{background: 'red'}}/>*/}
                    <MobilePlayContainer onClick={toggleInfoSection}>
                        {/*<MobilePlaySecondText>Now playing:</MobilePlaySecondText>*/}
                        {/*<MobilePlayBackgroundSecond>Now playing:</MobilePlayBackgroundSecond>*/}
                        <MobilePlayFirstText>{playerMessage}</MobilePlayFirstText>
                        <MobilePlayBackgroundFirst>{playerMessage}</MobilePlayBackgroundFirst>
                    </MobilePlayContainer>
                    {/*{isOpenedInfoSection && !playingTrack &&*/}
                    {/*    <img style={{width: '100px', filter: 'invert(1)' }} src={"https://media1.giphy.com/media/oEbmxULuVEuvJ3E3AB/200w.webp?cid=ecf05e47pes9nj4y331mk92fsapm8c1317edvard4tb88ykl&ep=v1_stickers_search&rid=200w.webp&ct=s"}/>*/}
                    {/*}*/}
                    <InfoSection
                        screen={screen}
                        isOpenedInfoSection={isOpenedInfoSection && playingTrack ? isOpenedInfoSection : false}
                        onTouchStart={(e) => {onTouchStartX(e)}}
                        onTouchMove={(e) => {onTouchMoveX(e)}}
                        onTouchEnd={(e) => {onTouchEndX()}}>
                    {playingTrack &&
                        <>
                            {screen === 0 ?
                                <InfoCircleContainer>
                                    <CircleIcon src={circleFilled}/>
                                    <CircleIcon src={circleUnfilled}/>
                                </InfoCircleContainer>
                            :
                                <InfoCircleContainer>
                                    <CircleIcon src={circleUnfilled}/>
                                    <CircleIcon src={circleFilled}/>
                                </InfoCircleContainer>
                            }

                            <InfoTrackCover onClick={() => setScreen(prevState => prevState ? 0 : 1)} src={playingTrack.item.album.images[0].url}/>
                            {screen === 0 && <>
                                <InfoTrackName>{playingTrack.item.name}</InfoTrackName>
                                <InfoTrackArtists>{artistString}</InfoTrackArtists>
                                <FlexContainerRow style={{marginBottom: '15px'}}>
                                    <InfoBPM>{Math.round(playingTrack.audio_features[0].tempo)}<span>BPM</span></InfoBPM>
                                    <InfoBPM>{convertKeyCamelot(playingTrack.audio_features[0].key, playingTrack.audio_features[0].mode)}<span>KEY</span></InfoBPM>
                                    <InfoBPM>{playingTrack.item.album.release_date.substr(0, 4)}</InfoBPM>
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


                        </>
                    }
                    </InfoSection>
                    {user && user.avatarUrl ?
                        <UserAvatar onClick={() => {setMenuOpened(prevState => !prevState)}}
                                    src={user.avatarUrl} alt="User avatar"/>
                        :
                        <SpotifyLogo onClick={()=>{window.location.href = `http://${localIp}:3000/auth/request-authorization`}}
                                     src={spotifyLogo} alt="Spotify Logo"/>
                    }
                    <AccountMenu menuOpened={menuOpened}>
                        <AccountMenuLink>Settings</AccountMenuLink>
                        <AccountMenuLink onClick={logOut}>Log Out</AccountMenuLink>
                    </AccountMenu>
                </MobileStyledHeader>
            </MobileView>
            <BrowserView>
                <StyledHeader>
                    <Logo to="/"><img src={selectaLogo3}/> </Logo>
                    <Links>
                        {/*<div>*/}
                        <StyledLink to="/seeds"
                                    onClick={() => setPage("seeds")}
                                    streched={page === "seeds"}
                        >Seeds
                            <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg">
                                <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                      stroke="CECECEFF" fill="none" stroke-width="1.8px"></path>
                            </LinkStroke>
                        </StyledLink>
                        {/*</div>*/}
                        <StyledLink to="/queues"
                                    onClick={() => setPage("queues")}
                                    streched={page === "queues"}
                        >Queues
                            <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-3px"}>
                                <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                      stroke="CECECEFF" fill="none" stroke-width="1.5px"></path>
                            </LinkStroke>
                        </StyledLink>
                        <StyledLink to="/likes"
                                    onClick={() => setPage("likes")}
                                    streched={page === "likes"}
                        >Likes
                            <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"1px"} customWidth={"140%"} customLeft={"-20%"} customTransform={"scale(1, 1.2)"}>
                                <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                      stroke="CECECEFF" fill="none" stroke-width="1.6px"></path>
                            </LinkStroke>
                        </StyledLink>
                        <StyledLink to="/collection"
                                    onClick={() => setPage("playlists")}
                                    streched={page === "playlists"}
                        >Playlists
                            <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-5px"} >
                                <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                      stroke="CECECEFF" fill="none" stroke-width="1.2px"></path>
                            </LinkStroke>
                        </StyledLink>
                        <StyledLink to="/showcase"
                                    onClick={() => setPage("showcase")}
                                    streched={page === "showcase"}
                        >Showcase
                            <LinkStroke fill="none" version="1.1" viewBox="0 0 86.5 21"  xmlns="http://www.w3.org/2000/svg" customTop={"-8px"} customWidth={"110%"} customLeft={"-5%"}>
                                <path d="m0.41219 3.5723s27.5-3.6065 37.578-3.0227c12.011 0.58559 31.532-0.27479 44.585 5.8393 2.8853 1.6487 4.8088 4.1219 1.1679 7.6941-7.5567 5.7019-19.647 6.4576-42.524 6.3889-38.745-0.96176-40.325-6.3202-39.982-9.6177 0.34349-3.7784 10.579-8.0376 28.784-9.1368 8.3124-0.48088 18.274-1.58 29.196-1.0992"
                                      stroke="CECECEFF" fill="none" stroke-width="1.2px"></path>
                            </LinkStroke>
                        </StyledLink>
                    </Links>
                    {user && user.avatarUrl ?
                        <UserAvatar onClick={() => {navigate("/account")}}
                                    src={user.avatarUrl} alt="User avatar"/>
                        :
                        <SpotifyLogo onClick={() => {navigate("/account")}}
                                     src={spotifyLogo} alt="Spotify Logo"/>
                    }
                </StyledHeader>
            </BrowserView>
        </>
    )
};

export default Header;