import React from 'react'

const Message = ({ id, subject }) => {
  return (
    <div className="row message unread" data-id={id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="muted-text">
          {subject}
        </span>
      </div>
    </div>
  )
}

export default Message
