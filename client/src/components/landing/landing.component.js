import {StyledLanding, MainText, LoginWriting, HandWrittenCaptions} from "./landing.styles"
import {BrowserMainText, BrowserStyledLanding} from "./browserLanding.styles";
import { BrowserView, MobileView } from "react-device-detect";
import loginWriting from './../../images/login-writing.png'
import handWrittenCaptions from './../../images/hand-written-captions3.png'
import {SetupSuperHeader} from "../setup/setup.styles";
import {Button} from "../../app.styles";
import {localIp} from "../../App";

export const Landing = ({user, setError}) => {

    // document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    return (
        <>
            <MobileView>
                <StyledLanding>
                    <h1>find similar tracks, see tracks' information, sort likes and more</h1>
                    <Button onClick={()=>{window.location.href = `http://${localIp}:3000/auth/request-authorization`}}>log in with Spotify</Button>
                    {/*<Button onClick={()=>{setError(prevState => {return {...prevState, triggered: true}})}}>log in with Spotify</Button>*/}
                </StyledLanding>
            </MobileView>
            {/*<BrowserView>*/}
            {/*    <BrowserStyledLanding>*/}
            {/*        <BrowserMainText>Select your best Collection. Let's try!</BrowserMainText>*/}
            {/*    </BrowserStyledLanding>*/}
            {/*</BrowserView>*/}
        </>
    )
};