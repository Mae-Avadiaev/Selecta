import {PresetDescription, PresetHeader, PresetTag, StyledPreset, VoteAmount, VoteIcon, PresetAuthor} from "./preset.styles";
import {ColumnFlexContainer, RowFlexContainer} from "../../app.styles";
import arrowIcon from "./../../images/icon-arrow-right-white.png"
// import {applyPreset} from "../../utils/applyPreset";
import {useNavigate} from "react-router-dom";

export const Preset = ({preset, selectedParams, setSelectedParams}) => {

    const navigate = useNavigate()
    let tags = []

    tags.push(preset.adaptive ? 'adaptive' : 'static')
    tags.push(`${preset.amount} tracks`)
    tags.push(`keys: ${preset.keyMode}`)

    // console.log(preset, 'press')
    const applyPreset = () => {

        // count preset percent params
        // const relativeParams = {
        //     minBpm: selectedParams.track.bpm + preset.minBpm,
        //     maxBpm: selectedParams.track.bpm + preset.maxBpm ,
        //     minEnergy: (selectedParams.track.energy + preset.minEnergy).toFixed(2),
        //     maxEnergy: (selectedParams.track.energy + preset.maxEnergy).toFixed(2),
        //     minDanceability: (selectedParams.track.danceability + preset.minDanceability).toFixed(2),
        //     maxDanceability: (selectedParams.track.danceability + preset.maxDanceability).toFixed(2),
        //     minInstrumentalness: (selectedParams.track.instrumentalness + preset.minInstrumentalness).toFixed(2),
        //     maxInstrumentalness: (selectedParams.track.instrumentalness + preset.maxInstrumentalness).toFixed(2),
        //     minAcousticness: (selectedParams.track.acousticness + preset.minAcousticness).toFixed(2),
        //     maxAcousticness: (selectedParams.track.acousticness + preset.maxAcousticness).toFixed(2),
        //     minValence: (selectedParams.track.valence + preset.minValence).toFixed(2),
        //     maxValence: (selectedParams.track.valence + preset.maxValence).toFixed(2),
        //     minPopularity: (selectedParams.track.popularity + preset.minPopularity),
        //     maxPopularity: (selectedParams.track.popularity + preset.maxPopularity)
        // }
        //
        // Object.assign(selectedParams.params, relativeParams)
        // Object.assign(selectedParams.params, {lastUse: new Date()})

        // // create preset
        // const response = await createPreset(selectedParams.params)
        // await mutatePresets([response.data.preset, 'add'])

        setSelectedParams(prevState => { return {
            ...prevState,
            preset: preset,
            fetch: true
        }})

        navigate('/add/results')
    }

    return (
        <StyledPreset onClick={() => {applyPreset(selectedParams, setSelectedParams, navigate)}}>
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