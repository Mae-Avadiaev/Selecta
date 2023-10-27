import styled, {css, keyframes} from "styled-components";
import {primaryTextColour, secondaryTextColor} from "../../app.styles";
import {PlaylistTag, PlaylistTagContainer} from "../playlist/playlist.styles";

const ANIMATION_SPEED = '400ms'
// const MARGIN_LEFT = '33.5'
const MARGIN_LEFT = '0'
const SCALE_INACTIVE = 0.3
// const moveIn = keyframes`
//   from {
//     margin-left: ${MARGIN_LEFT + '%'};
//     transform: scale(${SCALE_INACTIVE});
//     opacity: 0.5;
//   }
//   to {
//     margin-left: 0;
//     transform: scale(1);
//     opacity: 1;
//   }
// `
//
// const moveOut = keyframes`
//   0% {
//     margin-left: 0;
//     transform: scale(1);
//     opacity: 1;
//   }
//   100% {
//     margin-left: ${MARGIN_LEFT + '%'};
//     transform: scale(${SCALE_INACTIVE});
//     opacity: 0.5;
//   }
// `

const moveInAnimation = css`
  transition: all ${ANIMATION_SPEED} ease;
`

const moveOutAnimation = css`
  transition: all ${ANIMATION_SPEED} ease-out;
`

// const swipeOut = keyframes`
//   0% {
//     margin-left: 0;
//     transform: scale(1);
//     opacity: 1;
//   }
//   100% {
//     margin-left: 110%;
//     transform: scale(${SCALE_INACTIVE});
//     opacity: 0.3;
//   }
// `

const swipeOutAnimation = css`
  transition: all ${ANIMATION_SPEED} ease;
`

// const popUpAnimation = css`
//   transition: all ${ANIMATION_SPEED} ease-in;
// `

const popUpAnimation = keyframes`
  from {
    margin-left: ${MARGIN_LEFT + '%'};
    transform: scale(${SCALE_INACTIVE});
    opacity: 0.5;
    margin-top: 98%;
  }
  to {
    margin-left: 0;
    transform: scale(1.3);
    opacity: 1;
    margin-top: 0;
  }
`


const activeStyles = css`
  margin-left: 0;
  transform: scale(1.3);
  opacity: 1;
  
`

const inactiveStyles = css`
  margin: 0 0 0 ${MARGIN_LEFT + '%'};
  transform: scale(${SCALE_INACTIVE});
  opacity: 0.5;
`

const swipeOutStyles = css`
  ${swipeOutAnimation};
  position: absolute;
  margin-left: 100%;
`

const popUpStyles = css`
  animation: ${popUpAnimation} ${ANIMATION_SPEED};
`

export const StyledCarouselItem = styled.div`
  //border: solid black 1px;
  //overflow-x: hidden;
  width: 100%;
  height: 300px;
  @media only screen and (min-width: 800px) {
    height: 300px;
  }
  //max-width: 800px;
  //margin-top: 15px;
  //padding: 0 0 0 20px;
  outline-style: none;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //color: #d2d2d2 !important;
  color: ${props => props.lightText ? '#eeeeee' : '#1a1a1a'};
  //background: aquamarine;
  ${props => {
    if (props.styles === 'swipe out')
      return (swipeOutStyles)
    else if (props.styles === 'pop up')
      return (popUpStyles)
    else if (props.styles === 'active') {
      return (css`
        ${activeStyles};
        ${props.animation ? moveInAnimation : 0}
      `)
    } else if (props.styles === 'inactive')
      return (css`
        ${inactiveStyles};
        ${props.animation ? moveOutAnimation : 0};
      `)
  }}
  ${props => props.isUpper ? (css`opacity: 0`) : null}
}
`

export const CoverContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: purple;
  width: 60%;
  //width: 100%;
`

export const CoverPreview = styled.img`
  width: 100%;
  border-radius: 7px;
`

export const CoverShadow = styled.img`
  width: 100%;
  filter: blur(.5rem);
  z-index: -1;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%)
`

export const Info = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  //padding: 3rem;
  width: 60%;
`

export const SongName = styled.p`
  //color: #9dabbb;
  font-weight: 700;
  font-size: 1rem;
  margin: .8rem 0 0 0;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden; !important;
  white-space: nowrap;
`

export const Artists = styled.p`
  //color: #616873;
  width: 100%;
  font-size: .7rem;
  margin: .4rem 0 0 0;
  text-overflow: ellipsis;
  //display: inline-block;
  overflow: hidden; !important;
  white-space: nowrap;
  //background: red;
`



export const CarouselItemGenresContainer = styled.div`
  display: flex;
  flex-direction: row;
  //overflow-x: unset;
  overflow-x: hidden;
  margin-top: .4rem;
  //width: 60%;
  //background: white;
  //height: 100px;

`

export const CarouselItemSlidingContainer = styled.div`
  display: flex;
  -moz-transform: translateX(0%);
  -webkit-transform: translateX(0%);
  transform: translateX(0%);

  -moz-animation: ${props => props.isOverflow ? ' my-animation 30s linear infinite' : 'none'};
  -webkit-animation: ${props => props.isOverflow ? ' my-animation 30s linear infinite' : 'none'};
  animation: ${props => props.isOverflow ? ' my-animation 30s linear infinite' : 'none'};


  //!* for Firefox *!
   @-moz-keyframes my-animation {
     0% { -moz-transform: translateX(5%); }
     50% { -moz-transform: translateX(-50%); }
     100% { -moz-transform: translateX(5%); }

   }

   //!* for Chrome *!
   @-webkit-keyframes my-animation {
     0% { -webkit-transform: translateX(5%); }
     50% { -webkit-transform: translateX(-50%); }
     100% { -webkit-transform: translateX(5%); }
   }

   @keyframes my-animation {
     0% {
       -moz-transform: translateX(5%);
       -webkit-transform: translateX(5%);
       transform: translateX(5%);
     }
     50% {
       -moz-transform: translateX(-50%);
       -webkit-transform: translateX(-50%);
       transform: translateX(-50%);
     }
     100% {
       -moz-transform: translateX(5%);
       -webkit-transform: translateX(5%);
       transform: translateX(5%);
     }
 
 `

export const CarouselItemGenreContainer = styled.div`
  display: block;
  margin: 0 7px 10px 0;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  padding: 0 15px;
  text-align: center;
  //color: #2b283a;
  border: ${props => props.lightText ? '1px solid #eeeeee' : '1px solid #1a1a1a'};
  //border: 1px solid white;
`

export const CarouselItemGenre = styled(PlaylistTag)`
  font-size: .6rem;
  
`

export const Label = styled(CarouselItemGenre)`
    margin-top: .8rem;
`

export const Year = styled.p`
  //color: #1a1a1a !important;
  font-size: .9rem;
  //font-weight: 300;
  margin: .4rem 0 0 0;
  font-weight: 300;
  //color: #616873;
`

export const Key = styled(Year)`
  //font-weight: 300 !important;
  margin-bottom: 0.7rem !important;

`

export const Bpm = styled.div`
  //color: #9dabbb;
  margin-top: .8rem;
  font-size: 1rem;
  font-weight: 700;
  width: 30%;
  text-align: right;
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  
  p {
    font-size: .7rem;
    font-weight: 300;
    margin: .4rem 0 0 0;
    text-align: right;
    //color: #616873;
  }
`