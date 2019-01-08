import React, { Component } from 'react'

export default class Compose extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      body: ''
    }
  }

  makeId = () => {
    this.uniqueId = this.uniqueId || this.props.messageLength(1)
    return this.uniqueId++
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    let message = {
      id: +this.makeId(),
      subject: this.state.subject,
      body: this.state.body
    }

    this.setState({
      subject: '',
      body: ''
    })

    this.props.compose(message)
  }

  render() {
    return (
      <form className="form-horizontal well" onSubmit={(this.onSubmit)}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.onChange} value={this.state.subject} required/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" onChange={this.onChange} value={this.state.body} required></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    )
  }
}
