import styled from "styled-components";
import {RowFlexContainer} from "../../app.styles";

export const DimmedPanel = styled.div`
  position: absolute;
  background: ${props => props.isActive ? 'rgba(0, 0, 0, 0.45)' : 'transparent'};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${props => props.isActive ? 100 : -1};
  transition: all 0.2s linear;

`

export const StyledPopup = styled.div`
  position: absolute;
  top: ${props => props.isActive ? '50%' : '150%'};  
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  width: ${props => props.isActive ? '75%' : '0'};
  color: white;
  backdrop-filter: ${props => props.isActive ? 'blur(20px)' : 'blur(0)'};
  background: ${props => props.isActive ? 'rgba(253, 253, 253, 0.15)' : 'transparent'};
  text-align: center;
  z-index: ${props => props.isActive ? 101 : 0};
  transition: background 0.2s linear;
`

export const PopupHeader = styled.h1`
  opacity: 0.8;
  font-size: 1.1em;
  margin: 25px 0 10px 0;
`

export const PopupCaption = styled.p`
  opacity: 0.8;
  margin: 0 auto 25px auto;
  width: 80%;
  font-size: 0.9em;
`

export const PopupButtonSection = styled(RowFlexContainer)`
  opacity: 0.8;
  border-top: white 1px solid;
`

export const PopupButton = styled.div`
  width: 50%;
  display: flex;
  //opacity: 0.8;

`

export const PopupButtonCaption = styled.p`
  font-size: 1.2em;
  margin: 15px auto 15px auto;
  opacity: 1;
`