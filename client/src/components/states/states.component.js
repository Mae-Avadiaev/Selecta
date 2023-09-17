import {RowFlexContainer} from "../../app.styles";
import {State, StateColumn, StateDetail, StateDuration, StateNumberOfTracks, StateTitle} from "./states.styles"
import {StyledStates} from "./states.styles";

export const States = () => {

    const statesList = [
        {name: 'rave', gradient: [{r: 168, g: 41, b: 61}, {r: 172, g: 75, b: 59}]},
        {name: 'dance', gradient: [{r: 168, g: 41, b: 61}, {r: 172, g: 75, b: 59}]},
        {name: 'slow dance', gradient: [{r: 189, g: 97, b: 55}, {r: 206, g: 120, b: 51}]},
        {name: 'pre party', gradient: [{r: 189, g: 97, b: 55}, {r: 206, g: 120, b: 51}]},
        {name: 'socialise', gradient: [{r: 215, g: 141, b: 52}, {r: 216, g: 161, b: 57}]},
        {name: 'warm up', gradient: [{r: 215, g: 141, b: 52}, {r: 216, g: 161, b: 57}]},
        {name: 'sit', gradient: [{r: 216, g: 163, b: 58}, {r: 217, g: 188, b: 64}]},
        {name: 'lounge', gradient: [{r: 216, g: 163, b: 58}, {r: 217, g: 188, b: 64}]},
        {name: 'do a thing', gradient: [{r: 191, g: 188, b: 78}, {r: 149, g: 174, b: 90}]},
        {name: 'be all ears', gradient: [{r: 191, g: 188, b: 78}, {r: 149, g: 174, b: 90}]},
        {name: 'relax', gradient: [{r: 109, g: 162, b: 103}, {r: 69, g: 149, b: 117}]},
        {name: 'meditate', gradient: [{r: 109, g: 162, b: 103}, {r: 69, g: 149, b: 117}]},
    ]
    // const statesList = [
    //     {name: 'rave', gradient: [{r: 168, g: 41, b: 61}, {r: 172, g: 75, b: 59}]},
    //     {name: 'dance', gradient: [{r: 168, g: 41, b: 61}, {r: 172, g: 75, b: 59}]},
    //     {name: 'slow dance', gradient: [{r: 189, g: 97, b: 55}, {r: 206, g: 120, b: 51}]},
    //     {name: 'pre party', gradient: [{r: 189, g: 97, b: 55}, {r: 206, g: 120, b: 51}]},
    //     {name: 'socialise', gradient: [{r: 215, g: 141, b: 52}, {r: 216, g: 161, b: 57}]},
    //     {name: 'warm up', gradient: [{r: 215, g: 141, b: 52}, {r: 216, g: 161, b: 57}]},
    //     {name: 'sit', gradient: [{r: 216, g: 164, b: 58}, {r: 217, g: 184, b: 63}]},
    //     {name: 'lounge', gradient: [{r: 216, g: 164, b: 58}, {r: 217, g: 184, b: 63}]},
    //     {name: 'do a thing', gradient: [{r: 203, g: 192, b: 66}, {r: 163, g: 183, b: 66}]},
    //     {name: 'be all ears', gradient: [{r: 203, g: 192, b: 66}, {r: 163, g: 183, b: 66}]},
    //     {name: 'relax', gradient: [{r: 123, g: 173, b: 66}, {r: 84, g: 164, b: 66}]},
    //     {name: 'meditate', gradient: [{r: 123, g: 173, b: 66}, {r: 84, g: 164, b: 66}]},
    // ]

    return (
        <StyledStates>
            <RowFlexContainer style={{'justifyContent': 'space-between'}}>
                <StateColumn>
                    {statesList.map((state, i) =>
                        !(i % 2) &&
                        <State key={i} gradient={state.gradient}>
                            <StateTitle>{state.name}</StateTitle>
                            <StateDetail>111 tracks</StateDetail>
                        </State>
                    )}
                </StateColumn>
                <StateColumn>
                    {statesList.map((state, i) =>
                        !!(i % 2) &&
                        <State key={i} gradient={state.gradient}>
                            <StateTitle>{state.name}</StateTitle>
                            <StateDetail>111 tracks</StateDetail>
                        </State>
                    )}
                </StateColumn>
            </RowFlexContainer>
        </StyledStates>
    )
}