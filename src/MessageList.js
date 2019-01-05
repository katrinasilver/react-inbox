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

  handleChecked = (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return message.id === id ? {...message, selected: !message.selected } : message
      })
    })
    console.log(this.state.messages);
  }

  handleStar = (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return message.id === id ? { ...message, starred: !message.starred } : message
      })
    })
  }

  getMessages = async () => {
    try {
      const response = await axios.get(url)
      this.setState({
        messages: response.data
      })
      return response.data

    } catch (err) {
      console.log(err)
    }
  }

  handleCommands = async (id, command) => {
    try {
      await axios.patch(url, { command: command, messageIds: [id]})
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Toolbar />
        {
          this.state.messages.map(message =>
            <Message
              key={message.id} {...message}
              handleChecked={this.handleChecked}
              handleCommands={this.handleCommands}
              getMessages={this.getMessages}
            />
          )
        }
      </div>
    )
  }
}
