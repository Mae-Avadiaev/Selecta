import styled from "styled-components";
import {primaryTextColour} from "../../app.styles";
import {secondaryTextColor} from "../../app.styles";

export const StyledTrackListItem = styled.div`
  display: flex;
  align-items: center;
  //justify-content: left;
  //border: solid red 1px;
  margin: 10px 0;
`

export const TrackListNumber = styled.p`
  width: 45px;
  text-align: center;
  font-size: 1.1rem;
  margin: 0;
  ${secondaryTextColor};
`

export const TrackListSummary = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
`

export const TrackListCover = styled.img`
  height: 45px
`

export const TrackListTitleContainer = styled.div`
  margin: 0 13px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`

export const TrackListTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
  ${primaryTextColour};
`

export const TrackListArtist = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  ${secondaryTextColor};
`