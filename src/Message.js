import React from 'react'

const Message = (props) => {
  return (
    <div>
      <div className={`row message ${props.read ? "read" : "unread"} ${ props.selected && "selected" }`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={props.selected} onChange={() => props.handleChecked(props.id)} />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${props.starred ? "fa-star" : "fa-star-o"}`} onClick={() => props.handleStar(props.id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={() => props.clickToggleRead(props.id)}>
          {
            props.labels.map(label => <span className="label label-warning" key={label}>{label}</span>)
          }
          <span>
            {props.subject}
          </span>
        </div>
      </div>
      {
        props.viewing &&
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {props.body}
          </div>
        </div>
      }
    </div>
  )
}

export default Message
