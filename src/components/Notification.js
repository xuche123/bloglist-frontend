import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    if (message.includes('error')) {
      return (
        <div className="notification error">
          {message}
        </div>
      )
    }
    else {
      return (
        <div className="notification success">
          {message}
        </div>
      )
    }
  }
}

export default Notification
