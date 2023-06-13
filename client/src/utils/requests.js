import {serverAddress} from "../App";
import axios from "axios";

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

    axios(options).then((response) => {
        console.log(response)
    });
}

export const getPlaylist = (type, id) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/playlist',
        params: {
            id: id ? id : null,
            type: type
        },
        withCredentials: true,
    }).catch((err) => {
        console.log(err)
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