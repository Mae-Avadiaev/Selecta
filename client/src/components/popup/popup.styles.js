import styled from "styled-components";
import {RowFlexContainer} from "../../app.styles";

export const StyledPopup = styled.div`
  position: absolute;
  top: 50%;  
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  //height: 200px;
  background-color: #2b283a;
  border-radius: 20px;
  color: white;
  text-align: center;
`

export const PopupHeader = styled.h1`
  opacity: 0.8;
  font-size: 1.5em;
`

export const PopupCaption = styled.p`
  opacity: 0.8;

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
  font-size: 1.5em;
  color: #fc6060;
  margin: 15px auto 15px auto;
`