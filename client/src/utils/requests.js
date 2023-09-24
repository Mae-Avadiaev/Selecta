import {serverAddress} from "../App";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../hooks/useSnackbar";

export const createPlaylist = (data, navigate) => {

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

    return axios(options).catch((err) => {
        // console.log(response)
        if (err.response.data && err.response.data.code === 401) navigate("/account")

    });
}

export const requestAuthorization = () => {
    axios.get('auth/request-authorization').catch(function (error) {
        console.log(error, 'yeeeee');
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
        // console.log(err.response)
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });

    // return axios.get('auth/me').then(function (response) {
    //     console.log(response);
    // })

}

export const addToSimilar = (tracks, navigate) => {

    const tracksIds = tracks.map(track => track.id)

    return axios({
        method: 'PATCH',
        url: serverAddress + '/v1/playlist/tracks',
        params: {tracksSpotifyIds: tracksIds, type: 'similar'},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });
}

export const postQueues = (tracks, navigate) => {

    const tracksIds = tracks.map((track) => track._id)

    return axios({
        method: 'POST',
        url: serverAddress + '/v1/tracks/queues',
        params: {tracksIdsToSort: tracksIds, type: 'queues'},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });

}

export const deleteSimilar = (tracks, navigate) => {

    const tracksIds = tracks.map((track) => track._id)

    return axios({
        method: 'DELETE',
        url: serverAddress + '/v1/tracks/similar',
        params: {toDeleteTracksIds: tracksIds, type: 'similar'},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });
}

export const getSimilar = (tracks, navigate) => {

    // console.log(tracks)
    const tracksIds = tracks ? tracks.map((track) => track._id ? track._id : track.id) : undefined

    // console.log(tracksIds, 'idddddddddddddddddddddds')

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/playlist/similar',
        params: {newTracksIds: tracksIds, type: 'similar'},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });
}

export const getTracksInfo = (tracksIds, navigate) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/tracks/',
        params: {tracks: tracksIds},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });

}

export const getTracksAudioFeatures = (tracksIds, navigate) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/tracks/audio-features',
        params: {tracks: tracksIds},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });

}

export const getRecommendations = (requestParams, navigate) => {

    return axios({
        method: 'GET',
        url: serverAddress + '/v1/tracks/recommendations',
        params: {params: requestParams},
        withCredentials: true,
    }).catch((err) => {
        console.log(err, "hey")
        if (err.response.data && err.response.data.code === 401) navigate("/account")
    });

}

// export const makeRequest = (method, endPoint, params, navigate, body) => {
//
//     return axios({
//         method: method,
//         url: serverAddress + endPoint,
//         params: {...params},
//         data: {...body},
//         withCredentials: true,
//     }).catch((err) => {
//         if (err.response.data && err.response.data.code === 401) navigate("/")
//     });
// }


export const requestRefresh = () => {
    console.log('req')

    return  axios({
        method: 'GET',
        url: serverAddress + '/v1/tracks/similar',
        params: {type: 'seeds', limit: 20},
        withCredentials: true
    }).catch((err) => console.log(err))
}

export const makeRequest = async (method, endPoint, navigate, openSnackbar, message, params, body) => {

    return await axios({
        method: method,
        url: serverAddress + endPoint,
        params: {...params},
        data: {...body},
        withCredentials: true,
    }).catch((err) => {
        if (err.response.data && err.response.data.code === 401) navigate("/")
        else openSnackbar(message, 'error')
    });
}