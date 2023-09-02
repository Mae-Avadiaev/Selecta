import {RowFlexContainer, Search} from "../../app.styles";
import {PresetsTextButton} from "../../pages/presets/presets.page.styles";

export const SearchBar = () => {
    return (
        <RowFlexContainer style={{margin: '15px 5%'}}>
            <Search type="text" />
            <PresetsTextButton>Search</PresetsTextButton>
        </RowFlexContainer>
    )
}