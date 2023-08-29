import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useQuery} from "react-query";

export const useGetLikesSources = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + `/v1/me/likes-sources`,
        withCredentials: true,
    })

    let {data, error, isLoading} = useQuery(['likes-sources'], fetchData, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't load likes-sources. Try again!`, 'error');
        },
        staleTime: 2000,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
    });

    //unpack data
    data = data ? data.data['likesSources'] : null

    return {data, error, isLoading}
}