import {
    DimmedPanel,
    PopupButton,
    PopupButtonCaption,
    PopupButtonSection,
    PopupCaption,
    PopupHeader,
    StyledPopup
} from "./popup.styles";
import {usePopup} from "../../hooks/usePopup";

export const Popup = ({options}) => {

    const {cancelPopup, confirmPopup} = usePopup()

    return (
        <>
            <DimmedPanel isActive={options.isActive}/>
            <StyledPopup isActive={options.isActive}>
                <PopupHeader>{options.content ? options.content.header : ''}</PopupHeader>
                <PopupCaption>{options.content ? options.content.caption : ''}</PopupCaption>
                <PopupButtonSection>
                    <PopupButton style={{'borderRight': 'white solid 1px'}}>
                        <PopupButtonCaption style={{'fontWeight': 'bold', color: '#6898ef'}} onClick={cancelPopup}>
                            {options.content ? options.content.safeButton : ''}
                        </PopupButtonCaption>
                    </PopupButton>
                    <PopupButton>
                        <PopupButtonCaption style={{color: '#fc6060'}} onClick={confirmPopup}>
                            {options.content ? options.content.actionButton: ''}
                        </PopupButtonCaption>
                    </PopupButton>
                </PopupButtonSection>
            </StyledPopup>
        </>
    )
}