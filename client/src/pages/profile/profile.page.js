import {Button, MobilePageContainerColumn} from "../../app.styles";
import {useSignOut} from "../../hooks/auth/useSignOut";

export const ProfilePage = () => {

    const signOut = useSignOut()

    return (
        <MobilePageContainerColumn>
            <Button onClick={signOut}>log out</Button>
        </MobilePageContainerColumn>
    )
}