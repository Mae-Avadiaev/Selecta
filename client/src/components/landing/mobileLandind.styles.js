import styled from "styled-components";

export const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 165px);
  //z-index: 2;
  //z-index: 100;
  //width: 100%;
  //height: 100%;
  //min-width:100%;
  //min-height: 100vh;
  //overflow-x: hidden;
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