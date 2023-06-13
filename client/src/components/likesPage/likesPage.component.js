import {TrackList} from "../trackList/trackList.component";
import {StyledLikesPage} from "./likesPage.styles";
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";
import {serverAddress} from "../../App";
import {requestRefresh} from "../../utils/requests";
import {FireButton} from "../setup/setup.styles";

export const LikesPage = () => {

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