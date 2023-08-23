import styled from "styled-components";
import {ColumnFlexContainer, LongButton, primaryTextColour, secondaryTextColor} from "../../app.styles";
import {SeedsScrollContainer} from "../listen/listenPage.styles";

export const StyledSources = styled(SeedsScrollContainer)`
  height: calc((var(--vh, 1vh) * 100) - 70px);
  width: 100%;
  padding: 0 5%;
  margin: 0;
`

export const StyledSourcesPlaylist = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  margin-top: 15px;
`

export const SourcesPlaylistCover = styled.img`
  width: 70px;
  margin-right: 20px;
`

export const SourcesNameContainer = styled(ColumnFlexContainer)`
  justify-content: center;
  //align-items: center;
  width: 70%;

`

export const SourcesPlaylistName = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1.1em;
  margin: 0 0 7px 0;
  ${primaryTextColour};
`

export const SourcesTrackAmount = styled.p`
  margin: 0;
  ${secondaryTextColor};
  font-size: 0.9em;
`

export const SourcesPlaylistSelector = styled.div`

`

export const SourcesLongButton = styled(LongButton)`
  position: absolute;
  bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  //background: radial-gradient(rgba(204, 204, 204, 1), rgba(192, 192, 192, 1));
`