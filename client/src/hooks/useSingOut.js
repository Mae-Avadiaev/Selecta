import {useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";

export const useSingOut = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onSignOut = useCallback(() => {
        queryClient.setQueryData([QUERY_KEY.user], null);
        navigate('/auth/sign-in');
    }, [navigate, queryClient])

    return onSignOut
}