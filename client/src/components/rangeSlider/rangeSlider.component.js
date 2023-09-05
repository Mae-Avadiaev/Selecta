import {
    AlgoCircle, AlgoCirclesContainer,
    SliderCaption,
    SliderCaptionsContainer, SliderInput,
    SlidersControl,
    StyledRangeSlider, ThumbValue,
    TrackMark, TrackMarkContainer
} from "./rangeSlider.styles";
import {useEffect, useRef, useState} from "react";

export const RangeSlider = ({minCaption, maxCaption, param, paramName, setSelectedParam}) => {

    // function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    //     const [from, to] = getParsed(fromInput, toInput);
    //     fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    //     if (from > to) {
    //         fromSlider.value = to;
    //         fromInput.value = to;
    //     } else {
    //         fromSlider.value = from;
    //     }
    // }

    // function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    //     const [from, to] = getParsed(fromInput, toInput);
    //     fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    //     setToggleAccessible(toInput);
    //     if (from <= to) {
    //         toSlider.value = to;
    //         toInput.value = to;
    //     } else {
    //         toInput.value = from;
    //     }
    // }

    const slideColor = '#3b3b3b'
    const rangeColor = '#C6C6C6'
    const trackMarkColor = '#3b3b3b'

    const [fromValue, setFromValue] = useState()
    const [toValue, setToValue] = useState()

    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        setFromValue(from)
        fillSlider(fromSlider, toSlider, slideColor, rangeColor, toSlider);
        if (from > to) {
            fromSlider.value = to;
            setFromValue(to)
            // fromInput.value = to;
        }
        // else {
        //     // fromInput.value = from;
        // }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, slideColor, rangeColor, toSlider);
        setToggleAccessible(toSlider, toSlider);
        if (from <= to) {
            toSlider.value = to;
            setToValue(to)
            // toInput.value = to;
        } else {
            // toInput.value = from;
            toSlider.value = from;
            setToValue(from)
        }
    }

    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
            to right,
            ${sliderColor} 0%,
            ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
            ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
            ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
            ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
            ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget, toSlider) {
        if (Number(currentTarget.value) <= 0 ) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    const fromSliderRef = useRef()
    const toSliderRef = useRef()


    // if (fromSliderRef.current && toSliderRef.current) {
    useEffect(() => {
        fillSlider(fromSliderRef.current, toSliderRef.current, slideColor, rangeColor, toSliderRef.current)
        setToggleAccessible(toSliderRef.current, toSliderRef.current);

        fromSliderRef.current.oninput = () => controlFromSlider(fromSliderRef.current, toSliderRef.current);
        toSliderRef.current.oninput = () => controlToSlider(fromSliderRef.current, toSliderRef.current);
    }, [])

    // }

    // console.log(Math.round(param * 100) + '%')
    let paramPercent, defaultFromValue, defaultToValue, min, max, thumbValueFromLeft, thumbValueToLeft
    let fromThumbValue, toThumbValue
    if (param <= 1) {
        // param case
        paramPercent = Math.round(param * 100 )
        defaultFromValue = paramPercent - 10 <= 0 ? 0 : paramPercent - 10
        defaultToValue = paramPercent + 10 >= 100 ? 100 : paramPercent + 10
        min = 0
        max = 100
        thumbValueFromLeft = Math.round(fromValue / 100 * 96)
        thumbValueToLeft = Math.round(toValue / 100 * 96)
        fromThumbValue = fromValue
        toThumbValue = toValue
    // } else if (param > 1000) {
    //     // year case
    //     paramPercent = 100 - (new Date().getFullYear() - param)
    //     defaultFromValue = new Date().getFullYear() - 100
    //     defaultToValue = new Date().getFullYear()
    //     min = new Date().getFullYear() - 100
    //     max = new Date().getFullYear()
    //     thumbValueFromLeft = Math.round((100 - (new Date().getFullYear() - fromValue)) / 100 * 100 - 5)
    //     thumbValueToLeft = Math.round((100 - (new Date().getFullYear() - toValue)) / 100 * 100 - 5)
    //     fromThumbValue = fromValue
    //     toThumbValue = toValue
    } else {
        // bpm case
        defaultFromValue = param - 5
        defaultToValue = param + 5
        if (param - 50 < 40) {
            min = 40
            max = 40 + 100
            paramPercent = param - min
        } else if (param + 50 > 200) {
            min = 200 - 100
            max = 200
            paramPercent = param - min
        } else {
            min = param - 50
            max = param + 50
            paramPercent = 50
        }
        thumbValueFromLeft = Math.round((fromValue - min - 4) / 100 * 100)
        thumbValueToLeft = Math.round((toValue - min - 4) / 100 * 100)
        fromThumbValue = fromValue === min ? 'All' : fromValue
        toThumbValue = toValue === max ? 'All' : toValue
    }

    const minParamName = `min${paramName}`
    const maxParamName = `max${paramName}`

    useEffect(() => {

        let minValue, maxValue
        if (param < 1) {
            minValue = defaultFromValue / 100
            maxValue = defaultToValue / 100
        } else {
            minValue = defaultFromValue * 1
            maxValue = defaultToValue * 1
        }

        setSelectedParam(prevState => { return {
            ...prevState,
            params: {
                ...prevState.params,
                [minParamName]: minValue,
                [maxParamName]: maxValue
            }
        }})
    }, [])

    // let circles = []
    // for (let i = 0; i < 11; i++) {
    //     circles.push(10 * i)
    // }

    const [slider1Touched, setSlider1Touched] = useState(false)
    const [slider2Touched, setSlider2Touched] = useState(false)

    const handleSliderTouchEnd = (slider) => {

        let selectedParamName, rawValue, value
        if (slider === 1) {
            setSlider1Touched(false)
            selectedParamName = minParamName
            rawValue = toSliderRef.current.value
        } else if (slider === 2) {
            setSlider2Touched(false)
            selectedParamName = maxParamName
            rawValue = fromSliderRef.current.value
        }

        if (param < 1)
            // param case
            value = rawValue / 100
        else
            // bpm case
            value = rawValue * 1

        setSelectedParam(prevState => { return {
            ...prevState,
            params: {
                ...prevState.params,
                [selectedParamName]: value
            }
        }})
    }

    return (
        <>
            <StyledRangeSlider>
            {/*{param > 1 && circles.map((circle, i) =>*/}
            {/*    <AlgoCircle key={i} style={{left: circle + '%', backgroundColor: trackMarkColor}}/>)}*/}

                <TrackMarkContainer>
                    <ThumbValue touched={slider1Touched} style={{left: thumbValueFromLeft + '%'}}>{fromThumbValue}</ThumbValue>
                    <ThumbValue touched={slider2Touched} style={{left: thumbValueToLeft + '%'}}>{toThumbValue}</ThumbValue>
                    <TrackMark color={trackMarkColor} param={paramPercent}/>
                </TrackMarkContainer>
                <SlidersControl>
                    <SliderInput
                        onTouchStart={() => setSlider1Touched(true)}
                        onTouchEnd={() => handleSliderTouchEnd(1)}
                        ref={fromSliderRef} type="range" defaultValue={defaultFromValue} min={min} max={max} step="1"
                        style={{height: '0', zIndex: '1'}} />
                    <SliderInput
                        onTouchStart={() => setSlider2Touched(true)}
                        onTouchEnd={() => handleSliderTouchEnd(2)}
                        ref={toSliderRef} type="range" defaultValue={defaultToValue} min={min} max={max} step="1"/>
                </SlidersControl>
                <SliderCaptionsContainer>
                    <SliderCaption>{minCaption}</SliderCaption>
                    <SliderCaption>{maxCaption}</SliderCaption>
                </SliderCaptionsContainer>
            </StyledRangeSlider>
        </>
    )
}