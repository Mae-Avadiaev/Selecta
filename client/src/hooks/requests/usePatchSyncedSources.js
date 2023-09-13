import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const usePatchSyncedSources = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const patchData = async (args) => await axios({
        method: args[1] === 'add' ? 'PATCH' : 'DELETE',
        url: serverAddress + `/v1/me/synced-sources`,
        params: {_id: args[0]},
        withCredentials: true,
    })

    let {mutate, isLoading, isError} = useMutation({
        mutationFn: patchData,
        onSuccess: () => {
            // queryClient.invalidateQueries('likes-sources');
            // queryClient.invalidateQueries('liked-tracks');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't sync/unsync a source. Try again!`, 'error');
        }
    })

    return {mutate, isLoading, isError}
}