import {SeedsPageItemCaption, SeedsPageItemPreview, StyledSeedsPageItem} from "./seedsPageItem.styles";

export const SeedsPageItem = ({image, caption}) => {
    return (
        <StyledSeedsPageItem>
            <SeedsPageItemPreview src={image} alt=""/>
            <SeedsPageItemCaption>{caption}</SeedsPageItemCaption>
        </StyledSeedsPageItem>
    )
}