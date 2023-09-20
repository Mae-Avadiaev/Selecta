import {
    AppPreviewCaptionLanding,
    AppPreviewHeaderLanding,
    AppPreviewLanding, AppPreviewMacLanding,
    AppPreviewTextContainer, CenterContainerLanding, CTAButton,
    EmailBox,
    EmailFormContainer,
    EmailFormInput, FooterLandingDesktop, FooterTextLanding,
    LandingHeaderCaptionDesktop,
    LandingHeaderDesktop,
    MenuCaptionLanding,
    MenuHandwrittenCaptionsLanding,
    MenuPictureLanding,
    PreviewsContainerLanding,
    SectionHeaderLanding, SelectaLogo, SelectaLogoFooter,
    StyledLandingDesktopPage,
    ToLeftContainerLanding, ToRightCenterContainerLanding,
    ToRightContainerLanding
} from "./landingDesktopPage.styles";
import {ActionButton, RowFlexContainer, Search, SearchBox} from "../../../app.styles";
import {PresetsTextButton} from "../../../pages/presets/presets.page.styles";
import {useState} from "react";
import menuPicture from "../../../images/menu-picture.jpg"
import handwrittenCaptions from  "../../../images/menu-handwritten-captions.png"
import preview1 from "../../../images/preview1.png"
import preview2 from "../../../images/preview2.png"
import preview3 from "../../../images/preview3.png"
import preview4 from "../../../images/preview4.png"
import preview5 from "../../../images/preview5.png"
import preview6 from "../../../images/preview6.png"
import previewMac from "../../../images/preview-mac.png"
import selectaLogo3 from "../../../images/selecta-logo3.png"
import {Logo} from "../../../components/header/header.styles";



export const LandingDesktopPage = () => {

    const [email, setEmail] = useState()

    const handleInputChange = (e) => {
        if (e.target.value === '')
            setEmail(null)
        else
            setEmail(e.target.value)
    }

    return (
        <StyledLandingDesktopPage>
            <SelectaLogo src={selectaLogo3}/>
            <LandingHeaderDesktop>Prepare for the mix.</LandingHeaderDesktop>
            <LandingHeaderCaptionDesktop>
                Selecta is a powerful tool to elevate your music selection to the next level.<br/>
                Use it to find similar tracks and plan the energy on a dance floor.
            </LandingHeaderCaptionDesktop>
            <EmailFormContainer>
                <EmailBox/>
                <EmailFormInput type="text" placeholder='email@example.com' onChange={(e) => handleInputChange(e)}/>
                {/*<PresetsTextButton>join wait-list</PresetsTextButton>*/}
            </EmailFormContainer>
            <CTAButton>join wait-list</CTAButton>
            <MenuPictureLanding src={menuPicture}/>
            <MenuHandwrittenCaptionsLanding src={handwrittenCaptions}/>
            {/*<MenuCaptionLanding style={{top: '75vh', left: '7vw'}}>*/}
            {/*    Create playlists<br/>with similar music.*/}
            {/*</MenuCaptionLanding>*/}
            {/*<MenuCaptionLanding style={{top: '67vh', left: '31vw'}}>*/}
            {/*    Sort and filter your<br/>Spotify collection.*/}
            {/*</MenuCaptionLanding>*/}
            {/*<MenuCaptionLanding style={{top: '69vh', left: '53vw'}}>*/}
            {/*    Watch your stats*/}
            {/*</MenuCaptionLanding>*/}
            {/*<MenuCaptionLanding style={{top: '73vh', right: '7vw'}}>*/}
            {/*    All info about<br/>playing track, it's<br/>artist, and album*/}
            {/*</MenuCaptionLanding>*/}
            <SectionHeaderLanding>Find exact type of music.</SectionHeaderLanding>
            <PreviewsContainerLanding>
                <ToRightContainerLanding style={{gridColumn: 1, gridRowStart: 1, gridRowEnd: 3}}>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLanding>Choose a track</AppPreviewHeaderLanding>
                        <AppPreviewCaptionLanding>
                            the track will be the base for the playlist
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                    <AppPreviewLanding src={preview2}/>
                </ToRightContainerLanding>
                <ToLeftContainerLanding style={{gridColumn: 2, gridRowStart: 2, gridRowEnd: 4}}>
                    <AppPreviewLanding src={preview1}/>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLanding>Choose an algorithm</AppPreviewHeaderLanding>
                        <AppPreviewCaptionLanding>
                            find similar tracks in one click
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                </ToLeftContainerLanding>
                <ToRightContainerLanding style={{gridColumn: 1, gridRowStart: 3, gridRowEnd: 5}}>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLanding>Or create your own </AppPreviewHeaderLanding>
                        <AppPreviewCaptionLanding>
                            range the parameters like bpm, energy danceability, and more
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                    <AppPreviewLanding src={preview3}/>
                </ToRightContainerLanding>
                <ToLeftContainerLanding style={{gridColumn: 2, gridRowStart: 4, gridRowEnd: 6}}>
                    <AppPreviewLanding src={preview5}/>
                    <AppPreviewTextContainer>
                        <AppPreviewHeaderLanding>Filter and sort the results</AppPreviewHeaderLanding>
                        <AppPreviewCaptionLanding>
                            explore the music of particular tempo, genre and characteristics
                        </AppPreviewCaptionLanding>
                    </AppPreviewTextContainer>
                </ToLeftContainerLanding>
            </PreviewsContainerLanding>
            <SectionHeaderLanding>Sort and filter your Spotify<br/>collection.</SectionHeaderLanding>
            <CenterContainerLanding>
                <AppPreviewMacLanding src={previewMac}/>
                <AppPreviewTextContainer>
                    <AppPreviewHeaderLanding>Make selection for a mix in minutes</AppPreviewHeaderLanding>
                    <AppPreviewCaptionLanding>
                        sort your collection by multiple parameters such as bpm, energy, popularity and more
                    </AppPreviewCaptionLanding>
                </AppPreviewTextContainer>
            </CenterContainerLanding>
            <SectionHeaderLanding>Watch your stats.</SectionHeaderLanding>
            <AppPreviewTextContainer style={{marginBottom: '10vh'}}>
                <AppPreviewHeaderLanding style={{textAlign: 'center'}}>
                    How long did you listen to music this month?<br/>
                    What is your average bpm?<br/>What percent of new music do you listen?<br/>
                    This tab will tell you!<br/>
                    Share your stats as a story or TT<br/>
                </AppPreviewHeaderLanding>
            </AppPreviewTextContainer>
            <SectionHeaderLanding>Look up all track info in one tap.</SectionHeaderLanding>
            <ToRightCenterContainerLanding>
                <AppPreviewTextContainer>
                    <AppPreviewHeaderLanding>See track’s BPM, key, and more</AppPreviewHeaderLanding>
                    <AppPreviewCaptionLanding>
                        set tags such as energy, rating,<br/>place in the mix and custom<br/>tags
                    </AppPreviewCaptionLanding>
                </AppPreviewTextContainer>
                <AppPreviewLanding src={preview6}/>
            </ToRightCenterContainerLanding>
            <AppPreviewHeaderLanding style={{textAlign: 'center', marginBottom: '5vh'}}>
                Interested?<br/>Leave your email for updates
            </AppPreviewHeaderLanding>
            <EmailFormContainer>
                <EmailBox/>
                <EmailFormInput type="text" placeholder='email@example.com' onChange={(e) => handleInputChange(e)}/>
                {/*<PresetsTextButton>join wait-list</PresetsTextButton>*/}
            </EmailFormContainer>
            <CTAButton>join wait-list</CTAButton>
            <FooterLandingDesktop>
                <SelectaLogoFooter src={selectaLogo3}/>
                <FooterTextLanding>© 2023 Selecta</FooterTextLanding>
                <FooterTextLanding style={{marginRight: '10px'}}>
                    contact with me: <strong>mitya.avadyaev@gmail.com</strong>
                </FooterTextLanding>
            </FooterLandingDesktop>
        </StyledLandingDesktopPage>
    )
}