import {TrackList} from "../trackList/trackList.component";
import {StyledLikesPage} from "./browserLikes.styles";
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";
import {serverAddress} from "../../App";
import {requestRefresh} from "../../utils/requests";
import {FireButton} from "../setup/setup.styles";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Likes = ({user}) => {

    document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/account")
    }, [])


    const debouncedRequestRefresh = useDebouncedCallback(async () => {
        return await requestRefresh();
    }, 3000);

    return (
        <StyledLikesPage>
            {/*<TrackList/>*/}

            <FireButton onClick={debouncedRequestRefresh}>R E F R E S H</FireButton>
        </StyledLikesPage>
    )
}