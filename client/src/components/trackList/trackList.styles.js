import styled from "styled-components";

export const StyledTrackList = styled.div`
  border: black solid 2px;
  border-radius: 20px;
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