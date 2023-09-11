import styled from "styled-components";
import {Button, ColumnFlexContainer, LongButton, primaryTextColour, secondaryTextColor} from "../../app.styles";
import {SeedsScrollContainer} from "../listen/listenPage.styles";

export const StyledSourcesPlaylist = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  margin-top: 15px;
`

export const SourcesPlaylistCover = styled.img`
  width: 80px;
  margin-right: 20px;
  border-radius: 10px;
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
  position: fixed;
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