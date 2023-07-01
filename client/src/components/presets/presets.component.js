import {PresetsTextButton, StyledPresets, TagMenu} from "./presets.styles";
import {PlaylistHeader} from "../seeds/mobileSeeds.styles";
import {Button, PageContainer, RowFlexContainer, ScrollContainer, Search, TagButton} from "../../app.styles";
import {useEffect} from "react";
import {useQuery} from "react-query";
import {makeRequest} from "../../utils/requests";
import {Preset} from "../preset/preset.component";

export const Presets = () => {

    const { isLoading, data: presets, error, refetch } = useQuery(["presets"],
        () => makeRequest('GET', 'v1/presets/', null))



    // let presets

    return (
        <PageContainer style={{marginRight: 0, marginLeft: 0}}>
            <RowFlexContainer style={{margin: '20px 5% 0 5%'}}>
                <PlaylistHeader style={{fontSize: '1.6rem'}}>PRESETS</PlaylistHeader>
                <Button>Create</Button>
            </RowFlexContainer>
            <RowFlexContainer style={{margin: '15px 5%'}}>
                <Search type="text" />
                <PresetsTextButton>Search</PresetsTextButton>
            </RowFlexContainer>
            <RowFlexContainer style={{margin: '10px 5% 0 5%'}}>
                <TagButton>Pinned</TagButton>
                <TagButton>Recent</TagButton>
                <TagButton>by You</TagButton>
                <TagButton>by Selecta</TagButton>
            </RowFlexContainer>
            <ScrollContainer style={{height: 'calc(100% - 155px)', padding: '10px 0'}}>
                {/*{isLoading ? <h1>Loading...</h1> :*/}
                {/*    presets.map((preset) =>*/}
                {/*        <Preset preset={preset}/>*/}
                {/*    )*/}
                {/*}*/}
                <Preset/>
                <Preset/>
                <Preset/>
                <Preset/>
                <Preset/>
                <Preset/>
            </ScrollContainer>
        </PageContainer>
    )
}