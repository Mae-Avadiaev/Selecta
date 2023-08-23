import {useQuery} from "react-query";
import {useSnackbar} from "../useSnackbar";
import {makeRequest} from "../../utils/requests";
import axios from "axios";
import {serverAddress} from "../../App";
import {useNavigate} from "react-router-dom";

export const useGetUserPlaylists = (type) => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const fetchData = async () => await axios({
            method: 'GET',
            url: serverAddress + `/v1/me/${type}`,
            withCredentials: true,
    })

    let {data, error, isLoading} = useQuery([type], fetchData, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't load ${type}. Try again!`, 'error');
        },
        staleTime: 2000
        });

    //unpack data
    let convertedType
    if (type === 'spotify-playlists')
        convertedType = 'spotifyPlaylists'
    else
        convertedType = type

    data = data ? data.data[convertedType] : null

    return {data, error, isLoading}
}