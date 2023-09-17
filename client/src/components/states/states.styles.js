import styled from "styled-components";
import {ColumnFlexContainer, secondaryTextColor} from "../../app.styles";

export const StyledStates = styled.div`
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - 70px - 74px);
  overflow: scroll;
  width: 100%;
  //margin-left: -5%;
  margin-top: 20px;
  padding: 0 5%;
`


export const StateColumn = styled(ColumnFlexContainer)`
  width: calc(50% - 7px);
`

export const State = styled.div`
  //display: inline-block;
  width: 100%;
  height: 100px;
  margin: 0 0 14px;

  position: relative;
  border-radius: 10px;
  font-size: 1em;
  padding: 0 15px;
  border: none;
  //filter: drop-shadow(0 0 0.5rem #d5d5d5);
  filter: ${props => `drop-shadow(0 0 0.5rem rgba(${props.gradient[0].r}, ${props.gradient[0].g}, ${props.gradient[0].b}, 0.7))`};
  background: ${props => `linear-gradient(rgba(${props.gradient[0].r}, ${props.gradient[0].g}, ${props.gradient[0].b}, 0.3), rgba(${props.gradient[1].r}, ${props.gradient[1].g}, ${props.gradient[1].b}, 0.3))`};
  //background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${secondaryTextColor};
  text-align: center;
  font-weight: bold;
  color: #2b283a;
`

export const StateTitle = styled.p`
  font-size: 1.3em;
  margin: 0 0 8px 0;
`

export const StateDetail = styled.p`
  margin: 0;
  font-size: 0.75em;
  color: #6b6b6b;
  //background-color: white;
  //width: 100%;
`

export const StateNumberOfTracks = styled.p`
  margin: 0;
`