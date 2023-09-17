import {RowFlexContainer, Search, SearchBox} from "../../app.styles";
import {PresetsTextButton} from "../../pages/presets/presets.page.styles";
import Turnstone from 'turnstone'
import {useState} from "react";
import {useGetSearchResults} from "../../hooks/requests/useGetSearchResults";


export const SearchBar = ({setSearchQuery, setIsFetch}) => {

    const handleInputChange = (e) => {
        if (e.target.value === '')
            setSearchQuery(null)
        else
            setSearchQuery(e.target.value)
    }

    return (
        <RowFlexContainer style={{margin: '15px 5%'}}>
            <SearchBox/>
            <Search type="text" onChange={(e) => handleInputChange(e)}/>
            <PresetsTextButton>Search</PresetsTextButton>
        </RowFlexContainer>
    )
}