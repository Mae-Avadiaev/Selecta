import {SetupSuperHeader} from "../setup/setup.styles";
import {MobileView} from "react-device-detect";
import {MobilePageContainerColumn} from "./mobile404.styles";

const Page404 = () => {
    return (
        <MobileView>
            <MobilePageContainerColumn>
                <SetupSuperHeader>404</SetupSuperHeader>
                <br/>
                <h1>Can't find this page 😭</h1>
            </MobilePageContainerColumn>
        </MobileView>

    )
}

export default Page404;