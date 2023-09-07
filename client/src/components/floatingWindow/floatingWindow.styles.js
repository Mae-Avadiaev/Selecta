import styled from 'styled-components'

export const StyledFloatingWindow = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(253, 253, 253, 0.15); //background: red;
  //background: linear-gradient(rgba(22, 53, 84, 0.0), rgba(255, 255, 255, 0.21)); //background: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 20px 30px;
  height: 65%;
  position: fixed;
  top: 10vw;
  left: 5%;
  //z-index: -1;
  border-radius: 10px;
  transition: all .4s;
  //opacity: 0;
  opacity: 1;
  overflow: scroll;
  //padding: 1vh 0;
  z-index: 100;
  //background-color: white;
`