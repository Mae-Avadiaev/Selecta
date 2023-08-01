import {PageContainer, PagesContainer, PageTitle, StyledPageSwitcher, Underline} from "./pageSwitcher.styles";

export const PageSwitcher = ({pages, activeIndex, setActiveIndex}) => {
    console.log(activeIndex)
    return (
        <StyledPageSwitcher>
            <PagesContainer>
                {pages.map((page, i) =>
                    <PageContainer numberOfElements={pages.length}>
                        <PageTitle key={i} onClick={() => setActiveIndex(i)}>{page.name}</PageTitle>
                    </PageContainer>
                )}
            </PagesContainer>
            <Underline numberOfElements={pages.length} activeIndex={activeIndex}/>
        </StyledPageSwitcher>
    )
};