import styled, {css} from "styled-components";
import {Link} from 'react-router-dom';

export const StyledHeader = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 35px;
  width: 100vw;
  z-index: 10;
  box-sizing: border-box;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: 'Climate Crisis', cursive;
  font-size: 1.5rem;
  transform: ${(props) => props.streched ? "scale(1, 2.5)" : "scale(1)"};
  //transform-origin: 10% 30%;
  transition: transform 0.05s;
  //width: 100%;

  //&:hover {
  //  border-bottom: white solid 2px;
  //  //transition: all 0.2s;
  //}
  
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: black;
  }
  
  svg {
    display: ${(props) => props.streched ? "none" : "block"};
  }
  
`

export const LinkStroke = styled.svg`
  position: absolute;
  top: ${(props) => props.customTop ? props.customTop : "0"};
  left: ${(props) => props.customLeft ? props.customLeft : "-15%"};
  width: ${(props) => props.customWidth ? props.customWidth : "130%"};
  transform: ${(props) => props.customTransform ? props.customTransform : "none"};
  //pointer-events: none;
  float:left;
  //display: none;
  //height: 100%;
  //viewBox="0 0 86.5 21"
  //width="86.5mm" height="21mm"
  stroke-width: 0.7px;
  stroke-dasharray: 241px;
  stroke-dashoffset: 241px;
  stroke: #cecece;
  -moz-transition: stroke-dashoffset .5s cubic-bezier(.25, .46, .45, .94);
  -o-transition: stroke-dashoffset .5s cubic-bezier(.25, .46, .45, .94);
  -webkit-transition: stroke-dashoffset .5s cubic-bezier(.25, .46, .45, .94);
  transition: stroke-dashoffset .5s cubic-bezier(.25, .46, .45, .94);
  
  &:hover {
    stroke-dashoffset: 0;
  }
`

export const Links = styled.div`
  position: absolute;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 57vw;
`

export const Logo = styled(StyledLink)`
  font-size: 2rem;
  //position: relative;
  img {
    height: 60px;
    position: absolute;
    top: -25px;

    animation-name: rotate;
    animation-duration: 400s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes rotate{
      from{ transform: rotate(-360deg); }
      to{ transform: rotate(360deg); }
    }
  }
  
`

export const SpotifyLogo = styled.img`
  width: 40px;
  cursor: pointer;
`

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`