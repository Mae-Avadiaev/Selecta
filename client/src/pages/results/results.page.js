import {ActionButton, ItemsContainer, ActionButtonContainer} from "../../app.styles";
import {Track} from "../../components/track/track.component";
import {useNavigate} from 'react-router-dom'

export const ResultsPage = ({resultTracks}) => {

    const navigate = useNavigate()

    console.log(resultTracks, 'fiiiiiiiiiiiiin')

    return (
        <>
            <ItemsContainer>
                {resultTracks && !resultTracks.length ?
                    <>
                        <h1>no tracks found</h1>
                        <ActionButton onClick={() => {navigate('/add/presets')}}>back</ActionButton>
                    </> :
                    resultTracks && resultTracks.map((track, i) => {
                        return (
                            <Track key={i} track={track} button={'info'}/>
                        )
                    })
                }
                <ActionButtonContainer>
                    <ActionButton onClick={()=>{}}>select</ActionButton>
                    <ActionButton onClick={()=>{}}>sort</ActionButton>
                    <ActionButton onClick={()=>{}}>next</ActionButton>
                </ActionButtonContainer>
            </ItemsContainer>
        </>
    )
}