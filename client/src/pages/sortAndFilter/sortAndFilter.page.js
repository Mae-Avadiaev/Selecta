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
        if (sortKey !== 'none') {
            const newTrackArray = resultTracks
            newTrackArray.sort((a, b) => {

                // console.log(sortKey)

                let valueA, valueB
                if (sortKey === 'releaseDate') {
                    valueA = a.album.releaseYear * 1
                    valueB = b.album.releaseYear * 1
                } else if (sortKey === 'instrumentalness') {
                    valueA = b[sortKey]
                    valueB = a[sortKey]
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

            newTrackArray.map(track => {
                track.selected = true
                if (track.album.releaseYear < minMaxParams.current.minYear ||
                    track.album.releaseYear > minMaxParams.current.maxYear ||
                    track.bpm < minMaxParams.current.minBpm ||
                    track.bpm > minMaxParams.current.maxBpm ||
                    track.energy < minMaxParams.curent.minEnergy ||
                    track.energy > minMaxParams.curent.maxEnergy ||
                    track.danceability < minMaxParams.curent.minDanceability ||
                    track.danceability > minMaxParams.curent.maxDanceability ||
                    track.instrumentalness < minMaxParams.curent.minInstrumentalness ||
                    track.instrumentalness > minMaxParams.curent.maxInstrumentalness ||
                    track.acousticness < minMaxParams.curent.minAcousticness ||
                    track.acousticness > minMaxParams.curent.maxAcousticness ||
                    track.valence < minMaxParams.curent.minValence ||
                    track.valence > minMaxParams.curent.maxValence ||
                    track.popularity < minMaxParams.curent.minPopularity ||
                    track.popularity > minMaxParams.curent.maxPopularity
                )
                    track.selected = false
            })
            // console.log(newTrackArray, 'fiiiinnnnnnnnnn')
            setResultTracks(newTrackArray)
        }
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

    const minMaxParams = useRef({
        minYear: 3000, maxYear: 1000,
        minBpm: 1000, maxBpm: 0,
        minEnergy: 100, maxEnergy: 0,
        minDanceability: 100, maxDanceability: 0,
        minInstrumentalness: 100, maxInstrumentalness: 0,
        minAcousticness: 100, maxAcousticness: 0,
        minValence: 100, maxValence: 0,
        minPopularity: 100, maxPopularity: 0,
    })

    const [sliderData, setSliderData] = useState([])

    useEffect(() => {
        resultTracks.map((track, i) => {
            // console.log(track, 'GREG')
            if (track.selected) {
                // console.log('HER')
                minMaxParams.current.minYear = track.album.releaseYear < minMaxParams.current.minYear ? track.album.releaseYear : minMaxParams.current.minYear
                minMaxParams.current.maxYear = track.album.releaseYear > minMaxParams.current.maxYear ? track.album.releaseYear : minMaxParams.current.maxYear
                minMaxParams.current.minBpm = track.bpm < minMaxParams.current.minBpm ? track.bpm : minMaxParams.current.minBpm
                minMaxParams.current.maxBpm = track.bpm > minMaxParams.current.maxBpm ? track.bpm : minMaxParams.current.maxBpm
                minMaxParams.current.minEnergy = track.energy < minMaxParams.current.minEnergy ? track.energy : minMaxParams.current.minEnergy
                minMaxParams.current.maxEnergy = track.energy > minMaxParams.current.maxEnergy ? track.energy : minMaxParams.current.maxEnergy
                minMaxParams.current.minDanceability = track.danceability < minMaxParams.current.minDanceability ? track.danceability : minMaxParams.current.minDanceability
                minMaxParams.current.maxDanceability = track.danceability > minMaxParams.current.maxDanceability ? track.danceability : minMaxParams.current.maxDanceability
                minMaxParams.current.minInstrumentalness = track.instrumentalness < minMaxParams.current.minInstrumentalness ? track.instrumentalness : minMaxParams.current.minInstrumentalness
                minMaxParams.current.maxInstrumentalness = track.instrumentalness > minMaxParams.current.maxInstrumentalness ? track.instrumentalness : minMaxParams.current.maxInstrumentalness
                minMaxParams.current.minAcousticness = track.acousticness < minMaxParams.current.minAcousticness ? track.acousticness : minMaxParams.current.minAcousticness
                minMaxParams.current.maxAcousticness = track.acousticness > minMaxParams.current.maxAcousticness ? track.acousticness : minMaxParams.current.maxAcousticness
                minMaxParams.current.minValence = track.valence < minMaxParams.current.minValence ? track.valence : minMaxParams.current.minValence
                minMaxParams.current.maxValence = track.valence > minMaxParams.current.maxValence ? track.valence : minMaxParams.current.maxValence
                minMaxParams.current.minPopularity = track.popularity < minMaxParams.current.minPopularity ? track.popularity : minMaxParams.current.minPopularity
                minMaxParams.current.maxPopularity = track.popularity > minMaxParams.current.maxPopularity ? track.popularity : minMaxParams.current.maxPopularity
            }
        })

        setSliderData([
            {
                minCaption: 'old',
                maxCaption: 'new',
                param: selectedParams.track.album.releaseYear,
                paramName: 'Year',
                defaultFromValue: minMaxParams.current.minYear,
                defaultToValue: minMaxParams.current.maxYear,
                trackMark: false
            }, {
                minCaption: 'slow',
                maxCaption: 'fast',
                param: selectedParams.track.bpm,
                paramName: 'Bpm',
                defaultFromValue: minMaxParams.current.minBpm,
                defaultToValue: minMaxParams.current.maxBpm,
                trackMark: false
            }, {
                minCaption: 'chill',
                maxCaption: 'intense',
                param: selectedParams.track.energy,
                paramName: 'Energy',
                defaultFromValue: Math.round(minMaxParams.current.minEnergy * 100),
                defaultToValue: Math.round(minMaxParams.current.maxEnergy * 100),
                trackMark: false
            }, {
                minCaption: 'not for Dance',
                maxCaption: 'danceable',
                param: selectedParams.track.danceability,
                paramName: 'Danceability',
                defaultFromValue: Math.round(minMaxParams.current.minDanceability * 100),
                defaultToValue: Math.round(minMaxParams.current.maxDanceability * 100),
                trackMark: false
            }, {
                minCaption: 'with Vocals',
                maxCaption: 'instrumental',
                param: selectedParams.track.instrumentalness,
                paramName: 'Instrumentalness',
                defaultFromValue: Math.round(minMaxParams.current.minInstrumentalness * 100),
                defaultToValue: Math.round(minMaxParams.current.maxInstrumentalness * 100),
                trackMark: false
            }, {
                minCaption: 'electronic',
                maxCaption: 'acoustic',
                param: selectedParams.track.acousticness,
                paramName: 'Acousticness',
                defaultFromValue: Math.round(minMaxParams.current.minAcousticness * 100),
                defaultToValue: Math.round(minMaxParams.current.maxAcousticness * 100),
                trackMark: false
            }, {
                minCaption: 'dark',
                maxCaption: 'light',
                param: selectedParams.track.valence,
                paramName: 'Valence',
                defaultFromValue: Math.round(minMaxParams.current.minValence * 100),
                defaultToValue: Math.round(minMaxParams.current.maxValence * 100),
                trackMark: false
            }, {
                minCaption: 'obscure',
                maxCaption: 'popular',
                param: selectedParams.track.popularity,
                paramName: 'Popularity',
                defaultFromValue: minMaxParams.current.minPopularity,
                defaultToValue: minMaxParams.current.maxPopularity,
                trackMark: false
            },
        ])
    }, [resultTracks])

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
                            <option value='none'>none</option>
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