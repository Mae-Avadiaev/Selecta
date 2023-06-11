import {StyledAccount, AuthButton, LinkContainer, AuthText} from "./account.styles";
import spotifyLogo from "./../../images/spotify-logo.png"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {MainText} from "../home/home.styles";
import {serverAddress} from "../../App";

const Account = (user) => {

    const paramsString = useLocation().search
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (window.location.pathname.startsWith('/account/log-in')) {
    //
    //         //request user data
    //         fetch(serverAddress + '/user?code=' + paramsString.substring(6))
    //             .then((response) => response.json())
    //             .then((userData) => {
    //                 setDisplayName(userData.displayName)
    //                 setUserAvatarUrl(userData.avatarUrl)
    //                 // setUserSettings(userData.settings)
    //             })
    //
    //             .catch((err) => {
    //                 console.log(err.message)
    //             })
    //         navigate('/account')
    //     }
    // })

    return (
        <StyledAccount>
            {!user.displayName ? <>
                <AuthText>login with Spotify</AuthText>
                <AuthButton src={spotifyLogo} onClick={()=>{window.location.href = serverAddress + '/auth/request-authorization'}}/>
            </> : <>
                <MainText>Welcome, {user.displayName}</MainText>
            </>}
        </StyledAccount>
    );
};

export default Account;