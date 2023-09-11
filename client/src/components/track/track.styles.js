import styled from "styled-components";
import {primaryTextColour, secondaryTextColor} from "../../app.styles";

export const StyledTrackListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

export const TrackListCover = styled.img`
  width: 16%;
  border-radius: 5px;
`

export const TrackListTitleContainer = styled.div`
  width: calc(79% - 35px);
  height: 45px;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
`

export const TrackListTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
  ${primaryTextColour};
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden; !important;
  white-space: nowrap;
`

export const TrackListArtist = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  ${secondaryTextColor};
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden; !important;
  white-space: nowrap;
`

export const ThreeDots = styled.img`
  width: 20px;
  margin: 0 0 0 15px;
  filter: invert(0.1);
`