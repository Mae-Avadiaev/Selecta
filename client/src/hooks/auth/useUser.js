import {makeRequest} from "../../utils/requests";
import {useQuery} from "react-query";
import {useEffect} from "react";
import axios from "axios";
import {serverAddress} from "../../App";

export const useUser = () => {

    const fetchData = async () => await axios({
        method: 'GET',
        url: serverAddress + '/v1/me',
        withCredentials: true,
    })

    const { data: userData, refetch: fetchUser } = useQuery(
        ['user'],
        fetchData,
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            enabled: false,
            initialData: () => JSON.parse(localStorage.getItem('SELECTA-USER')),
            onError: () => {
                localStorage.removeItem('SELECTA-USER')
            }
        }
    );

    useEffect(() => {
        if (!userData) localStorage.removeItem('SELECTA-USER')
        else localStorage.setItem('SELECTA-USER', JSON.stringify(userData))
    }, [userData]);

    const user = userData && userData.data ? userData.data.data : null

    return {user, fetchUser}

}