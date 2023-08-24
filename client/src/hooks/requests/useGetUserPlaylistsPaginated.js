import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useInfiniteQuery, useQuery} from "react-query";

export const useGetUserPlaylistsPaginated = (type) => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const LIMIT = 50
    const fetchData = async (pageParam) => await axios({
            method: 'GET',
            url: serverAddress + `/v1/me/${type}`,
            params: {
                page: pageParam,
                limit: LIMIT
            },
            withCredentials: true,
        })

    let { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        [type], ({pageParam = 1}) => fetchData(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            lastPage = lastPage.data.spotifyPlaylists
            return lastPage.length === LIMIT ? allPages.length + 1 : undefined
        },
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

    // console.log(data, 'kreng')

    // data = data ? data[convertedType] : null
    //
    // console.log(data, 'bbbbbbbbbbbbbbb')

    return {data, isSuccess, hasNextPage, fetchNextPage}
}