import styled, {keyframes} from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  //position: relative;
  justify-content: center; 
  align-items: center;
  //overflow: hidden;
`

export const StyledCarousel = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  padding-left: 12.5%;
`

const pulseAnimation = keyframes`
  0% {opacity: 0;}
  20% {opacity: 0.3;}
  40% {opacity: 0}
  100% {opacity: 0;}
`

export const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 7%;
  opacity: 0;
  animation: ${pulseAnimation} 6s infinite;
  animation-delay: 6s;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Arrow = styled.img`
  height: 50px;
`

export const Caption = styled.p`
  color: white;
  font-size: 0.5rem;
`