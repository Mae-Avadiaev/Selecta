import {ActionButton, ItemsContainer} from "../../app.styles";
import {Track} from "../../components/track/track.component";

export const ResultsPage = (resultTracks) => {
    return (
        <>
            <ItemsContainer>
                {resultTracks && !resultTracks.length ?
                    <h1>No results</h1> :
                    resultTracks && resultTracks.map(track => {
                        return (
                            <Track track={track} button={'info'}/>
                        )
                    })
                }
            </ItemsContainer>
            <ActionButton onClick={()=>{}}>select</ActionButton>
            <ActionButton onClick={()=>{}}>sort</ActionButton>
            <ActionButton onClick={()=>{}}>next</ActionButton>
        </>
    )
}