import {PresetDescription, PresetHeader, PresetTag, StyledPreset, VoteAmount, VoteIcon, PresetAuthor} from "./preset.styles";
import {ColumnFlexContainer, RowFlexContainer} from "../../app.styles";
import arrowIcon from "./../../images/icon-arrow-right-white.png"

export const Preset = ({preset}) => {

    let tags = []

    tags.push(preset.adaptive ? 'adaptive' : 'static')
    tags.push(`${preset.amount} tracks`)
    tags.push(`keys: ${preset.keyMode}`)

    return (
        <StyledPreset>
            <RowFlexContainer>
                <ColumnFlexContainer>
                    <PresetHeader>{preset.name}</PresetHeader>
                    <PresetAuthor>by {preset.authorDisplayName}</PresetAuthor>
                    {/*<PresetDescription>Dance and forget about everything!</PresetDescription>*/}
                    {/*<RowFlexContainer>*/}
                    <div>
                        {tags.map(tag => {
                            return (
                                <PresetTag>{tag}</PresetTag>
                            )
                        })}

                        {/*<PresetTag>Chill</PresetTag>*/}
                        {/*<PresetTag>No Vocals</PresetTag>*/}
                        {/*<PresetTag>Acoustic</PresetTag>*/}
                        {/*<PresetTag>Light</PresetTag>*/}
                    </div>
                    {/*</RowFlexContainer>*/}
                </ColumnFlexContainer>
                {/*<ColumnFlexContainer style={{justifyContent: 'center'}}>*/}
                {/*    <VoteIcon src={arrowIcon} style={{transform: 'rotate(-90deg)'}}/>*/}
                {/*    <VoteAmount>242</VoteAmount>*/}
                {/*    <VoteIcon src={arrowIcon} style={{transform: 'rotate(90deg)'}}/>*/}
                {/*</ColumnFlexContainer>*/}
            </RowFlexContainer>
        </StyledPreset>
    )
}