import styled from "styled-components";
import {css} from 'styled-components'
import { createGlobalStyle } from 'styled-components';

export const primaryTextColour = css`
  color: #d9d9d9;
`

export const secondaryTextColor = css`
  color: #adadad;
`

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