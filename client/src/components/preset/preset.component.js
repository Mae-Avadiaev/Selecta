import {PresetDescription, PresetHeader, PresetTag, StyledPreset, VoteAmount, VoteIcon} from "./preset.styles";
import {ColumnFlexContainer, RowFlexContainer} from "../../app.styles";
import arrowIcon from "./../../images/icon-arrow-right-white.png"

export const Preset = ({preset}) => {

    let tags = []


    return (
        <StyledPreset>
            <RowFlexContainer>
                <ColumnFlexContainer>
                    <PresetHeader>{preset.name}</PresetHeader>
                    {/*<PresetDescription>Dance and forget about everything!</PresetDescription>*/}
                    {/*<RowFlexContainer>*/}
                    <div>
                        <PresetTag>Not for Dance</PresetTag>
                        <PresetTag>Chill</PresetTag>
                        <PresetTag>No Vocals</PresetTag>
                        <PresetTag>Acoustic</PresetTag>
                        <PresetTag>Light</PresetTag>
                    </div>
                    {/*</RowFlexContainer>*/}
                </ColumnFlexContainer>
                <ColumnFlexContainer style={{justifyContent: 'center'}}>
                    <VoteIcon src={arrowIcon} style={{transform: 'rotate(-90deg)'}}/>
                    <VoteAmount>242</VoteAmount>
                    <VoteIcon src={arrowIcon} style={{transform: 'rotate(90deg)'}}/>
                </ColumnFlexContainer>
            </RowFlexContainer>
        </StyledPreset>
    )
}