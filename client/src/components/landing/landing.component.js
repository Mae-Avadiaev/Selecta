import {StyledLanding, MainText, LoginWriting, HandWrittenCaptions} from "./mobileLandind.styles";
import {BrowserMainText, BrowserStyledLanding} from "./browserLanding.styles";
import { BrowserView, MobileView } from "react-device-detect";
import loginWriting from './../../images/login-writing.png'
import handWrittenCaptions from './../../images/hand-written-captions3.png'
import {SetupSuperHeader} from "../setup/setup.styles";

export const Landing = ({user}) => {

    // document.body.style.background = 'linear-gradient(rgba(190,93,59, 0.93), rgba(18,18,18, 0.93))'

    return (
        <>
            <MobileView>
                {!user ? <StyledLanding>
                    <LoginWriting src={loginWriting}/>
                    <MainText>Select your best Collection. Let's try!</MainText>
                    {/*<HandWrittenCaptions src={handWrittenCaptions}/>*/}
                </StyledLanding> :
                    <StyledLanding>
                        <SetupSuperHeader>Home</SetupSuperHeader>
                    </StyledLanding>
                }
            </MobileView>
            <BrowserView>
                <BrowserStyledLanding>
                    <BrowserMainText>Select your best Collection. Let's try!</BrowserMainText>
                </BrowserStyledLanding>
            </BrowserView>
        </>
    )
};