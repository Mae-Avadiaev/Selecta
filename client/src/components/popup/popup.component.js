import {
    PopupButton,
    PopupButtonCaption,
    PopupButtonSection,
    PopupCaption,
    PopupHeader,
    StyledPopup
} from "./popup.styles";

export const Popup = () => {
    return (
        <StyledPopup>
            <PopupHeader>are you sure?</PopupHeader>
            <PopupCaption>do you want to delete this playlist containing 20 tracks?</PopupCaption>
            <PopupButtonSection>
                <PopupButton style={{'border-right': 'white solid 1px'}}>
                    <PopupButtonCaption style={{'font-weight': 'bold', color: 'cornflowerblue'}}>cancel</PopupButtonCaption>
                </PopupButton>
                <PopupButton>
                    <PopupButtonCaption style={{color: '#fc6060'}}>delete</PopupButtonCaption>
                </PopupButton>
            </PopupButtonSection>
        </StyledPopup>
    )
}