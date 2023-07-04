import styled, {css} from "styled-components";
import {StyledLink} from "./header.styles";
import {MobilePageContainer, primaryTextColour, secondaryTextColor} from "../../app.styles";

export const MobileStyledHeader = styled.div`
  width: 100vw;
  display: flex;
  //display: none;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  z-index: 10;
  //position: relative;
  //background: white;
`

export const MobileLogo = styled(StyledLink)`
  //font-size: 1rem;
  //position: relative;
  z-index: 1;
  img {
    height: 50px;
    position: absolute;
    top: -25px;

    animation-name: rotate;
    animation-duration: 400s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    filter: invert(10%);
    
    @keyframes rotate{
      from{ transform: rotate(-360deg); }
      to{ transform: rotate(360deg); }
    }
  }
`

export const MobilePlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //backdrop-filter: blur(15px);
  //background: linear-gradient(rgba(224, 224, 224, 0.2), rgba(0, 0, 0, 0.23));
  border-radius: 15px;
  //padding: 0 20px;          
  height: fit-content;
  width: fit-content;
  position: fixed;
  padding: 0 15px 5px 15px;
  //top: 50%;
  left: 50%;
  transform: translate(-50%);
  //position: absolute;
  //margin-left: auto;
  //margin-right: auto;

`

export const MobilePlaySecondText = styled.p`
  margin: 0;
  //backdrop-filter: blur(20px);
  //background: rgba(253, 253, 253, 0.15);
  padding: 0 5px;
  border-radius: 5px 5px 0 0;
  ${primaryTextColour}
`

export const MobilePlayBackgroundSecond = styled.div`
  color: transparent;
  backdrop-filter: blur(20px);
  background: rgba(253, 253, 253, 0.15);
  position: absolute;
  padding: 2px 10px 0 10px;
  border-radius: 5px 5px 0 0;
  z-index: -1;
  top: -3px
`

export const MobilePlayFirstText = styled.p`
  //backdrop-filter: blur(20px);
  //background: rgba(253, 253, 253, 0.15);
  margin: 0;
  font-weight: bold;
  font-size: 1.3em;
  max-width: calc(100vw - 140px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 10px 0 10px;
  border-radius: 5px;
  ${primaryTextColour}
`

export const MobilePlayBackgroundFirst = styled.div`
  color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: calc(100vw - 140px);
  font-size: 1.3em;
  backdrop-filter: blur(20px);
  background: rgba(253, 253, 253, 0.15);
  position: absolute;
  padding: 5px 10px 4px 10px;
  border-radius: 5px;
  z-index: -1;
  bottom: 1px;
`

export const InfoSection = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(253, 253, 253, 0.15); //background: red;
  //background: linear-gradient(rgba(22, 53, 84, 0.0), rgba(255, 255, 255, 0.21)); //background: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 20px 30px;
  height: 75%;
  position: fixed;
  top: 10%;
  left: 5%;
  z-index: -1;
  border-radius: 10px;
  transition: all .4s;
  opacity: 0;
  overflow: scroll;
  //padding: 1vh 0;
  ${props => {
    if (props.isOpenedInfoSection)
        return (css` 
          opacity: 1;
          z-index: 2;
        `)
    else 
        return (css` 
          opacity: 0;
          z-index: -1;
          pointer-events: none;
        `)
}}
  
  ${props => {
    if (props.screen === 0)
        return (css`
          img {
            width: 82%;
          }
        `)
  }}
`

export const AccountMenu = styled(MobilePageContainer)`
  position: absolute;
  left: ${props => props.menuOpened ? '-5%' : '100vw'};
  top: -60px;
  background: #2b283a;
  transition: all 1s;
  z-index: 10;
  width: 100vw;
  height: calc((var(--vh, 1vh) * 100));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  

  //backdrop-filter: blur(20px);
  //border-radius: 10px;
  //height: 100px;
`

export const AccountMenuLink = styled.a`
  font-size: 3.5rem;
  margin-bottom: 3rem;
  font-weight: bold;
  color: white;
  opacity: 0.8;
`

export const InfoCircleContainer = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  justify-content: space-between;
  top: 7px;
  
`

export const CircleIcon = styled.img`
  width: 11px !important;
  //height: 1px;
`

export const InfoTrackName = styled.p`
  font-weight: bold;
  font-size: 1.4em;
  margin: 20px 0 0 0;
  text-align: center;
  width: 100%;
`

export const InfoAlbumName = styled.p`
  margin: 0 0 5px;
  text-align: center;
  width: 100%;
`

export const InfoTrackArtists = styled.p`
  margin: 0 0 10px 0;
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.1em;
`

export const InfoCountryOfOrigin = styled.p`
  margin: 0 0 10px;
  text-align: left;
  //width: 100%;
`

export const InfoTrackCover = styled.img`
  width: 75%;
  border-radius: 10px;
  margin: 10px 0 0 0;
  transition: all .4s;
  //filter: drop-shadow(0 0 1rem #727272);
  box-shadow: 0 4px 20px -2px #656565;

`

export const ParamIconsContainer = styled.div`
  display: flex;
`

export const ParamIcon = styled.img`
  height: 30px;
`

export const InfoSectionButton = styled.img`
  height: 40px;
  width: 40px !important;
  margin: ${props => props.screen === 0 ? '-15px 0 0 0' : ' 15px 0 0 20px'}

`

export const FlexContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export  const FlexContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const InfoBPM = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 5px 0 0 0;
  //margin: 15px 0 0 0;
  //text-align: left;
  span {
    font-weight: normal;
    font-size: 0.5em;
  }
`

export const InfoGenreTag = styled.p`
  //padding: 3px;
  border-radius: 5px;
  margin: 5px 0;
`

export const InfoLabel = styled.p`
  background: rgba(204, 150, 27, 0.29);
  padding: 3px;
  border-radius: 5px;
  font-size: 0.95em;
  margin: 0;
`