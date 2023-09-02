import {RangeSlider} from "../../components/rangeSlider/rangeSlider.component";
import React from "react";
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

export const NewPresetPage = ({selectedParams, setSelectedParams}) => {

    // console.log(selectedParams, 'seld')

    let sliderData
    if (selectedParams.track) {
        sliderData = [{
            minCaption: 'slow',
            maxCaption: 'fast',
            param: selectedParams.track.bpm
        }, {
            minCaption: 'chill',
            maxCaption: 'intense',
            param: selectedParams.track.energy
        }, {
            minCaption: 'not for Dance',
            maxCaption: 'danceable',
            param: selectedParams.track.danceability
        }, {
            minCaption: 'instrumental',
            maxCaption: 'with Vocals',
            param: selectedParams.track.instrumentalness
        }, {
            minCaption: 'acoustic',
            maxCaption: 'electronic',
            param: selectedParams.track.acousticness
        }, {
            minCaption: 'dark',
            maxCaption: 'light',
            param: selectedParams.track.valence
        }, {
            minCaption: 'old',
            maxCaption: 'new',
            param: selectedParams.track.album[0].releaseYear
        }
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
    const handleNext = () => {
        // save preset
        navigate('/add/results')
    }

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
                        />)}
                </SlidersContainer>
                <MultipleOptionsContainer>
                    <OptionsContainer>
                        <OptionsTitle>key</OptionsTitle>
                        <NewPresetSelect>
                            <option selected="selected" value=''>all</option>
                            <option value=''>same</option>
                            <option value=''>adjacent</option>
                        </NewPresetSelect>
                    </OptionsContainer>
                    <OptionsContainer>
                        <OptionsTitle>amount</OptionsTitle>
                        <NewPresetSelect>
                            <option value=''>5</option>
                            <option value=''>10</option>
                            <option selected="selected" value=''>20</option>
                            <option value=''>35</option>
                            <option value=''>50</option>
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