import styled from "styled-components";
import {MobilePageContainer} from "../../app.styles";

export const StyledSlidingWindow = styled(MobilePageContainer)`
  background-color: white;
  position: absolute;
  height: calc((var(--vh, 1vh) * 100));
  width: 100vw;
  transition: all 0.2s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  left: -5%;

  top: ${props => props.isActive ? '0' : 'calc((var(--vh, 1vh) * 100))'};

`

export const ArrowButton = styled.img`
  width: 20px;
  height: 50px;
  transform: rotate(90deg);
  opacity: 0.5;
`