import styled from "styled-components";

export const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  bottom: 0;
  margin-bottom: 10px;
`

export const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.7;

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