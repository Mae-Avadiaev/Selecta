import styled from "styled-components";
import {primaryTextColour} from "../../app.styles";
import {secondaryTextColor} from "../../app.styles";

export const StyledTrackList = styled.div`
  //border: black solid 2px;
  //border-radius: 20px;
  margin-bottom: 105px;
  //overflow-x: hidden;
`

export const CaptionBar = styled.div`
  border-bottom: solid #2B283A 1px;
  //border: solid red 1px;
  display: flex;
  margin: 10px 0 0 0;
`

export const CaptionBarItem = styled.div`
  width: ${(props) => props.width + "px"};
  display: flex;
  justify-content: left;
  align-items: center;
  //border-right: solid #2B283A 1px;
`

export const CaptionBarText = styled.p`
  padding-bottom: 5px;
  margin: 0;
`

export const TrackListItems = styled.div`

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



export const TrackInfoContainer = styled.div`
  display: flex;
  margin-left: 10px;
  width: 84%;
`


export const TrackSubsectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export const TrackInfo = styled.p`
  margin: 8px 0 0 0;
  font-weight: bold;
  ${secondaryTextColor};
`
