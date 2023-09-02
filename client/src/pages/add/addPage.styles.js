import styled from "styled-components";
import {ColumnFlexContainer} from "../../app.styles";

export const TrackListContainer = styled.div`
  height: calc(100% - 80px);
  overflow: scroll;
  width: 100%;
  
  //&MobilePageContainer {
  //  
  //}

`

export const FirstLoadAddContainer = styled(ColumnFlexContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
`