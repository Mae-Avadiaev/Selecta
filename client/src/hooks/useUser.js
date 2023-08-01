import {makeRequest} from "../utils/requests";
import {useQuery} from "react-query";
import {useEffect} from "react";

export const useUser = () => {
    const { data: user } = useQuery(
        ['user'],
        makeRequest('GET', '/v1/me'),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            initialData: () => JSON.parse(localStorage.getItem('SELECTA-USER')),
            onError: () => {
                localStorage.removeItem('SELECTA-USER')
            }
        }
    );

    useEffect(() => {
        if (!user) localStorage.removeItem('SELECTA-USER')
        else localStorage.setItem('SELECTA-USER', user)
    }, [user]);

    return {user: user ?? null}

}