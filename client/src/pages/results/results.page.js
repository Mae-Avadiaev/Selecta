import {ActionButton, ItemsContainer, ActionButtonContainer, Fader, ColumnFlexContainer} from "../../app.styles";
import {Track} from "../../components/track/track.component";
import {useNavigate} from 'react-router-dom'
import {useSlidingWindow} from '../../hooks/useSlidingWindow'
import {AddButton, ButtonsContainer, OptionsContainer} from "../../components/seeds/mobileSeeds.styles";
import React, {useState} from "react";
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

export const ResultsPage = ({resultTracks}) => {

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
    const [sortingAndFilteringOptions, setSortingAndFilteringOptions] = useState({params: undefined})

    const handleChange = (e, id) => {

        const name = `sorting${id}`
        setSortingAndFilteringOptions(prevState => { return {
            ...prevState,
            sortOptions: e.target.value
        }})
    }

    const applySortingAndFiltering = (options) => {
        // sort
        // resultTracks.sort((a, b) => a[options.])
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
                                        <SortingOptionsSelect onChange={(e) => handleChange(e, 1)}>
                                            <option value='none'>none</option>
                                            <option value='bpm'>by bpm </option>
                                            <option value='energy'>by energy</option>
                                            <option value='releaseDate'>by release date</option>
                                            <option value='popularity'>by popularity</option>
                                            <option value='danceability'>by danceability</option>
                                            <option value='instrumentalness'>by vocalness</option>
                                            <option value='valence'>by cheerfulness</option>
                                            <option value='acousticness'>by acousticness</option>
                                        </SortingOptionsSelect>
                                        <SortingOptionsSelect>
                                            <option>↑</option>
                                            <option>↓</option>
                                        </SortingOptionsSelect>
                                    </SortingOptionsContainer>
                                </SortingContainer>
                                <SortingContainer>
                                    <SortingHeader>filter</SortingHeader>
                                    <RangeSlider
                                        minCaption='old'
                                        maxCaption='new'
                                        param={0}
                                        setSelectedParam={setSortingAndFilteringOptions}
                                        paramName='Year'
                                    />
                                </SortingContainer>
                            </>,
                            () => applySortingAndFiltering(sortingAndFilteringOptions)
                        )}}>sort & filter</ActionButton>
                        <ActionButton onClick={()=>{}}>save</ActionButton>
                    </ActionButtonContainer>
                </>}
            </ItemsContainer>
        </>
    )
}