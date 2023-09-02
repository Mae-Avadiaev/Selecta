import styled, {css, keyframes} from "styled-components";
import {SelectAllButton} from "../mobileCarousel/mobileCarousel.styles";
import {primaryTextColour, secondaryTextColor} from "../../app.styles";

export const StyledSeeds = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //height: 100vh;
  //padding: 120px 30px 0 30px;
`

export const PlaylistHeaderContainer = styled.div`
  margin-top: 55px;
  padding: 20px 10px 0px 15px;
  overflow-x: hidden;
  overflow: hidden;
  //position: fixed;
  //background: linear-gradient(rgba(22, 53, 84, 0.8), rgba(22, 53, 84, 0.0));
  //background: linear-gradient(#266a83, rgba(22, 53, 84, 0.0));
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const PlaylistHeader = styled.h1`
  font-size: 3.5em;
  margin: 0 0 -15px 0;
  font-family: 'Climate Crisis', cursive;
  //color: rgba(255, 255, 255, 0.2);
  ${primaryTextColour};
  //opacity: .8;
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const PlaylistSubheader = styled.h2`
  margin-top: 10px;
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.38);
  ${secondaryTextColor};
  //filter: drop-shadow(0 0 1rem darkgray);

`

export const SubheaderLink = styled.a`
  //text-decoration: none;
  color: black;
`

// const pulseAnimation = keyframes`
//   0% {opacity: 0;}
//   20% {opacity: 0.3;}
//   40% {opacity: 0}
//   100% {opacity: 0;}
// `

export const NewSeedsContainer = styled.div`
  border: rgba(0,0,0, 0.7) solid 5px;
  width: 100%;
  height: 100px;
  margin: 0px 0 0 0;
  border-radius: 10px;
  filter: drop-shadow(0 0 2rem #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  //position: fixed;
`

export const AddButton = styled.div`
  position: relative;
  width: fit-content;
  height: 40px;
  border-radius: 10px;
  font-size: 1em;
  margin: 0 0 0 10px;
  padding: 0 10px;
  //letter-spacing: 0.4rem;
  //text-blink;
  
  //border-radius: 50%;
  //right: 25%;
  //background-color: white;
  filter: drop-shadow(0 0 0.5rem #d5d5d5);
  background: radial-gradient(rgba(171, 154, 154, 0.3), rgba(150, 145, 145, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
  //color: #cbc8c8;
  ${secondaryTextColor};
  text-align: center;
  //text-decoration: none;
  //text-underline: none;

  p {
    filter: drop-shadow(0 0 0.5rem #000000);
  }
`

const pulseAnimation = keyframes`
  0% {opacity: 0;}
  50% {opacity: .5;}
  100% {opacity: 0;}
`

export const LabelSelect = styled.img`
  //background: #791e1e;
  position: absolute;
  width: 12vw;
  //height: w;
  //margin-right: 15px;
  margin-left: 3vh;
  //right: 10px;
  top: 29vw;
  //opacity: .5;
  animation: ${pulseAnimation} 5s infinite;
  opacity: 0;
  z-index: 100;

  //border-radius: 50%;
`

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
`



export const RadioInputGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const RadioInput = styled.input`
  //position: absolute;
  //opacity: 0;
  //cursor: pointer;
  //height: 0;
  //width: 0;
`

export const RadioCaption = styled.p`
  font-weight: bold;
  font-size: 2em;
  width: 15%;
  margin: 10px 0;
  //background: greenyellow;
`

export const AlgoRulesContainer = styled.div`
  width: 90%;
  height: fit-content;
  margin: 0 5% 10px 5%;
  //background: darkgrey;
  //overflow: scroll;
  overflow-y:scroll;
  position:relative;

`

export const AlgoRule = styled.span`
  //position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  //background: greenyellow;
  border-radius: 10px;
  margin: 5px 5px;
  //line-height: 5px;
  white-space: nowrap;
  display: inline-block;
  //filter: drop-shadow(0 0 0.2rem #5d5d5d);
`

export const AlgoRuleContainer = styled.label`
  display: inline-block;
  position: relative;
  //padding-left: 35px;
  //margin-bottom: 12px;
  cursor: pointer;
  //font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  //margin: 0 5%;
  
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    
    &:checked + ${AlgoRule} {
      //background: red !important;
      ${(props) => (css`
        
        background-color: ${props.backgroundColor.slice(0, -2) + '99)'} !important;
      `)}
    }
    
    background-color: transparent;
  }
  
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  margin: 10px 0 60px 0;
  padding-right: 5%;
  //background-color: white;
`

export const SlidersContainer = styled.div`
  //padding: 60px 0 0 0;
  width: 100%;
  padding-top: 5px;
`

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin: 12px 0 0 0;
  
  h1 {
    font-size: 1.8em;
  }
  
  input {
    font-size: 1em;
    background-color: transparent;
    color: #2b283a;
    border: none;
    max-width: 50%;
    height: 30px;
    text-align: right;

    &::placeholder {
      color: #2b283a;
    }
  }
`

export const AlgoSelect = styled.select`
  //height: 0.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 30px;
  border-radius: 5px;
  background-color: transparent;
  color: #2b283a;
  border: none;
  font-size: 1em;
  text-align: right;

  option {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: right;
    //direction: rtl;
    float:right;
    background-color: red;
  }

  &:focus {
    border: none;
  }
`

export const AlgoSelectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6px 5% 0 5%;
  align-items: center;
`

export const SimpleTextButton = styled.button`
  
`