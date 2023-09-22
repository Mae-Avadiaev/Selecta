import {
    AppPreviewHeaderLandingMobile, AppPreviewLandingMobile, AppPreviewMacLandingMobile, CenterContainerLandingMobile,
    CTAButtonMobile, FooterLandingMobile,
    LandingHeaderCaption,
    LandingHeaderMobile, MenuHandwrittenCaptionsLandingMobile,
    MenuPictureLandingMobile, PreviewsContainerLandingMobile, SectionHeaderLandingMobile,
    StyledLandingPage, ToLeftContainerLandingMobile, ToRightContainerLandingMobile
} from "./landing.page.styles"
import {
    AppPreviewCaptionLanding,
    AppPreviewHeaderLanding, AppPreviewLanding, AppPreviewMacLanding,
    AppPreviewTextContainer, CenterContainerLanding,
    CTAButton, FooterLandingDesktop, FooterTextLanding,
    MenuHandwrittenCaptionsLanding,
    MenuPictureLanding, PreviewsContainerLanding, SectionHeaderLanding,
    SelectaLogo, SelectaLogoFooter, ToLeftContainerLanding, ToRightCenterContainerLanding, ToRightContainerLanding
} from "../../desktop/pages/landing/landingDesktopPage.styles";
import selectaLogo from "../../images/selecta-logo3.png"
import menuPicture from "../../images/menu-picture.jpg";
import handwrittenCaptions from "../../images/menu-handwritten-captions.png";
import {useAnalyticsEventTracker} from "../../hooks/useAnalyticsEventTracker";
import preview2 from "../../images/preview2.png";
import preview1 from "../../images/preview1.png";
import preview3 from "../../images/preview3.png";
import preview5 from "../../images/preview5.png";
import previewMac from "../../images/preview-mac.png";
import preview6 from "../../images/preview6.png";
import selectaLogo3 from "../../images/selecta-logo3.png";
import handWrittenCaptionMobile from "../../images/handwritten-captions-mobile.png"

export const LandingPage = () => {

    const gaEventTracker = useAnalyticsEventTracker('Landing');

    const handleJoinWaitList = () => {
        gaEventTracker('clickJoinWaitList')
        window.location.href = 'https://hzyqbd3gbcq.typeform.com/to/OP2Tg2o6'
    }

    return (
        <StyledLandingPage>
            <SelectaLogo src={selectaLogo}/>
            <LandingHeaderMobile>Prepare for the mix.</LandingHeaderMobile>
            <LandingHeaderCaption>
                Selecta is a powerful tool to expand your musical collection and to plan the energy on a dance floor.
            </LandingHeaderCaption>
            <CTAButtonMobile onClick={handleJoinWaitList}>join wait-list</CTAButtonMobile>
            <MenuHandwrittenCaptionsLandingMobile src={handWrittenCaptionMobile}/>
            <MenuPictureLandingMobile src={menuPicture}/>
            <SectionHeaderLandingMobile>Find exact type of music.</SectionHeaderLandingMobile>
            <PreviewsContainerLandingMobile>
                <ToRightContainerLandingMobile style={{gridColumn: 4, gridRowStart: 1, gridRowEnd: 2}}>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLandingMobile>Choose a track</AppPreviewHeaderLandingMobile>
                        <AppPreviewCaptionLanding>
                            the track will be the base for the playlist
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                    <AppPreviewLandingMobile src={preview2}/>
                </ToRightContainerLandingMobile>
                <ToLeftContainerLandingMobile style={{gridColumn: 2, gridRowStart: 2, gridRowEnd: 3}}>
                    <AppPreviewLandingMobile src={preview1}/>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLandingMobile>Choose preset</AppPreviewHeaderLandingMobile>
                        <AppPreviewCaptionLanding>
                            find similar tracks in one click
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                </ToLeftContainerLandingMobile>
                <ToRightContainerLandingMobile style={{gridColumn: 4, gridRowStart: 3, gridRowEnd: 4}}>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLandingMobile>Or create your own </AppPreviewHeaderLandingMobile>
                        <AppPreviewCaptionLanding>
                            range the parameters like bpm, energy danceability, and more
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                    <AppPreviewLandingMobile src={preview3}/>
                </ToRightContainerLandingMobile>
                <ToLeftContainerLandingMobile style={{gridColumn: 2, gridRowStart: 4, gridRowEnd: 5}}>
                    <AppPreviewLandingMobile src={preview5}/>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLandingMobile>Filter the results</AppPreviewHeaderLandingMobile>
                        <AppPreviewCaptionLanding>
                            explore the music of particular tempo, genre and characteristics
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                </ToLeftContainerLandingMobile>
            </PreviewsContainerLandingMobile>
            <SectionHeaderLandingMobile>Sort and filter your Spotify<br/>collection.</SectionHeaderLandingMobile>
            <CenterContainerLandingMobile>
                <AppPreviewTextContainer style={{textAlign: 'center'}}>
                    <AppPreviewHeaderLandingMobile>Make selection for a mix in minutes</AppPreviewHeaderLandingMobile>
                    <AppPreviewCaptionLanding>
                        sort your collection by multiple parameters such as bpm, energy, popularity and more
                    </AppPreviewCaptionLanding>
                </AppPreviewTextContainer>
                <AppPreviewMacLandingMobile src={previewMac}/>
            </CenterContainerLandingMobile>
            <SectionHeaderLandingMobile style={{marginBottom: '4vh'}}>Watch your stats.</SectionHeaderLandingMobile>
            <AppPreviewTextContainer style={{marginBottom: '10vh'}}>
                <AppPreviewCaptionLanding style={{textAlign: 'center', marginRight: '5%', marginLeft: '5%'}}>
                    How long did you listen to music this month?<br/>
                    What is your average bpm?<br/>What percent of new music do you listen?<br/>
                    This tab will tell you!<br/>
                    Share your stats as a story or TT<br/>
                </AppPreviewCaptionLanding>
            </AppPreviewTextContainer>
            <SectionHeaderLandingMobile>Look up all track info in one tap.</SectionHeaderLandingMobile>
            <ToRightCenterContainerLanding style={{marginLeft: '22vw'}}>
                <AppPreviewTextContainer>
                    <AppPreviewHeaderLandingMobile>See track’s BPM, key, and more</AppPreviewHeaderLandingMobile>
                    <AppPreviewCaptionLanding>
                        set tags such as energy, rating,<br/>place in the mix and custom<br/>tags
                    </AppPreviewCaptionLanding>
                </AppPreviewTextContainer>
                <AppPreviewLanding src={preview6}/>
            </ToRightCenterContainerLanding>
            <AppPreviewHeaderLandingMobile style={{textAlign: 'center', marginBottom: '10vh'}}>
                Interested?<br/>Leave your email for updates
            </AppPreviewHeaderLandingMobile>
            <CTAButtonMobile onClick={handleJoinWaitList}>join wait-list</CTAButtonMobile>
            <FooterLandingMobile>
                <SelectaLogoFooter src={selectaLogo3}/>
                <FooterTextLanding><br/>© 2023 Selecta</FooterTextLanding>
                <FooterTextLanding>
                    contact with me: <strong>mitya.avadyaev@gmail.com</strong><br/><br/>
                </FooterTextLanding>
            </FooterLandingMobile>
        </StyledLandingPage>
    )
};