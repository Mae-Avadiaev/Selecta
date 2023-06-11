import styled from "styled-components";
import {MainText} from "../home/home.styles";

export const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export const LinkContainer = styled.a`
  width: 22%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: black;
  }
`

export const AuthButton = styled.img`
  width: 15%;
  cursor: pointer;
`

export const AuthText = styled(MainText)`
    margin-top: 60px;
    margin-bottom: 1rem;
`