import React from 'react'

const Message = ({read, selected, id, subject, handleChecked}) => {
  return (
    <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : null}` } data-id={id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!selected} onChange={() => handleChecked(id)} />
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
