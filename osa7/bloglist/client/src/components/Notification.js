import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

    if (props.notification) {
        const style = {
            color: props.notification.type === 'error' ? 'red' : 'green',
            borderStyle: 'solid',
            borderRadius: 5,
            font: 25,
            padding: 5,
            margin: 5
        }

        return (
            <div style={style} data-cy='notification'>
                {props.notification.message}
            </div>
        )
    }

    return null
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(
    mapStateToProps
)(Notification)

export default ConnectedNotification