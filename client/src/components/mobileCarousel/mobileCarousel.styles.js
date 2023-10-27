import styled, {keyframes} from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  //position: relative;
  justify-content: center; 
  align-items: center;
  //top: -500px;
  //top: -430px;
  //top: -480px;
  top: -480px;
  position: absolute;
  @media only screen and (min-width: 800px) {
    top: -400px
  }
  //height: calc(300px * 5);
  //overflow: hidden;
  //box-sizing: border-box;
  //background: white;
`

// export const CarouselTouchContainer = styled.div`
//   position: absolute;
//   height: calc((var(--vh, 1vh) * 100) - 70px);
//   width: 100%;
//   top: 0;
//   //background: white;
//   z-index: 100;
//   pointer-events: none;
// `

export const StyledCarousel = styled.div`
  position: relative;
  margin: 0;
  //border: black solid 1px;
  width: 100%;
  //display: flex;
  //justify-content: center;
  //height: calc(300px * 5);
  //padding-left: 12.5%;
`

export const SelectTrackButton = styled.div`
  width: 100px;
  height: 55px;
  //border-radius: 50%;
  border-radius: 5px;
  position: absolute;
  bottom: calc(15%);
  right: 10%;
  //right: 25%;
  //background-color: white;
  filter: drop-shadow(0 0 0.5rem #d5d5d5);
  background: radial-gradient(rgba(171, 154, 154, 0.3), rgba(150, 145, 145, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cbc8c8;
  text-align: center;
  font-size: .5em;

  p {
    filter: drop-shadow(0 0 0.5rem #000000);
  }
`

export const SelectAllButton = styled(SelectTrackButton)`
  left: 10%;
`

const pulseAnimation = keyframes`
  0% {opacity: 0;}
  20% {opacity: 0.3;}
  40% {opacity: 0}
  100% {opacity: 0;}
`

export const ArrowContainer = styled.div`
  position: absolute;
  //bottom: 100px;
  bottom: calc(32%);
  right: 20%;
  opacity: 1;
  //animation: ${pulseAnimation} 6s infinite;
  animation-delay: 6s;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Arrow = styled.img`
  height: 50px;
`

export const Caption = styled.p`
  position: absolute;
  color: white;
  font-size: 0.5rem;
  right: 70%;
  bottom: calc(25%);
  width: 100px;
  text-align: right;
`

const fadeAnimation = keyframes`
  0% {opacity: 1;}
  20% {opacity: 1;}
  100% {opacity: 0;}
`

export const CarouselFader = styled.div`
  background: black;
  animation: ${fadeAnimation} 0.5s;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10000000;
  position: absolute;
  top: 0;
  pointer-events: none;
`

export const SelectaViewSelectButton = styled.img`
  position: fixed;
  top: 310px;
  right: 10px;
  width: 40px;
  opacity: 0.9;
  filter: ${props => props.lightText ? 'invert(100%)' : 'invert(0%)'};
`

export const SoundButton = styled(SelectaViewSelectButton)`
  top: 250px;
`

export const SpotifyButton = styled(SelectaViewSelectButton)`
  top: 190px;
`