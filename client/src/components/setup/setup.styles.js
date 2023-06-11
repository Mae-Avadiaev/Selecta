import styled from "styled-components";

export const StyledSetup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 60px 30px 0 30px;
`

export const SetupSuperHeader = styled.p`
  font-size: 4.5em;
  text-align: center;
  font-weight: bold;
  margin: 15px 0 -10px 0;
  padding: 0;
`

export const SetupTitleContainer = styled.div`
  text-align: center;
`

export const SetupColumnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LittlePreview = styled.img`
  height: 1.1em;
  position: absolute;
`

export const SetupButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SetupNextButton = styled.div`
  padding: 15px 30px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  filter: drop-shadow(0 0 0.3rem #d5d5d5);
  background: linear-gradient(rgba(171, 154, 154, 0.4), rgba(150, 145, 145, 0.4));
`

export const FireButton = styled.div`
  padding: 15px 30px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  filter: drop-shadow(0 0 0.5rem #d5d5d5);
  background: linear-gradient(rgba(171, 154, 154, 0.4), rgba(150, 145, 145, 0.4)), center url('https://i.pinimg.com/originals/93/33/81/93338121b5740dca5013b9fdfc9566a3.gif');
`

export const SetupButtonFire = styled.img`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100px;
`

export const SetupPlaylistPreview = styled.img`
  width: 350px;
  border-radius: 10px;
  filter: drop-shadow(0 0 0.5rem #1e1e1e);
`

export const SetupBorderContainer = styled.div`
  border-radius: 10px;
  border: solid black 2px;
  padding: 0 150px;
  text-align: center;
`

export const SetupOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  position: relative;
  cursor: pointer;


  div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(150, 145, 145, 0.4), rgba(12, 12, 12, 0.4));
    z-index: 1;
    border-radius: 10px;
    pointer-events: none;
    display: ${(props) => props.selected ? 'block' : 'none'};
  }

  &:hover {
    div {
      display: block;
    }
  }
`