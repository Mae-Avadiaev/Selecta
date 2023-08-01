import styled from "styled-components";
import {ColumnFlexContainer, Link, RowFlexContainer} from "../../app.styles";

export const StyledPageSwitcher = styled(ColumnFlexContainer)`
  margin-top: 10px;
  //width: 110%;
  //margin-left: -5%;
  opacity: 0.7;
  //background-color: black;
`

export const PagesContainer = styled(RowFlexContainer)`
  //justify-content: space-around;
`

export const PageContainer = styled(ColumnFlexContainer)`
  width: ${props => Math.round((100) / props.numberOfElements) + '%'};
  justify-content: center;
  align-items: center;
`

export const PageTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`

export const Underline = styled.div`
  width: 50%;
  // width: ${props => Math.round((100 - 10) / props.numberOfElements) + '%'};
  margin-left: ${props => {
      const length = Math.round(100 / props.numberOfElements)
      return length * props.activeIndex + '%'
  }};
  background-color: white;
  height: 2px;
  margin-top: 10px;
`