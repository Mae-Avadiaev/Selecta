import {StyledAccount, AuthButton, LinkContainer, AuthText} from "./account.styles";
import spotifyLogo from "./../../images/spotify-logo.png"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {BrowserMainText} from "../landing/browserLanding.styles";
import {localIp, serverAddress} from "../../App";
import {MobileAuthButton, MobileStyledAccount} from "./mobileAccount.styles";
import { BrowserView, MobileView } from "react-device-detect";
import loginWriting from "../../images/login-writing.png";
import {LoginWriting} from "../landing/mobileLandind.styles";

const Account = (user) => {

    const paramsString = useLocation().search
    const navigate = useNavigate()

    // document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'


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
        <>
            <BrowserView>
                <StyledAccount>
                    {!user.displayName ? <>
                        <AuthText>Login with Spotify</AuthText>
                        <AuthButton src={spotifyLogo} onClick={()=>{window.location.href = `http://${localIp}:3000/auth/request-authorization`}}/>
                    </> : <>
                        <BrowserMainText>Welcome, {user.displayName}</BrowserMainText>
                    </>}
                </StyledAccount>
            </BrowserView>
            <MobileView>
                <MobileStyledAccount>
                    <LoginWriting src={loginWriting}/>
                    {!user.displayName ? <>
                        <AuthText>Login with Spotify</AuthText>
                        {/*<MobileAuthButton src={spotifyLogo} onClick={()=>{window.location.href = 'http://192.168.1.98:3000/auth/request-authorization'}}/>*/}
                    </> : <>
                        <BrowserMainText>Welcome, {user.displayName}</BrowserMainText>
                    </>}
                </MobileStyledAccount>
            </MobileView>
        </>

    );
};

export default Account;