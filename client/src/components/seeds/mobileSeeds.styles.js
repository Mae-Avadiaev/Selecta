import styled, {keyframes} from "styled-components";

export const StyledSeeds = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //height: 100vh;
  //padding: 120px 30px 0 30px;
`

export const PlaylistHeaderContainer = styled.div`
  margin-top: 55px;
  padding: 20px 10px 10px 15px;
  //background: linear-gradient(rgba(22, 53, 84, 0.8), rgba(22, 53, 84, 0.0));
  //background: linear-gradient(#266a83, rgba(22, 53, 84, 0.0));
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const PlaylistHeader = styled.h1`
  font-size: 3.5em;
  margin: 0 0 -15px 0;
  font-family: 'Climate Crisis', cursive;
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const PlaylistSubheader = styled.h2`
  margin-top: 10px;
  font-size: 1.5em;
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const SubheaderLink = styled.a`
  //text-decoration: none;
  color: black;
`

// const pulseAnimation = keyframes`
//   0% {opacity: 0;}
//   20% {opacity: 0.3;}
//   40% {opacity: 0}
//   100% {opacity: 0;}
// `

const pulseAnimation = keyframes`
  0% {opacity: 0;}
  50% {opacity: .5;}
  100% {opacity: 0;}
`

export const LabelSelect = styled.img`
  //background: #791e1e;
  position: absolute;
  width: 12vw;
  //height: w;
  //margin-right: 15px;
  margin-left: 3vh;
  //right: 10px;
  top: 29vw;
  //opacity: .5;
  animation: ${pulseAnimation} 5s infinite;
  opacity: 0;

  //border-radius: 50%;
`

///////

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
`