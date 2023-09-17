import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const usePostTracks = () => {
    const navigate = useNavigate()
    const {openSnackbar} = useSnackbar();
    const queryClient = useQueryClient()

    const patchData = async (data) => await axios({
        method: 'POST',
        url: serverAddress + `/v1/tracks/`,
        data: {tracksData: data},
        withCredentials: true,
    })

    let {mutateAsync, isLoading, isError} = useMutation({
        mutationFn: patchData,
        onSuccess: (data) => {
            queryClient.setQueryData('search-track', data.data.tracks)
            console.log(data, 'poddata')
            // queryClient.invalidateQueries('likes-sources');
            // queryClient.invalidateQueries('liked-tracks');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't add a playlist to likes-sources. Try again!`, 'error');
        }
    })

    return {mutateAsync, isLoading, isError}
}