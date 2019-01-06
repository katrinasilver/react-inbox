import React from 'react'

const Message = ({ read, selected, labels, starred, id, subject, handleChecked, handleStar, clickRead }) => {
  return (
    <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : ""}`} data-id={id}>
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
      <div className="col-xs-11">
        {
          labels.map(label =>
            <span className="label label-warning" key={label}>{label}</span>
          )
        }
        <a href="/" onClick={(e) => {
            e.preventDefault()
            clickRead(id)
          }
        }>
          {subject}
        </a>
      </div>
    </div>
  )
}

export default Message
