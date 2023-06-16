import styled from "styled-components";
import {StyledLink} from "./header.styles";

export const MobileStyledHeader = styled.div`
  width: 100vw;
  display: flex;
  //display: none;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  z-index: 10;
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
`

export const MobilePlayFirstText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.2em;
`