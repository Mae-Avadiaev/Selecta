import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useMutation, useQueryClient} from "react-query";

export const useCreatePreset = () => {
    const navigate = useNavigate()
    const {openSnackbar} = useSnackbar()
    const queryClient = useQueryClient()

    const postData = async (params) => await axios({
        method: 'POST',
        url: serverAddress + `/v1/preset/`,
        params: params,
        withCredentials: true,
    })

    let {data, mutate, mutateAsync, isLoading, isError, isSuccess} = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            queryClient.invalidateQueries('preset');
            queryClient.invalidateQueries('presets')
            openSnackbar(`preset created`, 'success')
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`can't create a preset. Try again!`, 'error');
        }
    })

    return {data, mutate, mutateAsync, isLoading, isError, isSuccess}
}