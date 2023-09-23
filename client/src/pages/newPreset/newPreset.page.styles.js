import styled from "styled-components";
import {ColumnFlexContainer, RowFlexContainer, Search, SearchBox} from "../../app.styles";

export const StyledNewPresetPage = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  position: relative;

`

export const InputField = styled(Search)`
  width: 90%;
  margin: 25px 0;
  z-index: 10;
  //background: white;
  //opacity: 0.5;
  ::placeholder {
    color: #2b283a;
  }
  position: absolute;
  color: #2b283a;
  font-size: 1.3em;
`
export const InputBox = styled(SearchBox)`
  width: 100%;
  top: 0;
  margin: 25px 0 60px 0;
  z-index: 0;
  position: relative;
  height: 39px;

`

export const SlidersContainer = styled.div`
  width: 100%;
  //padding-top: 20px;
`

export const MultipleOptionsContainer = styled(ColumnFlexContainer)`
  margin: 0 0 75px 0;
`

export const OptionsContainer = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //padding: 0 5%;
  width: 100%;
  
  
  //input {
  //  font-size: 1em;
  //  background-color: transparent;
  //  color: #2b283a;
  //  border: none;
  //  max-width: 50%;
  //  height: 30px;
  //  //text-align: right;
  //
  //  &::placeholder {
  //    color: #2b283a;
  //  }
  //}
`

export const OptionsTitle = styled.p`
  font-size: 1.2em;
  font-weight: bold;
`

export const NewPresetSelect = styled.select`
  //height: 0.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 30px;
  border-radius: 5px;
  background: radial-gradient(rgba(204, 204, 204, 0.5), rgba(192, 192, 192, 0.5));;
  color: #2b283a;
  border: none;
  font-size: 1.3em;
  text-align: right;
  font-weight: bold;
  //border: 2px black solid;
  width: 40%;

  option {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: right;
    //direction: rtl;
    float:right;
    //background-color: red;
  }

  &:focus {
    border: none;
  }
`

export const PresetButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  margin: 10px 0 20px 0;
  //background-color: white;
`