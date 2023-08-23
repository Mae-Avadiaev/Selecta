import {NotificationText, StyledNotification} from "./snackbar.styles";


export const Snackbar = ({options}) => {

    return (
        <StyledNotification isActive={options.isActive}>
            <NotificationText type={options.type}>
                {options.type === 'error' ? 'ooops!' : 'done.'}&nbsp;
                <span>{options.message}</span>
            </NotificationText>
        </StyledNotification>
  )
}