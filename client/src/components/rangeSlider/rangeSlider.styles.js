import styled from 'styled-components'

export const StyledRangeSlider = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 10% auto;
  position: relative;
  //background: white;
`

export const SlidersControl = styled.div`
  position: relative;
  min-height: 10px;
  //background-color: white;
`

export const SliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #C6C6C6;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #C6C6C6;
    cursor: pointer;
  }

  //&::-webkit-slider-thumb:hover {
  //  background: #ff0000;
  //  
  //
  
  &::-webkit-slider-thumb:active {
    box-shadow: inset 0 0 3px #c5c5c5, 0 0 9px #cbcbcb;
    -webkit-box-shadow: inset 0 0 3px #b4b4b4, 0 0 9px #bbbbbb;
  }
`

export const ThumbValue = styled.div`
  position: absolute;
  //font-size: 5em;
  top: -30px;
  font-weight: bold;
  opacity: ${props => props.touched ? 1 : 0};
  //transition: 0.2s opacity;
`


// export const AlgoCirclesContainer = styled.div`
//   //display: flex;
//   width: 100%;
//   align-items: center;
//   position: absolute;
// `

export const AlgoCircle = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  top: 0;
`

export const SliderCaptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SliderCaption = styled.p`
  font-weight: bold;
`

export const TrackMarkContainer = styled.div`
  position: absolute;
  //display: flex;
  //align-items: center;
  width: 94%;
  height: fit-content;
  //background-color: white;
  top: -13px;
  left: 3%
`

export const TrackMark = styled.div`
  //position: absolute;
  width: 3px;
  height: 30px;
  background-color: ${props => props.color};
  
  z-index: 1; 
  margin-left: ${props => {
    if (props.param === 0)
      return '-1.5%'
    else if (props.param === 100)
        return '101.5%'
    else
        return props.param + '%'
  }};
    `

// export const = styled.div`
//
// `
//
// export const = styled.div`
//
// `
//
// export const = styled.div`
//
// `
//
// export const = styled.div`
//
// `
