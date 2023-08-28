import styled from "styled-components";
import {Button, ColumnFlexContainer, LongButton, primaryTextColour, secondaryTextColor} from "../../app.styles";
import {SeedsScrollContainer} from "../listen/listenPage.styles";

export const StyledSources = styled(SeedsScrollContainer)`
  height: calc((var(--vh, 1vh) * 100) - 70px - 50px);
  width: 100%;
  padding: 0 5%;
  margin: 0;
`

export const SourcesMenu = styled.div`
  backdrop-filter: blur(15px);
  background: linear-gradient(rgb(0, 0, 0, 0.5), rgba(22, 53, 84, 0.0));
  width: 100%;
  height: 50px;
  //margin-left: -5%;
  display: flex;
  align-items: center;
  color: white;
`

export const SourcesCancel = styled.p`
  font-size: 0.9em;
  left: 5%;
  position: absolute;
`

export const SourcesMenuTitle = styled.p`
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
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

export const SourcesNoCoverContainer = styled.div`
  width: 70px;
  height: 70px;
  margin-right: 20px;
  background-color: #2b283a;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SourcesNoCoverImage = styled.img`
  width: 35px;
`

export const SourcesNameContainer = styled(ColumnFlexContainer)`
  justify-content: center;
  //align-items: center;
  width: 62%;

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

export const SourcesPlaylistSelector = styled.img`
  width: 25px;
  margin-left: auto;
  opacity: 0.7;
`

export const SourcesLongButton = styled(Button)`
  position: absolute;
  bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  background: black;
  color: white;
  padding: 25px 30px;
  //font-weight: bold;
`