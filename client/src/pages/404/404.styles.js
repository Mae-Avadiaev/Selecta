import styled from "styled-components";
import {MobilePageContainer} from "../../app.styles";

export const Styled404 = styled(MobilePageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: calc(100vh - 165px);
  color: white;
  opacity: 0.8;

`

export const Drawing404 = styled.img`
  width: 250px;
  height: 250px;
  filter: invert(100%);
  //opacity: 0.9;
`

export const DrawingCantFind = styled.img`
  width: 80%;
  //height: 100px;
  margin-top: -30px;
  filter: invert(100%);

`