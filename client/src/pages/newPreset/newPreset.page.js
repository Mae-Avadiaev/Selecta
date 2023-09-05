import {RangeSlider} from "../../components/rangeSlider/rangeSlider.component";
import React from "react";
import {useState, useEffect} from "react"
import {ActionButton, Button, ItemsContainer, RowFlexContainer} from "../../app.styles";
import {
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

    let sliderData
    if (selectedParams.track) {
        sliderData = [{
            minCaption: 'slow',
            maxCaption: 'fast',
            param: selectedParams.track.bpm,
            paramName: 'Bpm'
        }, {
            minCaption: 'chill',
            maxCaption: 'intense',
            param: selectedParams.track.energy,
            paramName: 'Energy'
        }, {
            minCaption: 'not for Dance',
            maxCaption: 'danceable',
            param: selectedParams.track.danceability,
            paramName: 'Danceability'
        }, {
            minCaption: 'with Vocals',
            maxCaption: 'instrumental',
            param: selectedParams.track.instrumentalness,
            paramName: 'Instrumentalness'
        }, {
            minCaption: 'electronic',
            maxCaption: 'acoustic',
            param: selectedParams.track.acousticness,
            paramName: 'Acousticness'
        }, {
            minCaption: 'dark',
            maxCaption: 'light',
            param: selectedParams.track.valence,
            paramName: 'Valence'
        }, {
            minCaption: 'obscure',
            maxCaption: 'popular',
            param: selectedParams.track.popularity,
            paramName: 'Popularity'
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
    const {data: presetData, mutateAsync: createPreset, isSuccess} = useCreatePreset()
    const {mutate: mutatePresets} = usePatchPresets()

    const handleNext = async () => {

        // count preset percent params
        const relativeParams = {
            minBpm: selectedParams.params.minBpm - selectedParams.track.bpm,
            maxBpm: selectedParams.params.maxBpm - selectedParams.track.bpm,
            minEnergy: (selectedParams.params.minEnergy - selectedParams.track.energy).toFixed(2),
            maxEnergy: (selectedParams.params.maxEnergy - selectedParams.track.energy).toFixed(2),
            minDanceability: (selectedParams.params.minDanceability - selectedParams.track.danceability).toFixed(2),
            maxDeanceability: (selectedParams.params.maxDanceability - selectedParams.track.danceability).toFixed(2),
            minInstrumentalnes: (selectedParams.params.minInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
            maxInstrumentalness: (selectedParams.params.maxInstrumentalness - selectedParams.track.instrumentalness).toFixed(2),
            minAcousticness: (selectedParams.params.minAcousticness - selectedParams.track.acousticness).toFixed(2),
            maxAcousticness: (selectedParams.params.maxAcousticness - selectedParams.track.acousticness).toFixed(2),
            minValence: (selectedParams.params.minValence - selectedParams.track.valence).toFixed(2),
            maxValence: (selectedParams.params.maxValence - selectedParams.track.valence).toFixed(2),
            minPopularity: (selectedParams.params.minPopularity - selectedParams.track.popularity).toFixed(2),
            maxPopularity: (selectedParams.params.maxPopularity - selectedParams.track.popularity).toFixed(2)
        }

        Object.assign(selectedParams.params, relativeParams)
        Object.assign(selectedParams.params, {lastUse: new Date()})

        // create preset
        const response = await createPreset(selectedParams.params)
        mutatePresets([response.data.preset, 'add'])

        setSelectedParams(prevState => { return {
            ...prevState,
            preset: response.data.preset,
            fetch: true
        }})

        navigate('/add/results')
    }

    const [key, setKey] = useState('all')
    const [amount, setAmount] = useState('100')
    // const [adaptive, setAdaptive] = useState(true)

    useEffect(() => {

        let targetKey
        if (key === 'all')
            targetKey = undefined
        else if (key === 'same')
            targetKey = selectedParams.track.key.number

        setSelectedParams(prevState => { return {
            ...prevState,
            params: {
                ...prevState.params,
                amount: amount * 1,
                targetKey: targetKey,
                keyMode: key,
                // adaptive: adaptive,
                default: false,
            }
        }})
    }, [key, amount])

    return(
        <StyledNewPresetPage>
            {/*<PlaylistHeaderContainer style={{width: '100%', paddingLeft: '0', marginBottom: '25px'}}>*/}
            {/*    <PlaylistHeader style={{marginLeft: '5%'}}>Rules</PlaylistHeader>*/}
            {/*</PlaylistHeaderContainer>*/}
            <ItemsContainer>
                {/*<h1>Properties</h1>*/}
                {/*<AlgoRulesContainer>*/}
                <SlidersContainer>
                    {selectedParams.track && sliderData.map((data, i) =>
                        <RangeSlider
                            key={i}
                            minCaption={data.minCaption}
                            maxCaption={data.maxCaption}
                            param={data.param}
                            setSelectedParam={setSelectedParams}
                            paramName={data.paramName}
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
                <PresetButtonsContainer>
                    <ActionButton onClick={handleNext}>next</ActionButton>
                </PresetButtonsContainer>
            </ItemsContainer>
        </StyledNewPresetPage>
    )
}