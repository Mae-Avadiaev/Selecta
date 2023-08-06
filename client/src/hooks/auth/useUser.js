import {makeRequest} from "../../utils/requests";
import {useQuery} from "react-query";
import {useEffect} from "react";

export const useUser = () => {
    const { data: user, refetch: fetchUser } = useQuery(
        ['user'],
        async () => await makeRequest('GET', '/v1/me'),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            enabled: false,
            initialData: () => localStorage.getItem('SELECTA-USER'),
            onError: () => {
                localStorage.removeItem('SELECTA-USER')
            }
        }
    );

    useEffect(() => {
        if (!user) localStorage.removeItem('SELECTA-USER')
        else localStorage.setItem('SELECTA-USER', JSON.stringify(user))
    }, [user]);

    return {user, fetchUser}

}