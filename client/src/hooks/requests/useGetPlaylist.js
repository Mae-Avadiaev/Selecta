import {useQuery} from "react-query";
import {useSnackbar} from "../useSnackbar";
import {makeRequest} from "../../utils/requests";

export const useGetPlaylist = (id) => {
    const { openSnackbar } = useSnackbar();

    const {data, error, isLoading, } = useQuery([id],
        makeRequest('GET', `/v1/playlist/${id}`), {
            onSuccess: (data) => {
            },
            onError: (error) => {
                openSnackbar('Problems to load the playlist. Try again!', 'error');
            }
        });

    return {data, error, isLoading}
}