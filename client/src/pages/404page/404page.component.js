import {SetupSuperHeader} from "../../components/setup/setup.styles";
import {MobileView} from "react-device-detect";
import {Styled404} from "./mobile404.styles";

const Page404 = () => {
    return (
        <MobileView>
            <Styled404>
                <SetupSuperHeader>404</SetupSuperHeader>
                <br/>
                <h2>Can't find this page 😭</h2>
            </Styled404>
        </MobileView>

    )
}

export default Page404;