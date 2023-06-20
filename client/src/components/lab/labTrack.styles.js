import styled from "styled-components";

export const StyledLabTrack = styled.div`
  display: flex;
  //background: darkgrey;
  position: relative;
  height: 580px;
`

export const LabTrackMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  //width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin-right: 1em;

  //background: white;
`

export const LabTrackCover = styled.img`
  height: 250px;
  cursor: pointer;
`

export const LabTrackName = styled.p`
  font-size: 1.2em;
  max-width: 250px;
  margin: 1.5em 0 0 0;
`

export const LabTrackArtists = styled.p`
  font-size: 1em;
  margin: .8em 0 0 0;
  max-width: 250px;

`

export const LabTrackInfo = styled.div`
    display: flex;
`

export const LabTrackInfoCaptions = styled.div`
  text-align: right;
  margin-right: 1em;
`

export const LabTrackInfoValues = styled.div`

`

export const LabTrackText = styled.p`
  font-size: 1.3em;
  margin: .3em 0 0 0;
`