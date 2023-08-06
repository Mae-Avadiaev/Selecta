import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {makeRequest} from "../../utils/requests";
import {useSnackbar} from "../useSnackbar";

export const useSignIn = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const { mutate: signInMutation } = useMutation(
        makeRequest('GET', '/v1/user/me'), {
            onSuccess: (data) => {
                queryClient.setQueryData(['user'], data)
                navigate('/listen/add/likes');
            },
            onError: (error) => {
                openSnackbar('Error on sign up. Try again!', 'error');
            }
        });

    return signInMutation
}