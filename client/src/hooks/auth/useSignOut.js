import {useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {makeRequest} from "../../utils/requests";

export const useSignOut = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const signOut = () => {
        queryClient.setQueryData(['user'], null)
        makeRequest('GET', '/auth/log-out')
        navigate('/')
    }

    return signOut
}