import {useQuery} from "react-query";
import {useSnackbar} from "../useSnackbar";
import {makeRequest} from "../../utils/requests";
import axios from "axios";
import {serverAddress} from "../../App";
import {useNavigate} from "react-router-dom";

export const useGetPlayingTrack = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + `/v1/tracks/playing`,
        withCredentials: true,
    })

    let {data, error, isLoading} = useQuery(['playing-track'], fetchData, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't load playing track. Try again!`, 'error');
        },
        staleTime: 2000,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
    });

    //unpack data
    data = data ? data.data['playingTrack'] : null

    return {data, error, isLoading}
}