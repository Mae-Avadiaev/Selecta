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
            paramName: 'tempo'
        }, {
            minCaption: 'chill',
            maxCaption: 'intense',
            param: selectedParams.track.energy,
            paramName: 'energy'
        }, {
            minCaption: 'not for Dance',
            maxCaption: 'danceable',
            param: selectedParams.track.danceability,
            paramName: 'danceability'
        }, {
            minCaption: 'with Vocals',
            maxCaption: 'instrumental',
            param: selectedParams.track.instrumentalness,
            paramName: 'instrumentalness'
        }, {
            minCaption: 'electronic',
            maxCaption: 'acoustic',
            param: selectedParams.track.acousticness,
            paramName: 'acousticness'
        }, {
            minCaption: 'dark',
            maxCaption: 'light',
            param: selectedParams.track.valence,
            paramName: 'valence'
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
    const {mutate: createPreset, isLoading, isError} = useCreatePreset()
    const {mutate: mutatePresets, isLoading, isError} = usePatchPresets()

    const handleNext = () => {
        setSelectedParams(prevState => { return {
            ...prevState,
            fetch: true
        }})

        // create preset
        createPreset()
        mutatePresets([setSelectedParams.params, 'add'])

        navigate('/add/results')
    }

    console.log(selectedParams)

    const [key, setKey] = useState('all')
    const [amount, setAmount] = useState('100')

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
                limit: amount * 1,
                target_key: targetKey
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