import styled from "styled-components";
import {css} from 'styled-components'
import { createGlobalStyle } from 'styled-components';

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
  margin: 0 0 0 10px;
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

  //p {
  //  filter: drop-shadow(0 0 0.5rem #000000);
  //  margin: 0;
  //}
`

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #2b283a;
  font-size: 1em;
  font-weight: bold;
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
`



export const Search = styled.input`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background: transparent;
  background: radial-gradient(rgba(204, 204, 204, 0.3), rgba(192, 192, 192, 0.3));
  border: none;
`




// CONTAINERS
export const MobilePageContainer = styled.div`
  margin: 60px 5%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - 133px);
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
  justify-content: space-between;
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
  height: 60vh;
  overflow: scroll;
  width: 100%;
  margin-top: 10px;
`

// export const  = styled.div`
//
// `
//
// export const  = styled.div`
//
// `
//
// export const  = styled.div`
//
// `
//
// export const  = styled.div`
//
// `
//
// export const  = styled.div`
//
// `
//
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