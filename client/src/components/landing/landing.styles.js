import styled from "styled-components";
import {MobilePageContainerColumn} from "../../app.styles";

export const StyledLanding = styled(MobilePageContainerColumn)`
  margin: 0 5%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100));
`

export const MainText = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
`

export const LoginWriting = styled.img`
  width: 35vw;
  position: absolute;
  top: 25px;
  right: 60px;
  opacity: .6;
`

export const HandWrittenCaptions = styled.img`
  width: 100vw;
  position: absolute;
  bottom: -80px;
  right: -4px;
  opacity: .6;
  z-index: 100;
  pointer-events: none;
  //translateZ(100px);
  //background: red;
`