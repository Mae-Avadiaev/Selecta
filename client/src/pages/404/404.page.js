import {SetupSuperHeader} from "../../components/setup/setup.styles";
import {MobileView} from "react-device-detect";
import {Drawing404, DrawingCantFind, Styled404} from "./404.styles";
import drawing404 from "../../images/404.png"
import drawingCantFind from "../../images/cant-find-this-page.png"

const Page404 = () => {
    return (
        <MobileView>
            <Styled404>
                {/*<SetupSuperHeader>404</SetupSuperHeader>*/}
                <Drawing404 src={drawing404}/>
                {/*<DrawingCantFind src={drawingCantFind}/>*/}
                {/*<br/>*/}
                <h2>can't find this page 😭</h2>
            </Styled404>
        </MobileView>

    )
}

export default Page404;