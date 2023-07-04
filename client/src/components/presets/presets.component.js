import {PresetsTextButton, StyledPresets, TagMenu} from "./presets.styles";
import {PlaylistHeader} from "../seeds/mobileSeeds.styles";
import {Button, MobilePageContainer, RowFlexContainer, ScrollContainer, Search, TagButton} from "../../app.styles";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {makeRequest} from "../../utils/requests";
import {Preset} from "../preset/preset.component";
import {useNavigate} from "react-router-dom";

export const Presets = () => {

    const navigate = useNavigate()

    const { isLoading, data, error, refetch } = useQuery(["presets"],
        () => makeRequest('GET', '/v1/presets/', null))

    const [content, setContent] = useState([])
    const [tag, setTag] = useState()
    const changeContent = (to) => {
        // setContent(presets[to])
        // setTag(to)
    }


    // const presetsRequestedRef = useRef(false)

    // useEffect(() => {
    //
    //     // suppress double request
    //     // if (presetsRequestedRef.current) return;
    //     //     presetsRequestedRef.current = true;
    //
    //     if (response) {
    //         if (presets.pinnedPresets) setContent(presets.pinnedPresets)
    //         else if (presets.recentPresets) setContent(presets.recentPresets)
    //         else setContent(presets.defaultPresets)
    //     }
    // }, [presets])
    // let presets

    console.log(content, 'content')
    console.log(data.data, 'ressssp')

    return (
        <MobilePageContainer style={{marginRight: 0, marginLeft: 0}}>
            <RowFlexContainer style={{margin: '20px 5% 0 5%'}}>
                <PlaylistHeader style={{fontSize: '1.6rem'}}>PRESETS</PlaylistHeader>
                <Button onClick={() => navigate('/seeds/presets/create')}>New</Button>
            </RowFlexContainer>
            <RowFlexContainer style={{margin: '15px 5%'}}>
                <Search type="text" />
                <PresetsTextButton>Search</PresetsTextButton>
            </RowFlexContainer>
            <RowFlexContainer style={{margin: '10px 5% 0 5%'}}>
                {/*<TagButton*/}
                {/*    current={tag === 'pinnedPreset'}*/}
                {/*    onClick={() => changeContent(presets['pinnedPresets'])}>Pinned</TagButton>*/}
                {/*<TagButton*/}
                {/*    current={tag === 'recentPresets'}*/}
                {/*    onClick={() => changeContent(presets['recentPresets'])}>Recent</TagButton>*/}
                {/*<TagButton*/}
                {/*    current={tag === 'userPresets'}*/}
                {/*    onClick={() => changeContent(presets['userPresets'])}>by You</TagButton>*/}
                {/*<TagButton*/}
                {/*    current={tag === 'defaultPresets'}*/}
                {/*    onClick={() => changeContent(presets['defaultPresets'])}>by Selecta</TagButton>*/}
            </RowFlexContainer>
            <ScrollContainer style={{height: 'calc(100% - 155px)', padding: '10px 0'}}>
                {isLoading ? <h1>Loading...</h1> :
                    content.map((preset) =>
                        <Preset preset={preset}/>
                    )
                }
                {/*<Preset/>*/}
                {/*<Preset/>*/}
                {/*<Preset/>*/}
                {/*<Preset/>*/}
                {/*<Preset/>*/}
                {/*<Preset/>*/}
            </ScrollContainer>
        </MobilePageContainer>
    )
}