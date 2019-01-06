import React from 'react'

const Message = ({ read, selected, starred, id, subject, handleChecked, handleStar }) => {
  return (
    // ${ selected ? "selected" : null }`
    selected ?
      <div className={`row message selected ${read ? "read" : "unread"} `} data-id={ id }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={!!selected} onChange={() => handleChecked(id)} />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred ? "fa-star" : "fa-star-o"}`} onClick={() => handleStar(id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <span className="muted-text">
            {subject}
          </span>
        </div>
      </div >
    :
    <div className={`row message ${read ? "read" : "unread"} `} data-id={id}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!selected} onChange={() => handleChecked(id)} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${starred ? "fa-star" : "fa-star-o"}`} onClick={() => handleStar(id)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="muted-text">
          {subject}
        </span>
      </div>
    </div >
  )
}

export default Message
