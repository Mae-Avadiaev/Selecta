import {RangeSlider} from "../../components/rangeSlider/rangeSlider.component";
import React from "react";
import {useState, useEffect} from "react"
import {
    ActionButton, ActionButtonContainer,
    Button, Fader,
    ItemsContainer,
    ItemsContainerWithTopMenu,
    RowFlexContainer, SearchBox,
    TopMenu, TopMenuCancel, TopMenuTitle
} from "../../app.styles";
import {
    InputBox,
    InputField,
    MultipleOptionsContainer,
    NewPresetSelect,
    OptionsContainer, OptionsTitle,
    PresetButtonsContainer,
    SlidersContainer,
    StyledNewPresetPage
} from "./newPreset.page.styles";
import {useNavigate} from "react-router-dom";
import {usePatchPresets} from "../../hooks/requests/usePatchPresets"
import {useCreatePreset} from "../../hooks/requests/useCreatePreset"

export const NewPresetPage = ({selectedParams, setSelectedParams}) => {

    // console.log(selectedParams, 'seld')

    const energyParamPercent = Math.round(selectedParams.track.energy * 100)
    const danceabilityParamPercent = Math.round(selectedParams.track.danceability * 100)
    const instrumentalnesParamPercent = Math.round(selectedParams.track.instrumentalness * 100)
    const acousticnessParamPercent = Math.round(selectedParams.track.acousticness * 100)
    const valenceParamPercent = Math.round(selectedParams.track.valence * 100)

    let sliderData
    if (selectedParams.track) {
        sliderData = [{
            minCaption: 'slow',
            maxCaption: 'fast',
            param: selectedParams.track.bpm,
            paramName: 'Bpm',
            defaultFromValue: selectedParams.track.bpm - 5,
            defaultToValue: selectedParams.track.bpm + 5
        }, {
            minCaption: 'chill',
            maxCaption: 'intense',
            param: selectedParams.track.energy,
            paramName: 'Energy',
            defaultFromValue: energyParamPercent - 10 <= 0 ? 0 : (energyParamPercent - 10) / 100,
            defaultToValue: energyParamPercent + 10 >= 100 ? 1 : (energyParamPercent + 10) / 100
        }, {
            minCaption: 'not for Dance',
            maxCaption: 'danceable',
            param: selectedParams.track.danceability,
            paramName: 'Danceability',
            defaultFromValue: danceabilityParamPercent - 10 <= 0 ? 0 : (danceabilityParamPercent - 10) / 100,
            defaultToValue: danceabilityParamPercent + 10 >= 100 ? 1 : (danceabilityParamPercent + 10) / 100
        }, {
            minCaption: 'with Vocals',
            maxCaption: 'instrumental',
            param: selectedParams.track.instrumentalness,
            paramName: 'Instrumentalness',
            defaultFromValue: instrumentalnesParamPercent - 10 <= 0 ? 0 : (instrumentalnesParamPercent - 10) / 100,
            defaultToValue: instrumentalnesParamPercent + 10 >= 100 ? 1 : (instrumentalnesParamPercent + 10) / 100
        }, {
            minCaption: 'electronic',
            maxCaption: 'acoustic',
            param: selectedParams.track.acousticness,
            paramName: 'Acousticness',
            defaultFromValue: acousticnessParamPercent - 10 <= 0 ? 0 : (acousticnessParamPercent - 10) / 100,
            defaultToValue: acousticnessParamPercent + 10 >= 100 ? 1 : (acousticnessParamPercent + 10) / 100
        }, {
            minCaption: 'dark',
            maxCaption: 'light',
            param: selectedParams.track.valence,
            paramName: 'Valence',
            defaultFromValue: valenceParamPercent - 10 <= 0 ? 0 : (valenceParamPercent - 10) / 100,
            defaultToValue: valenceParamPercent + 10 >= 100 ? 1 : (valenceParamPercent + 10) / 100
        }, {
            minCaption: 'obscure',
            maxCaption: 'popular',
            param: selectedParams.track.popularity,
            paramName: 'Popularity',
            defaultFromValue: 0,
            defaultToValue: 100
        },
        // {
        //     minCaption: 'old',
        //     maxCaption: 'new',
        //     param: selectedParams.track.album[0].releaseYear
        // }
    ]}

        const addSortingOption = () => {

            // if (sortCount < 3) {
            //     setSortingOptions((prevState) => {
            //
            //         const id = sortCount
            //
            //         const res = [...prevState,
            //             <AlgoSelectsContainer id={id} key={id}>
            //                 <h3 onClick={() => deleteSortingOption(sortCount === 0 ? 0 : sortCount === 1 ? 1 : 2)} style={{marginLeft: '30px'}}>-</h3>
            //                 <AlgoSelect>
            //                     <option value=''>None</option>
            //                     <option value=''>by BPM </option>
            //                     <option value=''>by Year</option>
            //                     <option value=''>by Energy</option>
            //                 </AlgoSelect>
            //                 <AlgoSelect>
            //                     <option>from Low to High ↑</option>
            //                     <option>from High to Low ↓</option>
            //                 </AlgoSelect>
            //             </AlgoSelectsContainer>]
            //         return res
            //     })
            //
            //     setSortCount(prevState => prevState += 1)
            // }

        }

    const navigate = useNavigate()
    // const {data: presetData, mutateAsync: createPreset, isSuccess} = useCreatePreset()
    // const {mutate: mutatePresets} = usePatchPresets()

    // console.log(selectedParams.params)

    const handleNext = async () => {

        // count preset percent params
        const relativeParams = {
            minBpm: selectedParams.params.minBpm - selectedParams.track.bpm,
            maxBpm: selectedParams.params.maxBpm - selectedParams.track.bpm,
            minEnergy: (selectedParams.params.minEnergy - selectedParams.track.energy).toFixed(2),
            maxEnergy: (selectedParams.params.maxEnergy - selectedParams.track.energy).toFixed(2),
            minDanceability: (selectedParams.params.minDanceability - selectedParams.track.danceability).toFixed(2),
            maxDanceability: (selectedParams.params.maxDanceability - selectedParams.track.danceability).toFixed(2),
            minInstrumentalness: (selectedParams.params.minInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
            maxInstrumentalness: (selectedParams.params.maxInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
            minAcousticness: (selectedParams.params.minAcousticness - selectedParams.track.acousticness).toFixed(2),
            maxAcousticness: (selectedParams.params.maxAcousticness - selectedParams.track.acousticness).toFixed(2),
            minValence: (selectedParams.params.minValence - selectedParams.track.valence).toFixed(2),
            maxValence: (selectedParams.params.maxValence - selectedParams.track.valence).toFixed(2),
            minPopularity: (selectedParams.params.minPopularity - selectedParams.track.popularity),
            maxPopularity: (selectedParams.params.maxPopularity - selectedParams.track.popularity)
        }

        Object.assign(selectedParams.params, relativeParams)
        Object.assign(selectedParams.params, {lastUse: new Date()})

        // // create preset
        // const response = await createPreset(selectedParams.params)
        // await mutatePresets([response.data.preset, 'add'])

        setSelectedParams(prevState => { return {
            ...prevState,
            preset: selectedParams.params,
            createPreset: true,
            fetch: true
        }})

        navigate('/add/results')
    }

    const [key, setKey] = useState('all')
    const [amount, setAmount] = useState('100')
    const [name, setName] = useState('')
    // const [adaptive, setAdaptive] = useState(true)

    useEffect(() => {

        let targetKey, targetMode
        if (key === 'all') {
            targetKey = undefined
            targetMode = undefined
        } else if (key === 'same') {
            targetKey = selectedParams.track.key.number
            targetMode = selectedParams.track.mode
        }

        // console.log(selectedParams.track.key, 'rrrrrrrrrrrrriggggggggleeeeeeeee')

        setSelectedParams(prevState => { return {
            ...prevState,
            params: {
                ...prevState.params,
                amount: amount * 1,
                targetKey: targetKey,
                targetMode: targetMode,
                keyMode: key,
                name: name === '' || !name ? prevState.params.defaultName : name,
                default: false,
            }
        }})
    }, [key, amount, name])

    // console.log(selectedParams.params.name, 'nomen')

    return(
        <StyledNewPresetPage>
            {/*<PlaylistHeaderContainer style={{width: '100%', paddingLeft: '0', marginBottom: '25px'}}>*/}
            {/*    <PlaylistHeader style={{marginLeft: '5%'}}>Rules</PlaylistHeader>*/}
            {/*</PlaylistHeaderContainer>*/}
            <TopMenu>
                <TopMenuCancel onClick={() => window.history.back()}>cancel</TopMenuCancel>
                <TopMenuTitle>tweak the preset</TopMenuTitle>
            </TopMenu>
            <ItemsContainerWithTopMenu>
                {/*<h1>Properties</h1>*/}
                {/*<AlgoRulesContainer>*/}
                <InputField
                    onChange={(e) => setName(e.target.value)} value={name}
                    placeholder={selectedParams.params.defaultName}
                />
                <InputBox/>
                <SlidersContainer>
                    {selectedParams.track && sliderData.map((data, i) =>
                        <RangeSlider
                            key={i}
                            minCaption={data.minCaption}
                            maxCaption={data.maxCaption}
                            param={data.param}
                            setSelectedParam={setSelectedParams}
                            paramName={data.paramName}
                            defaultFromValue={data.defaultFromValue}
                            defaultToValue={data.defaultToValue}
                        />)}
                </SlidersContainer>
                <MultipleOptionsContainer>
                    {/*<OptionsContainer>*/}
                    {/*    <OptionsTitle>adaptive</OptionsTitle>*/}
                    {/*    <NewPresetSelect onChange={(e) => setAdaptive(e.target.value)} value={adaptive}>*/}
                    {/*        <option value={true}>yes</option>*/}
                    {/*        <option value={false}>no</option>*/}
                    {/*    </NewPresetSelect>*/}
                    {/*</OptionsContainer>*/}
                    <OptionsContainer>
                        <OptionsTitle>key</OptionsTitle>
                        <NewPresetSelect onChange={(e) => setKey(e.target.value)} value={key}>
                            <option value='all'>all</option>
                            <option value='same'>same</option>
                            <option value='adjacent'>adjacent</option>
                        </NewPresetSelect>
                    </OptionsContainer>
                    <OptionsContainer>
                        <OptionsTitle>amount</OptionsTitle>
                        <NewPresetSelect onChange={(e) => setAmount(e.target.value)} value={amount}>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='35'>35</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </NewPresetSelect>
                    </OptionsContainer>
                </MultipleOptionsContainer>
                <ActionButtonContainer style={{justifyContent: 'right'}}>
                    <Fader/>
                    <ActionButton onClick={handleNext}>next</ActionButton>
                </ActionButtonContainer>
            </ItemsContainerWithTopMenu>
        </StyledNewPresetPage>
    )
}