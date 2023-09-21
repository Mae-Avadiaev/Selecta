import styled from "styled-components";
import {ActionButton, ColumnFlexContainer, RowFlexContainer, Search, SearchBox} from "../../../app.styles";

export const StyledLandingDesktopPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`

export const SelectaLogo = styled.img`
  height: 60px;
  position: absolute;
  top: 10px;
  left: 10px;

  animation-name: rotate;
  animation-duration: 400s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes rotate{
    from{ transform: rotate(-360deg); }
    to{ transform: rotate(360deg); }
`

export const LandingHeaderDesktop = styled.h1`
  font-size: 9vh;
  //font-size: 4.5em;
  margin: 10vh 0 0 0;
  //margin: 85px 0 0 0;
`

export const LandingHeaderCaptionDesktop = styled.h3`
  text-align: center;
  margin-bottom: 18vh;
  //margin-bottom: 90px;
  font-size: 3.5vh;
  //font-size: 1.7em;
`

export const EmailFormContainer = styled(RowFlexContainer)`
  margin: 2vh 5%; 
  //width: 400px;
  width: 28vw;
  //height: 4vh;
  justify-content: center;
`

export const EmailBox = styled(SearchBox)`
  width: 100%;
  //height: 5vh;
  //background: white;
  //opacity: 0.7;
  //border: 2px solid black;
`

export const EmailFormInput = styled(Search)`
  //width: 500px;
  //height: 100px;
  //height: 5vh;
  color: black;
  text-align: center;
  width: 100%;
  //height: 100%;
  //font-size: 2vh;
  ::placeholder { 
    //color: white;
    opacity: 1;
  }
`

export const CTAButton = styled(ActionButton)`
  //width: 400px;
  width: 28vw;
  //height: 5vh !important;
  //font-size: 2vh;
  //background: rgb(234, 96, 63);
  background: rgb(241, 83, 45);
  opacity: 0.8;
`

export const MenuPictureLanding = styled.img`
  height: 18vh;
  //height: 140px;
  border-radius: 50px;
  margin-top: 35vh;
  //margin-top: 265px;
  pointer-events: none;
  margin-bottom: 15vh;
  box-shadow: 0 8px 180px -4px #ffffff;

`

export const MenuCaptionLanding = styled.p`
  position: absolute;
  text-align: center;
  font-size: 3vh;
  font-weight: bold;
  //color: white;
  
`

export const MenuHandwrittenCaptionsLanding = styled.img`
  position: absolute;
  //top: calc(-29vh);
  //top: calc( -8vw - 120px);
  //top: -225px;
  //left: 0;
  left: 50%;
  top:50%;
  //transform: translateY(-10%);
  transform: translate(-49%, -256%);
  //right: 0;
  //margin-left: auto;
  //margin-right: auto;
  //width: 100vw;
  height: 138vh;
  //width: 1440px;
  opacity: 0.7;
  pointer-events: none;
  //background: white;
  //filter: invert(100%);
`

export const SectionHeaderLanding = styled.h2`
  font-size: 7vh;
  margin-bottom: 7vh;
  text-align: center;
`

export const PreviewsContainerLanding = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 10vh;
  margin-bottom: 10vh;


`

export const ToRightContainerLanding = styled(RowFlexContainer)`
  width: 50vw;
  padding: 0 0 0 12vw;
  justify-content: right;
  align-items: center;
  text-align: right;
`

export const ToLeftContainerLanding = styled(RowFlexContainer)`
  width: 50vw;
  padding: 0 12vw 0 0;
  justify-content: left;
  align-items: center;
  text-align: left;
`

export const AppPreviewLanding = styled.img`
  height: 70vh;
  //position: absolute;
`

export const AppPreviewTextContainer = styled(ColumnFlexContainer)`

`

export const AppPreviewHeaderLanding = styled.h4`
  font-size: 4vh;
  margin: 0;
`

export const AppPreviewCaptionLanding = styled.p`
  font-size: 2vh;
`

export const CenterContainerLanding = styled(RowFlexContainer)`
  width: 100vw;
  padding: 0 12vw;
  align-items: center;
  //justify-content: center;
  //background: white;
`

export const AppPreviewMacLanding = styled.img`
    height: 90vh;
    margin: -14vh 0 -5vh 0;

`

export const FooterLandingDesktop = styled(RowFlexContainer)`
  background: #2B283A;
  width: 100%;
  height: 100px;
  margin-top: 10vh;
  position: relative;
  align-items: center;
  justify-content: space-between;
`

export const SelectaLogoFooter = styled(SelectaLogo)`
  filter: invert(100%);
  //position: relative;
  opacity: 0.8;
  top: 20px;
  
`

export const FooterTextLanding = styled.p`
  color: white;
  margin: 0 100px;
  opacity: 0.8;

`

export const ToRightCenterContainerLanding = styled(ToRightContainerLanding)`
  margin-bottom: 15vh;
  width: fit-content;
  padding: 0;
  
  h4, p {
    max-width: 260px;
  }
`