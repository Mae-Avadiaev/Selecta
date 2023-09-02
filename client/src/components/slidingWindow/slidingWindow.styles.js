import styled, {css} from "styled-components";
import {MobilePageContainer} from "../../app.styles";

export const StyledSlidingWindow = styled(MobilePageContainer)`
  //background-color: white;
  backdrop-filter: blur(20px);
  background: rgba(253, 253, 253, 0.15);
  position: absolute;
  height: calc((var(--vh, 1vh) * 100 - 30px));
  width: 100vw;
  //transition: all 0.2s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  //left: -5%;
  top: ${props => props.isActive ? '0px' : 'calc((var(--vh, 1vh) * 100))'};
  transition: ${props => props.isControlled ? `all 0.3s` : `none`};

`

export const ArrowButton = styled.img`
  width: 20px;
  height: 50px;
  transform: rotate(90deg);
  opacity: 0.5;
`