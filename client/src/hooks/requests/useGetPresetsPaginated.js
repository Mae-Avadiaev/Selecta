import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../useSnackbar";
import axios from "axios";
import {serverAddress} from "../../App";
import {useInfiniteQuery} from "react-query";

export const useGetPresetsPaginated = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const LIMIT = 50
    const fetchData = async (pageParam) => await axios({
        method: 'GET',
        url: serverAddress + `/v1/me/presets`,
        params: {
            offset: (pageParam - 1) * LIMIT,
            limit: LIMIT
        },
        withCredentials: true,
    })

    let { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['presets'], ({pageParam = 1}) => fetchData(pageParam), {
            getNextPageParam: (lastPage, allPages) => {
                lastPage = lastPage.data['presets']
                return lastPage.length >= LIMIT ? allPages.length + 1 : undefined
            },
            onSuccess: (data) => {
            },
            onError: (error) => {
                if (error.response.status === 401)
                    navigate('/')
                else
                    openSnackbar(`Can't load likes. Try again!`, 'error');
            },
            staleTime: 2000,
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,

        });

    return {data, hasNextPage, fetchNextPage}
}