import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useQuery, useQueryClient} from "react-query";

export const useGetRecommendedTracks = (params, isFetch, setSelectedParams) => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    console.log(isFetch, 'fi')

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + `/v1/tracks/recommendations`,
        params: params,
        withCredentials: true,
    })

    let {data, error, isLoading, isSuccess} = useQuery(['recommendations'], fetchData, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('results');
            setSelectedParams(prevState => { return {
                ...prevState,
                fetch: false
            }})
        },
        onError: (error) => {
            setSelectedParams(prevState => { return {
                ...prevState,
                fetch: false
            }})
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't load results. Try again!`, 'error');
        },
        staleTime: 2000,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        enabled: isFetch,
        retry: false
    });

    //unpack data
    data = data ? data.data['recommendations'] : null

    return {data, error, isLoading, isSuccess}
}