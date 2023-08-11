const Notification = ({ message, error }) => {
    if (message === null || message === "") {
        return null
    }

    const notificationColor = (error === false)
        ? 'green'
        : 'red'

    const NotificationStyle = {
        color: notificationColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={NotificationStyle}>
            {message}
        </div>
    )
}

export default Notification