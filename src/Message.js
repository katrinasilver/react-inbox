import React from 'react'

const Message = ({read, selected, starred, id, subject, handleChecked, handleCommands}) => {
  return (
    <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : null}` } data-id={id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!selected} onChange={() => handleChecked(id)} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${starred ? "fa-star" : "fa-star-o"}`} onClick={() => handleCommands(id, 'star')}></i>
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
