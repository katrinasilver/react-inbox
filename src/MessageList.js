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
      viewing: false
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  stateLength = () => this.state.messages.length
  filtering = (method) => this.state.messages.filter(message => message[method])

  findIds = () => this.filtering('selected').map(message => message.id)
  findUnread = () => this.filtering('read').length

  getMessages = async () => {
    try {
      const response = await axios.get(url)
      this.setState({
        messages: response.data.map(messages => {
          return { ...messages, selected: false } // i know i shouldn't but loading messages for the first time with it selected looks weird
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async () => {
    let id = this.findIds()
    try {
      await axios.patch(url, { command: 'delete', messageIds: id.length > 1 ? id : [id] })
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

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
          handleDelete={this.handleDelete}
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
