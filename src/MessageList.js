import React, { Component } from 'react'
import Toolbar from './Toolbar'
import Message from './Message'
import axios from 'axios'
const url = 'http://localhost:8082/api/messages'

export default class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      editing: false,
      viewing: false,
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages = async () => {
    try {
      const response = await axios.get(url)
      this.setState({
        messages: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChecked = (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return message.id === id ? { ...message, selected: !message.selected } : message
      })
    })
  }

  findSelected = () => this.state.messages.filter(message => message.selected).map(message => message.id)

  handleStar = async (id) => {
    try {
      await axios.patch(url, { command: 'star', messageIds: [id]})
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  selectAll = () => {
    if (this.findSelected().length !== this.state.messages.length) {
      this.setState({
        messages: this.state.messages.map(message => {
          return { ...message, selected: true }
        })
      })
    } else {
      this.setState({
        messages: this.state.messages.map(message => {
          return { ...message, selected: false }
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Toolbar
          selectAll={this.selectAll}
        />
        {
          this.state.messages.map(message =>
            <Message
              key={message.id} {...message}
              handleChecked={this.handleChecked}
              handleStar={this.handleStar}
              getMessages={this.getMessages}
            />
          )
        }
      </div>
    )
  }
}
