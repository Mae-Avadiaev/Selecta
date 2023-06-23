import styled, {keyframes} from "styled-components";
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
  border: white solid 5px;
  width: 90%;
  height: 100px;
  margin: 0px 0 10px 5%;
  border-radius: 10px;
  filter: drop-shadow(0 0 2rem #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  //position: fixed;
`

export const AddButton = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2em;
  margin: 0 10px 0 0;
  
  //border-radius: 50%;
  //right: 25%;
  //background-color: white;
  filter: drop-shadow(0 0 0.5rem #d5d5d5);
  background: radial-gradient(rgba(171, 154, 154, 0.3), rgba(150, 145, 145, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cbc8c8;
  text-align: center;

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

///////

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
`