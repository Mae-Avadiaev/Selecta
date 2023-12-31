import styled from "styled-components";

export const StyledNotification = styled.div`
  position: absolute;
  width: 90%;
  height: 40px;
  //top: ${props => props.isActive ? '50%' : '-50px'};
  top: ${props => props.isActive ? 'calc((var(--vh, 1vh) * 50) - 50px);' : '-50px'};
  transition: 0.3s all;
  left: 5%;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(15px);
  //background: rgba(0, 0, 0, 0.1);
  background: rgba(89, 98, 102, 0.3);
`

export const NotificationText = styled.p`
  //color: #2b283a;
  color: ${props => props.type === 'error' ? 'red' : 'green'};
  opacity: 0.7;
  
  span {
    color: white;
    opacity: 0.7;
  }
`