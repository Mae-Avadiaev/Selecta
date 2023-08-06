import styled from "styled-components";
import {MobilePageContainerColumn, ScrollContainer} from "../../app.styles";

export const OutletContainer = styled(MobilePageContainerColumn)`
  width: 100%;
  margin-left: 0%;
  height: calc((var(--vh, 1vh) * 100) - 70px - 53px);

  //background-color: white;
`

export const SeedsScrollContainer = styled(ScrollContainer)`
  height: calc((var(--vh, 1vh) * 100) - 70px - 74px - 50px);
  margin-top: 20px;
  width: 110%;
  padding: 0 5%;
`