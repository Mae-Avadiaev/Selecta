import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const usePatchPresets = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const patchData = async (args) => await axios({
        method: args[1] === 'add' ? 'PATCH' : 'DELETE',
        url: serverAddress + `/v1/me/presets`,
        params: {
            spotifyId: args[0]
        },
        withCredentials: true,
    })

    let {mutate, isLoading, isError} = useMutation({
        mutationFn: patchData,
        onSuccess: () => {
            queryClient.invalidateQueries('presets');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't patch user presets. Try again!`, 'error');
        }
    })

    return {mutate, isLoading, isError}
}