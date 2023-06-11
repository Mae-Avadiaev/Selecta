import styled from "styled-components";

export const StyledSeedPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px;
  border: none;
  border-bottom: 3px solid black;
  height: 40px;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
`

export const SecondaryText = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`

export const Iframe = styled.iframe`
  pointer-events: none;
  width: 35%;
  height: 35%;
`