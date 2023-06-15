import {serverAddress} from "../App";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const createPlaylist = (data) => {

    const options = {
        method: 'POST',
        url: serverAddress + '/v1/playlist',
        data: {
            name: data.name,
            description: data.description,
            coverUrl: data.coverUrl,
            public: data.public,
            type: data.type,
            rules: data.rules
        },
        withCredentials: true,
    }

    axios(options).catch((err) => {
        // console.log(response)
        if (err.response.data && err.response.data.code === 401) navigate("/account")

    });
}


export const getPlaylist = (type, id, navigate) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/playlist',
        params: {
            id: id ? id : null,
            type: type
        },
        withCredentials: true,
    }).catch((err) => {
        // console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });
}

export const getSimilar = (tracks) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/playlist/similar',
        params: {
            id: id ? id : null,
            type: type
        },
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });
}

export const requestRefresh = () => {
    console.log('req')

    return  axios({
        method: 'GET',
        url: serverAddress + '/v1/tracks/similar',
        params: {type: 'seeds', limit: 20},
        withCredentials: true
    }).catch((err) => console.log(err))
}