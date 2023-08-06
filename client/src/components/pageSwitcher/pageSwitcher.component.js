import {PageContainer, PagesContainer, PageTitle, StyledPageSwitcher, Underline} from "./pageSwitcher.styles";

export const PageSwitcher = ({pages, activeIndex, setActiveIndex}) => {
    return (
        <StyledPageSwitcher>
            <PagesContainer>
                {pages.map((page, i) =>
                    <PageContainer key={i} numberOfElements={pages.length}>
                        <PageTitle onClick={() => setActiveIndex(i)}>{page.name}</PageTitle>
                    </PageContainer>
                )}
            </PagesContainer>
            <Underline numberOfElements={pages.length} activeIndex={activeIndex}/>
        </StyledPageSwitcher>
    )
};