import React from 'react'

const Notification = ({ store }) => {
    let style

    store.getState().notification ?
        style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        : style = { display: 'none' }

    return (
        <div style={style}>
            {store.getState().notification}
        </div>
    )
}

export default Notification