import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useQuery} from "react-query";

export const useGetSearchResults = (query) => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + `/v1/tracks/search`,
        params: {query},
        withCredentials: true,
    })

    let {data, error, isLoading} = useQuery(['search-query', query], fetchData, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't search tracks. Try again!`, 'error');
        },
        staleTime: 800,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        enabled: !!query,
    });

    //unpack data
    data = data ? data.data['tracks'] : null

    return {data, error, isLoading}
}