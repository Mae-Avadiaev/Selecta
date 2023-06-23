import styled from "styled-components";

export const StyledLabPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  //height: 100vh;
  //padding-top: 120px;
  height: 100vh;
  padding: 60px 5em;
  //background: darkgrey;
  width: fit-content;
  position: relative;
`

export const LabTrackLinkContainer = styled.div`
  position: absolute;
  top: 14%;
  left: 5em;
  z-index: 1;
`

export const LabRequestParams = styled.div`
  margin: 0 0 0 3em;
  //height: 100%;
  position: relative;
  //width: 550px;
  //background: white;
  white-space: nowrap;
  
`

export const LabPresets = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LabPresetColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const LabPreset = styled.div`
  width: 150px;
  height: 50px;
  background: white;
  border-radius: 10px;
  margin: 10px 10px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  P {
    width: 100%;
    text-align: center;
  }
`

export const LabInput = styled.input`
  width: 35px;
  margin-top: .7em;
`

export const LabResults = styled.div`
  border: black 2px solid;
  width: 600px;
  //background: white;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  margin-left: 2em;
  overflow-y: scroll;
`