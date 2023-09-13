import {Button, MobilePageContainerColumn} from "../../app.styles";
import {useSignOut} from "../../hooks/auth/useSignOut";
import {useNavigate} from "react-router-dom";

export const ProfilePage = () => {

    const signOut = useSignOut()
    const navigate = useNavigate()

    return (
        <MobilePageContainerColumn>
            <Button onClick={() => navigate('/settings/likes-pool-sources')}>collection sources</Button>
            <br/><br/>
            <Button onClick={() => navigate('/settings/synced-sources')}>synced collection sources</Button>
            <br/><br/>
            <Button onClick={signOut}>log out</Button>
        </MobilePageContainerColumn>
    )
}