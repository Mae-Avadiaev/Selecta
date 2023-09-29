import {
    ActionButton,
    ItemsContainer,
    ActionButtonContainer,
    Fader,
    ColumnFlexContainer,
    TopMenuCancel, TopMenuTitle, TopMenu, ItemsContainerWithTopMenu, TopMenuNext
} from "../../app.styles";
import {Track} from "../../components/track/track.component";
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useSlidingWindow} from '../../hooks/useSlidingWindow'
import {
    AddButton,
    ButtonsContainer,
    OptionsContainer,
    SelectContainer
} from "../../components/seeds/mobileSeeds.styles";
import React, {useEffect, useRef, useState} from "react";
import {
    DrawingNoTracksFound, NoTracksContainer, SelectaViewImage,
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
import {usePatchPresets} from "../../hooks/requests/usePatchPresets";
import {SortAndFilterPage} from "../sortAndFilter/sortAndFilter.page";
import selectaViewIcon from "../../images/select-mode-icon.png"
import {MobileCarousel} from "../../components/mobileCarousel/mobileCarousel.component";
import {usePlayingAudioOptions} from "../../contexts/playingAudio.context";

export const ResultsPage = ({resultTracks, setResultTracks, selectedParams, setSelectedParams, playingAudioId, setPlayingAudioId}) => {

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





    // console.log(sortAndFilterOptions, 'soooort')

    const {mutate: createSeed} = useCreateSeed()
    const {data: presetData, mutateAsync: createPreset, isSuccess} = useCreatePreset()
    const {mutate: mutatePresets} = usePatchPresets()

    const postSeed = async () => {

        let selectaTrackIds = [], spotifyTrackIds = []

        resultTracks.map(track => {
            if (track.selected) {
                selectaTrackIds.push(track._id)
                spotifyTrackIds.push(track.spotifyId)
            }
        })

        let sortedBy, sortedType
        if (sortAndFilterOptions.sortOptions[0] !== 'none') {
            sortedBy = sortAndFilterOptions.sortOptions.keys()[0]
            sortedType = sortAndFilterOptions.sortOptions.values()[0] === 1 ? '↑' : '↓'
        }

        // console.log(selectedParams, 'reeeeeeebon')

        let minBpm = 2000, maxBpm = 0
        resultTracks.map(track => {
            if (track.selected) {
                if (minBpm > track.bpm) minBpm = track.bpm
                if (maxBpm < track.bpm) maxBpm = track.bpm
            }
        })

        const data = {
            seed: {
                name: `${selectedParams.track.name}`,
                description: `${sortedBy ? `sorted by ${sortedBy} ${sortedType}. ` : ''}playlist made with Selecta`,
                type: 'seed',
                tracks: selectaTrackIds,
                // coverUrl: selectedTrack.album[0].imageUrl,
                // bpmRange: {from: selectedParams.params.},
                genres: selectedParams.track.genres,
                bpmRange: {
                    min: minBpm,
                    max: maxBpm
                }
            },
            spotifyTrackIds: spotifyTrackIds

        }
        createSeed(data)
        setResultTracks(null)
        setSelectedParams({fetch: false})

        if (selectedParams.createPreset) {
            // create preset
            const response = await createPreset(selectedParams.params)
            await mutatePresets([response.data.preset, 'add'])
        }

        navigate('/listen')
    }

    let activeTrackNum = 0
    if (resultTracks)
        resultTracks.map(track => track.selected ? activeTrackNum += 1 : 0)

    // const [swipedIndexes, setSwipedIndexes] = useState([])

    const [selectedIndex, setSelectedIndex] = useState()

    return (
        <Routes>
            <Route path='/' element={
                <>
                    <TopMenu>
                        <TopMenuCancel onClick={() => window.history.back()}>back</TopMenuCancel>
                        <TopMenuTitle>
                            {`${resultTracks ? activeTrackNum : 'loading'} ${resultTracks && resultTracks.length === 1 ? 'track' : 'tracks'}`}
                        </TopMenuTitle>
                    </TopMenu>
                    <ItemsContainerWithTopMenu style={{paddingBottom: '55px'}}>
                    {resultTracks && !resultTracks.length ?
                        <NoTracksContainer>
                    <DrawingNoTracksFound src={drawingNoTracksFound}/>
                    <ActionButton onClick={() => {navigate('/add/presets')}}>back</ActionButton>
                    </NoTracksContainer> :
                    <>
                        {resultTracks && resultTracks.map((track, i) => {
                            return (
                                <Track key={i}
                                       i={i}
                                       track={track}
                                       rightElem={'select'}
                                       playingAudioId={playingAudioId}
                                       setPlayingAudioId={setPlayingAudioId}
                                       setResultTracks={setResultTracks}
                                       setSelectedIndex={setSelectedIndex}
                                />
                            )
                        })}
                        <ActionButtonContainer>
                        <Fader/>
                        <ActionButton onClick={() => navigate('select')}>
                            <SelectaViewImage src={selectaViewIcon}/>
                        </ActionButton>
                        <ActionButton onClick={() => navigate('sort-and-filter')}>sort & filter</ActionButton>
                        <ActionButton onClick={()=>{postSeed()}}>save</ActionButton>
                        </ActionButtonContainer>
                    </>}
                    </ItemsContainerWithTopMenu>
                </>
            }/>
            <Route path={'/sort-and-filter'} element={
                <SortAndFilterPage setSortAndFilterOptions={setSortAndFilterOptions}
                                   sortAndFilterOptions={sortAndFilterOptions}
                                   resultTracks={resultTracks}
                                   setResultTracks={setResultTracks}
                                   selectedParams={selectedParams}
                />
            }/>
            <Route path="/select" element={
                <SelectContainer>
                    <TopMenu style={{position: 'absolute', top: 0, zIndex: 100}}>
                        <TopMenuCancel onClick={() => {navigate(-1)}}>back</TopMenuCancel>
                        <TopMenuTitle>select the tracks</TopMenuTitle>
                        <TopMenuNext onClick={() => {navigate(-1)}}>next</TopMenuNext>
                    </TopMenu>
                    <MobileCarousel resultTracks={resultTracks}
                                    setResultTracks={setResultTracks}
                                    selectedIndex={selectedIndex}
                                    // setSwipedIndexes={setSwipedIndexes}
                    />
                </SelectContainer>
            }/>
        </Routes>
    )
}