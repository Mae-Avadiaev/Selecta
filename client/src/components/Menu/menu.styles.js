import styled from "styled-components";
import {Link} from "react-router-dom";

export const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 20px 0 45px 0;
  //filter: blur(10px);
  backdrop-filter: blur(15px);
  background: linear-gradient(rgba(22, 53, 84, 0.0), rgb(0, 0, 0, 0.5));


`

export const Subsection = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  //background: red;

`

export const MenuIcon = styled.img`
  width: 25px;
  filter: invert(1);
`

export const MenuCaption = styled.p`
  margin: 5px 0 0 0;
  color: white;
  font-size: 0.7em;
`