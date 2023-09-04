
export const useCreatePreset = () => {
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const postData = async (params) => await axios({
        method: 'POST',
        url: serverAddress + `/v1/preset/`,
        params: {
            ...params
        },
        withCredentials: true,
    })

    let {mutate, isLoading, isError} = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries('preset');
        },
        onError: (error) => {
            if (error.response.status === 401)
                navigate('/')
            else
                openSnackbar(`Can't create a preset. Try again!`, 'error');
        }
    })

    return {mutate, isLoading, isError}
