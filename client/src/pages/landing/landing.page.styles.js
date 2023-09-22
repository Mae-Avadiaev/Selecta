import styled from "styled-components";
import {MobilePageContainerColumn} from "../../app.styles";
import {
    AppPreviewHeaderLanding, AppPreviewLanding, AppPreviewMacLanding, CenterContainerLanding,
    CTAButton, FooterLandingDesktop,
    LandingHeaderCaptionDesktop,
    LandingHeaderDesktop,
    MenuHandwrittenCaptionsLanding,
    MenuPictureLanding,
    PreviewsContainerLanding,
    SectionHeaderLanding, ToLeftContainerLanding, ToRightContainerLanding
} from "../../desktop/pages/landing/landingDesktopPage.styles";

export const StyledLandingPage = styled.div`
  //margin: 0 5%;
  width: 100%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100));
  position: relative;
  padding-top: 13vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`

export const LandingHeaderMobile = styled(LandingHeaderDesktop)`
  text-align: center;
  //font-size: 6vh;
  margin: 0 5%;
  //margin-top: 10vh;
`

export const MenuHandwrittenCaptionsLandingMobile = styled(MenuHandwrittenCaptionsLanding)`
  transform: translate(-50%, 64vh);
  width: 100%;
  height: auto;
  //bottom: 50%;
  top: auto;
`

export const LandingHeaderCaption = styled(LandingHeaderCaptionDesktop)`
  margin: 4vh 5% 10vh 5%;
  font-size: 3vh;
  text-align: center;

`

export const CTAButtonMobile = styled(CTAButton)`
  width: 80vw;
  margin-bottom: 20vh;
`

export const MenuPictureLandingMobile = styled(MenuPictureLanding)`
  width: 90%;
  height: auto;
  margin-top: 0;
  box-shadow: 0 8px 80px -4px #ffffff;

`

export const SectionHeaderLandingMobile = styled(SectionHeaderLanding)`
  font-size: 6vh;
  //margin-right: 5%;
  //margin-left: 5%;
`

export const AppPreviewHeaderLandingMobile = styled(AppPreviewHeaderLanding)`
  //margin-left: 5%;
  //margin-right: 5%;
`

export const PreviewsContainerLandingMobile = styled(PreviewsContainerLanding)`
  grid-row-gap: 0vh;

`

export const ToRightContainerLandingMobile = styled(ToRightContainerLanding)`
  margin-left: 24vw;
`

export const ToLeftContainerLandingMobile = styled(ToLeftContainerLanding)`
  margin-left: -12vw;
`

export const AppPreviewLandingMobile = styled(AppPreviewLanding)`
  height: auto;
  width: 75vw;
`

export const CenterContainerLandingMobile = styled(CenterContainerLanding)`
  flex-direction: column;
`

export const AppPreviewMacLandingMobile = styled(AppPreviewMacLanding)`
  width: 110vw;
  height: auto;
  margin: -8vh 0 0 0;
`

export const FooterLandingMobile = styled.div`
  position: relative;
  background: #2B283A;
  height: 1000px !important;
  width: 100%;
  margin-top: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`