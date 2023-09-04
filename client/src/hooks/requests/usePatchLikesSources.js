import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const usePatchLikesSources = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const patchData = async (args) => await axios({
        method: args[1] === 'add' ? 'PATCH' : 'DELETE',
        url: serverAddress + `/v1/me/likes-sources`,
        params: {
            ...args[0]
        },
        withCredentials: true,
    })

    let {mutate, isLoading, isError} = useMutation({
        mutationFn: patchData,
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