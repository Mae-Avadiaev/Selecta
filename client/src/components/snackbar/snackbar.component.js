import {NotificationText, StyledNotification} from "./snackbar.styles";


export const Snackbar = ({isActive, message, type}) => {

    return (
        <StyledNotification isActive={isActive}>
            <NotificationText type={type}>
                {type === 'error' ? 'ooops!' : 'done.'}&nbsp;
                <span>{message}</span>
            </NotificationText>
        </StyledNotification>
  )
}