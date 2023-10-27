import styled from "styled-components";
import {css} from 'styled-components'

export const primaryTextColour = css`
  color: #1a1a1a;
  //color: #d0d0d0;
`

export const secondaryTextColor = css`
  color: #595858;
  //color: #cccccc;
`

export const Button = styled.button`
  position: relative;
  width: fit-content;
  height: 36px;
  border-radius: 10px;
  font-size: 1em;
  padding: 0 15px;
  //letter-spacing: 0.4rem;
  //text-blink;
  border: none;
  //border-radius: 50%;
  //right: 25%;
  //background-color: white;
  filter: drop-shadow(0 0 0.5rem #d5d5d5);
  background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
  //color: #cbc8c8;
  ${secondaryTextColor};
  text-align: center;
  //text-decoration: none;
  //text-underline: none;
  font-weight: bold;
  color: #2b283a;
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/

  //p {
  //  filter: drop-shadow(0 0 0.5rem #000000);
  //  margin: 0;
  //}
`

export const LongButton = styled(Button)`
  width: 70%;
  margin: 15px auto;
`

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #2b283a;
  font-size: 1em;
  font-weight: bold;
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/
`

export const TagButton = styled.button`
  background: transparent;
  border: none;
  color: #2b283a;
  font-size: 1em;
  //background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  border-radius: 10px;
  padding: 5px;
  font-weight: bold;
  ${props => {
    if (props.current)
      return css`color: white`
  }}
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/
`

export const CirclePlusButton = styled.div`
  background-color: #2b283a;
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: fixed;
  bottom: 87px;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/
`

export const CirclePlusButtonText = styled.div`
  font-size: 3em;
  margin: 0;
  
`

export const ActionButton = styled(Button)`
  padding: 20px 30px;
  background: #2b283a;
  color: white;
  filter: none;
`

// export const IconButton = styled(ActionButton)`
//   padding-left: 10px;
//   padding-right: 10px;
// `

export const SearchBox = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 10px;
  background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  width: 100%;
  height: 37px;

`

export const Search = styled.input`
  z-index: 1;
  padding: 8px 10px;
  border-radius: 10px;
  width: calc(100% - 80px);
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  //background: white;
  &:focus {
    outline: none;
  }
`

export const Link = styled.a`
  color: #2b283a;
  text-decoration: none;
  
  &hover {
    color: #2b283a;
  }
`

// CONTAINERS
export const MobilePageContainer = styled.div`
  //margin: 0 5% 60px 5%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - 70px);
  position: relative;
  //background: white;
`

export const MobilePageContainerColumn = styled(MobilePageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`



export const RowFlexContainer = styled.div`
  display: flex;
  //justify-content: space-between;
  position: relative;

  //align-items: center;
  //background-color: white;
`

export const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  position: relative;

  //align-items: center;
  //background-color: white;
  
`

export const ScrollContainer = styled.div`
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - 45px - 74px);
  overflow: scroll;
  width: 100%;
`

export const ItemsContainerWithTopMenu = styled(ScrollContainer)`
  height: calc((var(--vh, 1vh) * 100) - 45px - 50px);
  padding: 0 5%;
  margin: 0;
  position: relative;
`

export const ItemsContainerWithSearchBar = styled(ItemsContainerWithTopMenu)`
  height: calc((var(--vh, 1vh) * 100) - 45px - 50px - 20px);
`

export const ItemsContainerWithPageSwitcher = styled(ItemsContainerWithTopMenu)`
  height: calc((var(--vh, 1vh) * 100) - 45px - 50px - 5px);
`

export const ItemsContainer = styled(ItemsContainerWithTopMenu)`
  height: calc((var(--vh, 1vh) * 100) - 45px);
`

export const ActionButtonContainer = styled(RowFlexContainer)`
  position: fixed;
  bottom: 48px;
  left: 0;
  padding: 0 5% 15px 5%;
  width: 100%;
  justify-content: space-between;
  background: linear-gradient(rgba(190, 182, 191, 0), rgba(0, 0, 0, 0.3));
  z-index: 90;
  //background: aqua;

`

export const Fader = styled.div`
  position: fixed;
  bottom: 48px;
  left: 0;
  width: 100%;
  height: 35px;
  backdrop-filter: blur(2px);
  //background-color: white;
  //z-index: 10;

`

export const TopMenu = styled.div`
  backdrop-filter: blur(15px);
  background: linear-gradient(rgb(0, 0, 0, 0.5), rgba(22, 53, 84, 0.0));
  width: 100%;
  height: 50px;
  //margin-left: -5%;
  display: flex;
  align-items: center;
  color: white;
`

export const TopMenuTitle = styled.div`
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
`

export const TopMenuCancel = styled.div`
  font-size: 0.9em;
  left: 5%;
  position: absolute;
`

export const TopMenuNext = styled(TopMenuCancel)`
  right: 5%;
  left: auto;
`

export const UndecoratedLink = styled.a`
  text-decoration: none;
  color: #2B283A;
`
// export const  = styled.div`
//
// `//
// export const  = styled.div`
//
// `//
// export const  = styled.div`
//
// `//
// export const  = styled.div`
//
// `
























// export const GlobalStyle = createGlobalStyle`
//     body {
//        background: ${props => props.backgroundGragient ? props.backgroundGragient : 'black'};
//       //background: linear-gradient(rgba(232, 232, 232, 0.5), rgba(18,18,18, 0.9), rgba(211, 19, 19, 0.9));
//       //background-color: #f68727;
//       //filter: alpha(opacity=60);
//       opacity: 0.9999;
//       display: block;
//       position: relative;
//         &::after {
//              background: ${props => props.pseudoBackgroundGradient ? props.pseudoBackgroundGradient : 'red'};
//             background-color: white;
//             bottom: 0;
//             content:"''";
//             color: rgba(0,0,0,0); //make it invisible
//             position: absolute;
//             left: 0;
//             opacity: ${props => props.isPseudoBackground ? 0.9 : 0};
//             //opacity: 1;
//             right: 0;
//             top: 0;
//             z-index: -1;
//           //width: 100px;
//           //height: 400px;
//           display: block;
//             transition: opacity 3000ms;
//         }
//     }
// `