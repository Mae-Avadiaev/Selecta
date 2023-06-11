import {serverAddress} from "../App";
import axios from "axios";

export const createPlaylist = (data) => {

    const options = {
        method: 'POST',
        url: serverAddress + '/playlist',
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