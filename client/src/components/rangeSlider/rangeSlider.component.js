import {
    AlgoCircle, AlgoCirclesContainer,
    SliderCaption,
    SliderCaptionsContainer,
    SlidersControl,
    StyledRangeSlider,
    TrackMark, TrackMarkContainer
} from "./rangeSlider.styles";
import {useEffect, useRef} from "react";

export const RangeSlider = ({minCaption, maxCaption, param}) => {

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

    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, slideColor, rangeColor, toSlider);
        if (from > to) {
            fromSlider.value = to;
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
            // toInput.value = to;
        } else {
            // toInput.value = from;
            toSlider.value = from;
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
    let paramPercent
    let defaultFromValue
    let defaultToValue
    let min
    let max
    let processedParam
    if (param <= 1) {
        paramPercent = Math.round(param * 100 )
        defaultFromValue = paramPercent - 10 <= 0 ? 0 : paramPercent - 10
        defaultToValue = paramPercent + 10 >= 100 ? 100 : paramPercent + 10
        max = 100
    } else {
        paramPercent = 50
        defaultFromValue = 7
        defaultToValue = 13
        max = 20
    }

    let circles = []
    for (let i = 0; i < 11; i++) {
        circles.push(10 * i)
    }

    return (
        <>
            <StyledRangeSlider>
            {/*{param > 1 && circles.map((circle, i) =>*/}
            {/*    <AlgoCircle key={i} style={{left: circle + '%', backgroundColor: trackMarkColor}}/>)}*/}
                <TrackMarkContainer>
                    <TrackMark color={trackMarkColor} param={paramPercent}/>
                </TrackMarkContainer>
                <SlidersControl>
                    <input ref={fromSliderRef} type="range" defaultValue={defaultFromValue} min="0" max={max} step="1" style={{height: '0', zIndex: '1'}}/>
                    <input ref={toSliderRef} type="range" defaultValue={defaultToValue} min="0" max={max} step="1"/>
                </SlidersControl>
                <SliderCaptionsContainer>
                    <SliderCaption>{minCaption}</SliderCaption>
                    <SliderCaption>{maxCaption}</SliderCaption>
                </SliderCaptionsContainer>
            </StyledRangeSlider>
        </>
    )
}