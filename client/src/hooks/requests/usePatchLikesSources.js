import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const usePatchLikesSources = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const patchData = async (spotifyId) => await axios({
        method: 'PATCH',
        url: serverAddress + `/v1/me/likes-sources`,
        params: {
            spotifyId: spotifyId
        },
        withCredentials: true,
    })

    let {mutate, isLoading, isError} = useMutation(patchData, {
        onSuccess: () => {
            queryClient.invalidateQueries('likes-sources');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't add a playlist to likes-sources. Try again!`, 'error');
        }
    })

    return {mutate, isLoading, isError}
}