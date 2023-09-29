import {
    SortingContainer,
    SortingHeader,
    SortingOptionsContainer,
    SortingOptionsSelect
} from "../results/results.page.styles";
import {RangeSlider} from "../../components/rangeSlider/rangeSlider.component";
import React, {useEffect, useRef} from "react";
import {
    ActionButton,
    ActionButtonContainer, Fader,
    ItemsContainerWithTopMenu,
    TopMenu,
    TopMenuCancel,
    TopMenuTitle
} from "../../app.styles";
import {useState} from "react";
import {SlidersContainer} from "../newPreset/newPreset.page.styles";

export const SortAndFilterPage = ({setSortAndFilterOptions, sortAndFilterOptions, resultTracks, setResultTracks, selectedParams}) => {

    const sortParameterRef = useRef()
    const sortTypeRef = useRef()

    const handleSortChange = (id) => {

        setSortAndFilterOptions(prevState => {

            const newSortOptions = prevState.sortOptions
            newSortOptions[id] = {[sortParameterRef.current.value]: sortTypeRef.current.value}
            return {
                ...prevState,
                sortOptions: newSortOptions
            }
        })
    }

    const applySortingAndFiltering = (options) => {

        // sort
        const sortKey = Object.keys(options.sortOptions[0])[0]
        const newTrackArray = resultTracks
        if (sortKey !== 'none') {

            newTrackArray.sort((a, b) => {

                // console.log(sortKey)

                let valueA, valueB
                if (sortKey === 'releaseDate') {
                    valueA = a.album.releaseYear * 1
                    valueB = b.album.releaseYear * 1
                } else if (sortKey === 'instrumentalness') {
                    valueA = b[sortKey]
                    valueB = a[sortKey]
                } else if (sortKey === 'relevance') {

                } else {
                    valueA = a[sortKey]
                    valueB = b[sortKey]
                }

                // console.log(valueA, valueB, 'vals')

                if (Object.values(options.sortOptions[0])[0] * 1 === 1)
                    return valueA - valueB
                else
                    return valueB - valueA
            })
        }

        // console.log(sortAndFilterOptions.params, 'AMAM')
        // console.log(newTrackArray[0], 'JOPA')

        newTrackArray.map(track => {
            track.selected = true
            if (track.album.releaseYear < sortAndFilterOptions.params.minYear ||
                track.album.releaseYear > sortAndFilterOptions.params.maxYear ||
                track.bpm < sortAndFilterOptions.params.minBpm ||
                track.bpm > sortAndFilterOptions.params.maxBpm ||
                track.energy < sortAndFilterOptions.params.minEnergy ||
                track.energy > sortAndFilterOptions.params.maxEnergy ||
                track.danceability < sortAndFilterOptions.params.minDanceability ||
                track.danceability > sortAndFilterOptions.params.maxDanceability ||
                track.instrumentalness < sortAndFilterOptions.params.minInstrumentalness ||
                track.instrumentalness > sortAndFilterOptions.params.maxInstrumentalness ||
                track.acousticness < sortAndFilterOptions.params.minAcousticness ||
                track.acousticness > sortAndFilterOptions.params.maxAcousticness ||
                track.valence < sortAndFilterOptions.params.minValence ||
                track.valence > sortAndFilterOptions.params.maxValence ||
                track.popularity < sortAndFilterOptions.params.minPopularity ||
                track.popularity > sortAndFilterOptions.params.maxPopularity
            ) {
                console.log(`filtered ${track.name}`)
                track.selected = false
            }
        })
        // console.log(newTrackArray, 'fiiiinnnnnnnnnn')
        setResultTracks(newTrackArray)
        window.history.back()
    }

    console.log(resultTracks && resultTracks[0])
    console.log(selectedParams && selectedParams)

    // let minYear = 3000, maxYear = 1000
    // let minBpm = 1000, maxBpm = 0
    // let minEnergy = 100, maxEnergy = 0
    // let minDanceability = 100, maxDanceability = 0
    // let minInstrumentalness = 100, maxInstrumentalness = 0
    // let minAcousticness = 100, maxAcousticness = 0
    // let minValence = 100, maxValence = 0
    // let minPopularity = 100, maxPopularity = 0



    const [sliderData, setSliderData] = useState([])

    console.log(sortAndFilterOptions.params, 'SKEDA')

    // triggered only for the first time
    if (!sortAndFilterOptions.params) {

        const minMaxParams = {
            minYear: 3000, maxYear: 1000,
            minBpm: 1000, maxBpm: 0,
            minEnergy: 100, maxEnergy: 0,
            minDanceability: 100, maxDanceability: 0,
            minInstrumentalness: 100, maxInstrumentalness: 0,
            minAcousticness: 100, maxAcousticness: 0,
            minValence: 100, maxValence: 0,
            minPopularity: 100, maxPopularity: 0,
        }

        resultTracks.map((track, i) => {
            if (track.selected) {
                minMaxParams.minYear = track.album.releaseYear < minMaxParams.minYear ? track.album.releaseYear : minMaxParams.minYear
                minMaxParams.maxYear = track.album.releaseYear > minMaxParams.maxYear ? track.album.releaseYear : minMaxParams.maxYear
                minMaxParams.minBpm = track.bpm < minMaxParams.minBpm ? track.bpm : minMaxParams.minBpm
                minMaxParams.maxBpm = track.bpm > minMaxParams.maxBpm ? track.bpm : minMaxParams.maxBpm
                minMaxParams.minEnergy = track.energy < minMaxParams.minEnergy ? track.energy : minMaxParams.minEnergy
                minMaxParams.maxEnergy = track.energy > minMaxParams.maxEnergy ? track.energy : minMaxParams.maxEnergy
                minMaxParams.minDanceability = track.danceability < minMaxParams.minDanceability ? track.danceability : minMaxParams.minDanceability
                minMaxParams.maxDanceability = track.danceability > minMaxParams.maxDanceability ? track.danceability : minMaxParams.maxDanceability
                minMaxParams.minInstrumentalness = track.instrumentalness < minMaxParams.minInstrumentalness ? track.instrumentalness : minMaxParams.minInstrumentalness
                minMaxParams.maxInstrumentalness = track.instrumentalness > minMaxParams.maxInstrumentalness ? track.instrumentalness : minMaxParams.maxInstrumentalness
                minMaxParams.minAcousticness = track.acousticness < minMaxParams.minAcousticness ? track.acousticness : minMaxParams.minAcousticness
                minMaxParams.maxAcousticness = track.acousticness > minMaxParams.maxAcousticness ? track.acousticness : minMaxParams.maxAcousticness
                minMaxParams.minValence = track.valence < minMaxParams.minValence ? track.valence : minMaxParams.minValence
                minMaxParams.maxValence = track.valence > minMaxParams.maxValence ? track.valence : minMaxParams.maxValence
                minMaxParams.minPopularity = track.popularity < minMaxParams.minPopularity ? track.popularity : minMaxParams.minPopularity
                minMaxParams.maxPopularity = track.popularity > minMaxParams.maxPopularity ? track.popularity : minMaxParams.maxPopularity
            }

            setSortAndFilterOptions(prevState => {return {
                ...prevState,
                params: {
                    minYear: minMaxParams.minYear,
                    maxYear: minMaxParams.maxYear,
                    minBpm: minMaxParams.minBpm,
                    maxBpm: minMaxParams.maxBpm,
                    minEnergy: minMaxParams.minEnergy,
                    maxEnergy: minMaxParams.maxEnergy,
                    minDanceability: minMaxParams.minDanceability,
                    maxDanceability: minMaxParams.maxDanceability,
                    minInstrumentalness: minMaxParams.minInstrumentalness,
                    maxInstrumentalness: minMaxParams.maxInstrumentalness,
                    minAcousticness: minMaxParams.minAcousticness,
                    maxAcousticness: minMaxParams.maxAcousticness,
                    minValence: minMaxParams.minValence,
                    maxValence: minMaxParams.maxValence,
                    minPopularity: minMaxParams.minPopularity,
                    maxPopularity: minMaxParams.maxPopularity,
                }
            }})
        })
    }

    useEffect(() => {
        if (sortAndFilterOptions.params) {
            setSliderData([
                {
                    minCaption: 'old',
                    maxCaption: 'new',
                    param: selectedParams.track.album.releaseYear,
                    paramName: 'Year',
                    defaultFromValue: sortAndFilterOptions.params.minYear,
                    defaultToValue: sortAndFilterOptions.params.maxYear,
                    trackMark: false
                }, {
                    minCaption: 'slow',
                    maxCaption: 'fast',
                    param: selectedParams.track.bpm,
                    paramName: 'Bpm',
                    defaultFromValue: sortAndFilterOptions.params.minBpm,
                    defaultToValue: sortAndFilterOptions.params.maxBpm,
                    trackMark: false
                }, {
                    minCaption: 'chill',
                    maxCaption: 'intense',
                    param: selectedParams.track.energy,
                    paramName: 'Energy',
                    defaultFromValue: sortAndFilterOptions.params.minEnergy,
                    defaultToValue: sortAndFilterOptions.params.maxEnergy,
                    trackMark: false
                }, {
                    minCaption: 'not for Dance',
                    maxCaption: 'danceable',
                    param: selectedParams.track.danceability,
                    paramName: 'Danceability',
                    defaultFromValue: sortAndFilterOptions.params.minDanceability,
                    defaultToValue: sortAndFilterOptions.params.maxDanceability,
                    trackMark: false
                }, {
                    minCaption: 'with Vocals',
                    maxCaption: 'instrumental',
                    param: selectedParams.track.instrumentalness,
                    paramName: 'Instrumentalness',
                    defaultFromValue: sortAndFilterOptions.params.minInstrumentalness,
                    defaultToValue: sortAndFilterOptions.params.maxInstrumentalness,
                    trackMark: false
                }, {
                    minCaption: 'electronic',
                    maxCaption: 'acoustic',
                    param: selectedParams.track.acousticness,
                    paramName: 'Acousticness',
                    defaultFromValue: sortAndFilterOptions.params.minAcousticness,
                    defaultToValue: sortAndFilterOptions.params.maxAcousticness,
                    trackMark: false
                }, {
                    minCaption: 'dark',
                    maxCaption: 'light',
                    param: selectedParams.track.valence,
                    paramName: 'Valence',
                    defaultFromValue: sortAndFilterOptions.params.minValence,
                    defaultToValue: sortAndFilterOptions.params.maxValence,
                    trackMark: false
                }, {
                    minCaption: 'obscure',
                    maxCaption: 'popular',
                    param: selectedParams.track.popularity,
                    paramName: 'Popularity',
                    defaultFromValue: sortAndFilterOptions.params.minPopularity,
                    defaultToValue: sortAndFilterOptions.params.maxPopularity,
                    trackMark: false
                },
            ])
        }
    }, [sortAndFilterOptions.params])


    // console.log(minMaxParams, 'mimim')

    // console.log(sliderData, 'sssssssssssssssssssliiiiiiiiiiiiiiiiiiiiiiidddddddddddddddddddddd')

    return (
        <>
            <TopMenu>
                <TopMenuCancel onClick={() => window.history.back()}>back</TopMenuCancel>
                <TopMenuTitle>choose options</TopMenuTitle>
            </TopMenu>
            <ItemsContainerWithTopMenu>
                <SortingContainer>
                    <SortingHeader>sort</SortingHeader>
                    <SortingOptionsContainer style={{marginBottom: '50px'}}>
                        <SortingOptionsSelect ref={sortParameterRef} onChange={() => handleSortChange( 0)}>
                            <option value='relevance'>by relevance</option>
                            <option value='bpm'>by bpm </option>
                            <option value='energy'>by energy</option>
                            <option value='releaseDate'>by release date</option>
                            <option value='popularity'>by popularity</option>
                            <option value='danceability'>by danceability</option>
                            <option value='instrumentalness'>by vocal</option>
                            <option value='valence'>by cheerfulness</option>
                            <option value='acousticness'>by acousticness</option>
                        </SortingOptionsSelect>
                        <SortingOptionsSelect ref={sortTypeRef} onChange={(e) => handleSortChange(0)}>
                            <option value='1'>↑</option>
                            <option value='0'>↓</option>
                        </SortingOptionsSelect>
                    </SortingOptionsContainer>
                </SortingContainer>
                <SortingContainer style={{paddingBottom: '50px'}}>
                    <SortingHeader>filter</SortingHeader>
                    <SlidersContainer>
                    {sliderData.map((data, i) => {
                        return (
                            <RangeSlider
                                key={i}
                                minCaption={data.minCaption}
                                maxCaption={data.maxCaption}
                                param={data.param}
                                setSelectedParam={setSortAndFilterOptions}
                                paramName={data.paramName}
                                defaultFromValue={data.defaultFromValue}
                                defaultToValue={data.defaultToValue}
                                trackMark={data.trackMark}
                            />
                        )
                    })}
                    </SlidersContainer>
                </SortingContainer>
                <ActionButtonContainer style={{justifyContent: 'right'}}>
                    <Fader/>
                    <ActionButton onClick={() => applySortingAndFiltering(sortAndFilterOptions)}>
                        apply
                    </ActionButton>
                </ActionButtonContainer>
            </ItemsContainerWithTopMenu>
        </>
    )
}