import React from 'react'

const Notification = ({ message, type }) => {
    const successStyle = {
      color: 'green',
      borderStyle: 'solid',
      borderRadius: 5,
      font: 25,
      padding: 5,
      margin: 5
    }
  
    const errorStyle = {
      color: 'red',
      borderStyle: 'solid',
      borderRadius: 5,
      font: 25,
      padding: 5,
      margin: 5
    }
  
    if (message === null) {
      return null
    } else if (type === 'error') {
      console.log('Error!')
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    } else {
      return (
        <div style={successStyle}>
          {message}
        </div>
      )
    }
  }

  export default Notification