import {ActionButton, ItemsContainer, ActionButtonContainer, Fader, ColumnFlexContainer} from "../../app.styles";
import {Track} from "../../components/track/track.component";
import {useNavigate} from 'react-router-dom'
import {useSlidingWindow} from '../../hooks/useSlidingWindow'
import {AddButton, ButtonsContainer, OptionsContainer} from "../../components/seeds/mobileSeeds.styles";
import React, {useRef, useState} from "react";
import {
    DrawingNoTracksFound, NoTracksContainer,
    SortingContainer,
    SortingHeader,
    SortingOptionsContainer,
    SortingOptionsDeleteButton,
    SortingOptionsSelect
} from "./results.page.styles";
import {RangeSlider} from "../../components/rangeSlider/rangeSlider.component";
import drawingNoTracksFound from "../../images/drawing-no-tracks-found.png"
import {useCreatePreset} from "../../hooks/requests/useCreatePreset";
import {useCreateSeed} from "../../hooks/requests/useCreateSeed";

export const ResultsPage = ({resultTracks, setResultTracks, selectedTrack, setSelectedParams}) => {

    const navigate = useNavigate()

    // console.log(resultTracks, 'fiiiiiiiiiiiiin')

    // const [sortingOptions, setSortingOptions] = useState([])
    // const [sortCount, setSortCount] = useState(0)

    // const deleteSortingOption = (i) => {
    //     // console.log(i, 'index')
    //     // console.log(sortingOptions[i], 'option')
    //     setSortingOptions(prevState => {
    //         const res = prevState.filter((elem, index) => elem.props.id !== i)
    //         return res
    //     })
    //
    //     setSortCount(prevState => prevState -= 1)
    // }



    // const addSortingOption = () => {
    //     console.log(sortCount)
    //     if (sortCount < 3) {
    //         setSortingOptions((prevState) => {
    //
    //             const id = sortCount
    //
    //             return [...prevState,
    //                 <SortingOptionsContainer id={id} key={id}>
    //                     <SortingOptionsDeleteButton class="prevent-drag"
    //                         onClick={() => deleteSortingOption(sortCount === 0 ? 0 : sortCount === 1 ? 1 : 2)}>
    //                         -
    //                     </SortingOptionsDeleteButton>
    //                     <SortingOptionsSelect>
    //                         <option value=''>None</option>
    //                         <option value=''>by BPM </option>
    //                         <option value=''>by Year</option>
    //                         <option value=''>by Energy</option>
    //                     </SortingOptionsSelect>
    //                     <SortingOptionsSelect>
    //                         <option>↑</option>
    //                         <option>↓</option>
    //                     </SortingOptionsSelect>
    //                 </SortingOptionsContainer>]
    //         })
    //
    //         setSortCount(prevState => prevState += 1)
    //         openSlidingWindow(slidingWindowContent)
    //     }
    // }

    // const slidingWindowContent =
    //     <>
    //         <ActionButton className="prevent-drag" onClick={addSortingOption}>
    //             + add sorting option
    //         </ActionButton>
    //         {sortingOptions}
    //     </>

    const {openSlidingWindow} = useSlidingWindow()
    const [sortAndFilterOptions, setSortAndFilterOptions] = useState({
        params: undefined, sortOptions: [{none: 1}]})

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

    const sortParameterRef = useRef()
    const sortTypeRef = useRef()

    console.log(sortAndFilterOptions, 'soooort')

    const applySortingAndFiltering = (options) => {

        // sort
        const sortKey = Object.keys(options.sortOptions[0])[0]
        if (sortKey !== 'none') {
            const newTrackArray = resultTracks
            newTrackArray.sort((a, b) => {

                console.log(sortKey)

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

                console.log(valueA, valueB, 'vals')

                if (Object.values(options.sortOptions[0])[0] * 1 === 1)
                    return valueA - valueB
                else
                    return valueB - valueA
            })

            console.log(newTrackArray, 'fiiiinnnnnnnnnn')
            setResultTracks(newTrackArray)
        }

    }

    const {mutate: createSeed} = useCreateSeed()

    const postSeed = () => {

        let selectaTrackIds = [], spotifyTrackIds = []

        resultTracks.map(track => {
            selectaTrackIds.push(track._id)
            spotifyTrackIds.push(track.spotifyId)
        })

        let sortedBy, sortedType
        if (sortAndFilterOptions.sortOptions[0] !== 'none') {
            sortedBy = sortAndFilterOptions.sortOptions.keys()[0]
            sortedType = sortAndFilterOptions.sortOptions.values()[0] === 1 ? '↑' : '↓'
        }

        console.log(selectedTrack, 'reeeeeeebon')

        const data = {
            seed: {
                name: `${selectedTrack.name}`,
                description: `${sortedBy ? `sorted by ${sortedBy} ${sortedType}. ` : ''}playlist made with Selecta`,
                type: 'seed',
                tracks: selectaTrackIds,
                coverUrl: selectedTrack.album[0].imageUrl,
                // genres: selectedTrack.album.genres
            },
            spotifyTrackIds: spotifyTrackIds

        }
        createSeed(data)
        setResultTracks(null)
        setSelectedParams({fetch: false})
        navigate('/listen')
    }

    return (
        <>
            <ItemsContainer style={{paddingBottom: '55px'}}>
                {resultTracks && !resultTracks.length ?
                    <NoTracksContainer>
                        {/*<h1>no tracks found</h1>*/}
                        <DrawingNoTracksFound src={drawingNoTracksFound}/>
                        <ActionButton onClick={() => {navigate('/add/presets')}}>back</ActionButton>
                    </NoTracksContainer> :
                    <>
                    {resultTracks && resultTracks.map((track, i) => {
                        return (
                            <Track key={i} track={track} button={'info'}/>
                        )
                    })}
                    <ActionButtonContainer>
                        <Fader/>
                        <ActionButton onClick={()=>{openSlidingWindow(
                            <>
                                <SortingContainer>
                                    <SortingHeader>sort</SortingHeader>
                                    <SortingOptionsContainer className='prevent-drag'>
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
                                <SortingContainer>
                                    <SortingHeader>filter</SortingHeader>
                                    <RangeSlider
                                        minCaption='old'
                                        maxCaption='new'
                                        param={0}
                                        setSelectedParam={setSortAndFilterOptions}
                                        paramName='Year'
                                    />
                                </SortingContainer>
                            </>,
                            () => applySortingAndFiltering(sortAndFilterOptions)
                        )}}>sort & filter</ActionButton>
                        <ActionButton onClick={()=>{postSeed()}}>save</ActionButton>
                    </ActionButtonContainer>
                </>}
            </ItemsContainer>
        </>
    )
}