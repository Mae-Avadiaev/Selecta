import {RowFlexContainer} from "../../app.styles";
import {State, StateColumn, StateDetail, StateDuration, StateNumberOfTracks, StateTitle} from "./states.styles"
import {StyledStates} from "./states.styles";

export const States = () => {

    const statesList = [
        {name: 'rave'},
        {name: 'dance'},
        {name: 'slow dance'},
        {name: 'pre party'},
        {name: 'socialise'},
        {name: 'warm up'},
        {name: 'sit'},
        {name: 'lounge'},
        {name: 'do a thing'},
        {name: 'be all ears'},
        {name: 'relax'},
        {name: 'meditate'},
    ]

    return (
        <StyledStates>
            <RowFlexContainer style={{'justifyContent': 'space-between'}}>
                <StateColumn>
                    {statesList.map((state, i) =>
                        !(i % 2) &&
                        <State key={i}>
                            <StateTitle>{state.name}</StateTitle>
                            <StateDetail>111 tracks, 17 hr 11 min</StateDetail>
                        </State>
                    )}
                </StateColumn>
                <StateColumn>
                    {statesList.map((state, i) =>
                        !!(i % 2) &&
                        <State key={i}>
                            <StateTitle>{state.name}</StateTitle>
                            <StateDetail>111 tracks, 17 hr 11 min</StateDetail>
                        </State>
                    )}
                </StateColumn>
            </RowFlexContainer>
        </StyledStates>
    )
}