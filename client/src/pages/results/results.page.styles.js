import styled from "styled-components";
import {ColumnFlexContainer, RowFlexContainer} from "../../app.styles";

export const SortingContainer = styled.div`
  //height: calc((var(--vh, 1vh) * 100 - 30px - 100px) / 2);
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  //margin-bottom: 50px;
`

export const SortingOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6px 0 0 0;
  align-items: center;
`

export const SortingHeader = styled.h2`

`

export const SortingOptionsDeleteButton = styled.p`
  margin-left: 30px;
`

export const SortingOptionsSelect = styled.select`
  //height: 0.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 30px;
  border-radius: 5px;
  //background-color: transparent;
  color: #2b283a;
  border: none;
  //font-size: 1em;
  text-align: right;
  font-size: 1.4em;
  font-weight: bold;
  margin-right: 10px;
  background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));;

  option {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: left;
    //direction: rtl;
    float: left;
    //background-color: red;
    
    &:focus {
      border: none;
    }
  }
`

export const NoTracksContainer = styled(ColumnFlexContainer)`
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const DrawingNoTracksFound = styled.img`
  width: 90%;
  opacity: 0.8;
  filter: invert(100%);
  margin-bottom: 20px;
`