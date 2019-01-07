import React from 'react'

const Message = ({ read, viewing, selected, labels, starred, id, subject, body, handleChecked, handleStar, clickToggleRead }) => {
  return (
    <div>
      <div className={`row message ${read ? "read" : "unread"} ${ selected && "selected" }`} data-id={id}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={selected} onChange={() => handleChecked(id)} />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred ? "fa-star" : "fa-star-o"}`} onClick={() => handleStar(id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={() => clickToggleRead(id)}>
          {
            labels.map(label =>
              <span className="label label-warning" key={label}>{label}</span>
            )
          }
          <span>
            {subject}
          </span>
        </div>
      </div>
      {
        viewing &&
          <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              {body}
            </div>
          </div>
      }
    </div>
  )
}

export default Message
