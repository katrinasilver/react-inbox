import React, { Component } from 'react'

export default class Toolbar extends Component {

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.findUnread()}</span>
            unread message(s)
          </p>

          <a href="/" className="btn btn-danger" onClick={(e) => {
            e.preventDefault()
            this.props.showForm()
            }
          }>
            <i className={`fa ${this.props.composing === false ? "fa-plus" : "fa-minus"}`}></i>
          </a>

          <button className="btn btn-default" onClick={() => this.props.selectAll()} disabled={this.props.stateLength() === 0}>
            <i className={`fa ${this.props.selectIcons()}`} ></i>
          </button>

          <button className="btn btn-default" onClick={() => this.props.handleRead(true)} disabled={this.props.findUnread() === 0 || this.props.stateLength() === 0}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => this.props.handleRead(false)} disabled={this.props.findUnread(true) === 0 || this.props.stateLength() === 0}>
            Mark As Unread
          </button>

          <select className="form-control label-select" defaultValue="Apply Label" onChange={(e) => this.props.handleLabels(e.target.value, 'addLabel')} disabled={this.props.stateLength() === 0}>
            <option value="Apply Label" disabled>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" defaultValue="Remove Label" onChange={(e) => this.props.handleLabels(e.target.value, 'removeLabel')} disabled={this.props.stateLength() === 0}>
            <option value="Remove Label" disabled>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={() => this.props.handleDelete()} disabled={this.props.stateLength() === 0}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
