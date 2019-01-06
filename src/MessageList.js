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
      editing: false
    }
  }

  componentDidMount() { this.getMessages() }
  stateLength = () => this.state.messages.length
  findIds = () => this.state.messages.filter(message => message.selected).map(message => message.id)
  findUnread = (boolean) => this.state.messages.reduce((i, message) => message.read === boolean ?  1 + i : i, 0)

  getMessages = async () => {
    try {
      const response = await axios.get(url)
      this.setState({
        messages: response.data.map(messages => {
          return { ...messages, selected: false } // there's no request for this and it looks weird selected on mount
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  request = async (command, key = null, value = null) => {
    const id = this.findIds()
    try {
      await axios.patch(url, { command: command, messageIds: id.length > 0 ? id : [id], [key] : value })
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = () => this.request('delete')
  handleLabels = (label, type) => this.request(type, 'label', label)
  handleRead = (value) => {
    this.request('read', 'read', value)
  }

  clickRead = async (id) => {
    try {
      await axios.patch(url, { command: 'read', messageIds: [id], read: true })
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  // selected state doesn't persist when you star a message because it's not stored in the data
  handleStar = async (id) => {
    try {
      await axios.patch(url, { command: 'star', messageIds: [id] })
      this.getMessages()
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

  selectIcons = () => {
    let state = this.stateLength()
    let local = this.findIds().length

    return local === state ? "fa-check-square-o"
      : local < state && local > 0 ? "fa-minus-square-o"
        : local === 0 ? "fa-square-o" : null
  }

  selectAll = () => {
    let selected = this.findIds().length !== this.stateLength() ? true : false
    this.setState({
      messages: this.state.messages.map(message => {
        return { ...message, selected: selected }
      })
    })
  }

  render() {
    return (
      <div>
        <Toolbar
          selectAll={this.selectAll}
          selectIcons={this.selectIcons}
          findUnread={this.findUnread}
          handleRead={this.handleRead}
          handleLabels={this.handleLabels}
          handleDelete={this.handleDelete}
          stateLength={this.stateLength}
        />
        {
          this.state.messages.map(message =>
            <Message
              key={message.id} {...message}
              handleChecked={this.handleChecked}
              handleStar={this.handleStar}
              clickRead={this.clickRead}
              getMessages={this.getMessages}
            />
          )
        }
      </div>
    )
  }
}
