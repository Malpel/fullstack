import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {

    if (notification) {
        const style = {
            color: notification.type === 'error' ? 'red' : 'green',
            borderStyle: 'solid',
            borderRadius: 5,
            font: 25,
            padding: 5,
            margin: 5
        }

        if (notification.type === 'error') {
            return (
                <div style={style}>
                    {notification.message}
                </div>
            )
        } else {
            return (
                <div style={style}>
                    {notification.message}
                </div>
            )
        }
    } else {
        return null
    }
}

Notification.propTypes = {
    notification: PropTypes.object
}

export default Notification