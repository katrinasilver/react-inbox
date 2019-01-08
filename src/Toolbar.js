import React, { Component } from 'react'

export default class Toolbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      labels: [
        { id: 1, value: 'Apply Label'},
        { id: 2, value: 'Remove Label'},
        { id: 3, value: 'dev' },
        { id: 4, value: 'personal' },
        { id: 5, value: 'gSchool' },
      ]
    }
  }

  handleChange = (target, type) => {
    this.props.handleLabels(target, type)
    this.setState({
      resetValue: ''
    })
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.findUnread()}</span>
            unread message(s)
          </p>

          <a href="/" className="btn btn-danger" onClick={(e) =>
            {
              e.preventDefault()
              this.props.showForm()
            }
          }>
            <i className={`fa ${this.props.composing === false ? "fa-plus" : "fa-minus"}`}></i>
          </a>

          <button className="btn btn-default"
          onClick={() => this.props.selectAll()}
          disabled={this.props.messageLength() === 0}>
            <i className={`fa ${this.props.selectIcons()}`} ></i>
          </button>

          <button className="btn btn-default"
          onClick={() => this.props.handleRead(true)}
          disabled={this.props.selectedLength() === 0}>
            Mark As Read
          </button>

          <button className="btn btn-default"
          onClick={() => this.props.handleRead(false)}
          disabled={this.props.selectedLength() === 0}>
            Mark As Unread
          </button>

          <select className="form-control label-select"
          onChange={(e) => this.handleChange(e.target.value, 'addLabel')}
          value={this.state.resetValue} disabled={this.props.selectedLength() === 0}>
            {
              this.state.labels.map(label => label.id !== 2 &&
                <option key={label.id} disabled={label.disabled}>{label.value}</option>
              )
            }
          </select>

          <select className="form-control label-select"
          onChange={(e) => this.handleChange(e.target.value, 'removeLabel')}
          value={this.state.resetValue} disabled={this.props.selectedLength() === 0}>
            {
              this.state.labels.map(label => label.id !== 1 &&
                <option key={label.id} disabled={label.disabled}>{label.value}</option>
              )
            }
          </select>

          <button className="btn btn-default" onClick={() => this.props.handleDelete()}
            disabled={this.props.selectedLength() === 0}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
