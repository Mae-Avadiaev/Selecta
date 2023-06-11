import styled, {css, keyframes} from "styled-components";

const ANIMATION_SPEED = '150ms'
const MARGIN_LEFT = '-33.5'
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
  transition: all 200ms ease;
`

// const popUpAnimation = css`
//   transition: all ${ANIMATION_SPEED} ease-in;
// `

const popUpAnimation = keyframes`
  from {
    margin-left: ${MARGIN_LEFT + '%'};
    transform: scale(${SCALE_INACTIVE});
    opacity: 0.5;
    margin-top: 28%;
  }
  to {
    margin-left: 0;
    transform: scale(1);
    opacity: 1;
    margin-top: 0;
  }
`


const activeStyles = css`
  margin-left: 0;
  transform: scale(1);
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
  width: 100%;
  height: 300px;
  padding: 0 0 0 20px;
  outline-style: none;
  display: flex !important;
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
`

export const CoverContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CoverPreview = styled.img`
  height: 100%;
`

export const CoverShadow = styled.img`
  height: 100%;
  filter: blur(.5rem);
  z-index: -1;
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  transform: translateY(-50%)
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem;
  width: 65%;
`

export const Artists = styled.p`
  color: #616873;
  font-size: 2rem;
  margin: 0;
`

export const SongName = styled.p`
  color: #9dabbb;
  font-weight: 700;
  font-size: 2rem;
`

export const Bpm = styled.div`
  color: #9dabbb;
  font-size: 3.4rem;
  font-weight: 700;
  
  span {
    font-size: 1rem;
    font-weight: 300;
    color: #616873;
  }
`