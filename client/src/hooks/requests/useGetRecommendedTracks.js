import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useQuery, useQueryClient} from "react-query";

export const useGetRecommendedTracks = (params, isFetch) => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + `/v1/tracks/recommendations`,
        params: params,
        withCredentials: true,
    })

    let {data, error, isLoading, isSuccess} = useQuery(['recommendations'], fetchData, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('results');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't load results. Try again!`, 'error');
        },
        staleTime: 2000,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        enabled: isFetch
    });

    //unpack data
    data = data ? data.data['recommendations'] : null

    return {data, error, isLoading, isSuccess}
}