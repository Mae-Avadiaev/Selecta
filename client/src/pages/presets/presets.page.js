import {PresetsTextButton, StyledPresets, TagMenu} from "./presets.page.styles";
import {PlaylistHeader} from "../../components/seeds/mobileSeeds.styles";
import {
    Button,
    CirclePlusButton, CirclePlusButtonText,
    ItemsContainerWithSearchBar,
    ItemsContainerWithTopMenu,
    MobilePageContainer,
    RowFlexContainer,
    ScrollContainer,
    Search,
    TagButton,
    TopMenu,
    TopMenuCancel,
    TopMenuTitle,
    ItemsContainer
} from "../../app.styles";
import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {makeRequest} from "../../utils/requests";
import {Preset} from "../../components/preset/preset.component";
import {SearchBar} from "../../components/searchBar/searchBar.component";
import {useGetPresetsPaginated} from "../../hooks/requests/useGetPresetsPaginated";
import {Track} from "../../components/track/track.component";
import {Route, Routes, useNavigate, Outlet} from "react-router-dom";
import Page404 from "../404/404.page";
import {NewPresetPage} from "../newPreset/newPreset.page";


export const PresetsPage = ({selectedParams, setSelectedParams}) => {

    const navigate = useNavigate()

    const { data: presets, isLoading, error, refetch } = useGetPresetsPaginated()
    // console.log(presets)

    // const [content, setContent] = useState([])
    // const [tag, setTag] = useState()
    // const changeContent = (to) => {
    //     // setContent(presets[to])
    //     // setTag(to)
    // }

    // console.log(content, 'content')
    // console.log(presets ? presets: 0, 'ressssp')

    return (
        <Routes>
            <Route path='/' element={
                <>
                    {/*<SearchBar/>*/}
                    <ItemsContainer>
                        {presets && !presets.pages[0].data.presets.length ?
                            <h1>create a new preset</h1> :
                            presets && presets.pages.map((page, i) => {
                                page = page.data.presets
                                return page.map((preset, j) => {
                                    return (
                                        <Preset key={(i + 1) * (j + 1)} preset={preset}
                                            selectedParams={selectedParams} setSelectedParams={setSelectedParams}
                                        />
                                    )
                                })
                            })
                        }
                        <CirclePlusButton onClick={() => navigate('new')}>
                            <CirclePlusButtonText>+</CirclePlusButtonText>
                        </CirclePlusButton>
                    </ItemsContainer>
                </>
            }/>
            <Route path='/new' element={
                <NewPresetPage selectedParams={selectedParams} setSelectedParams={setSelectedParams}/>}
            />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}