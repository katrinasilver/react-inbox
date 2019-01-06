import React, { Component } from 'react'
import Toolbar from './Toolbar'
import Message from './Message'
import Compose from './Compose'
import axios from 'axios'
const url = 'http://localhost:8082/api/messages'

export default class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      composing: false
    }
  }

  componentDidMount() { this.getMessages() }

  stateLength = (i = 0) => this.state.messages.length + i
  findIds = () => this.state.messages.filter(message => message.selected).map(message => message.id)
  findUnread = (boolean = false) => this.state.messages.reduce((i, message) => message.read === boolean ?  1 + i : i, 0)

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
  handleRead = (value) => this.request('read', 'read', value)

  clickToggleRead = async (id) => {
    try {
      // only making a separate request to set read to true when a user clicks, better UX
      await axios.patch(url, { command: 'read', messageIds: [id], read: true })
      this.setState({
        // using already received state data to make toggling possible
        messages: this.state.messages.map(message => {
          return message.id === id ? { ...message, viewing: !message.viewing, read: true } : { ...message }
        })
      })
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
        return message.id === id ? { ...message, selected: !message.selected } : { ...message }
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
    let selected = this.findIds().length !== this.stateLength() && true
    this.setState({
      messages: this.state.messages.map(message => {
        return { ...message, selected: selected }
      })
    })
  }

  showForm = () => {
    this.setState({
      composing: !this.state.composing
    })
  }

  compose = async (message) => {
    try {
      await axios.post(url, message)
      this.showForm()
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Toolbar
          composing={this.state.composing}
          stateLength={this.stateLength}
          findUnread={this.findUnread}
          handleDelete={this.handleDelete}
          handleLabels={this.handleLabels}
          handleRead={this.handleRead}
          selectIcons={this.selectIcons}
          selectAll={this.selectAll}
          showForm={this.showForm}
        />
        {
          this.state.composing &&
          <Compose
            stateLength={this.stateLength}
            compose={this.compose}
          />
        }
        {
          this.state.messages.map(message =>
            <Message
              key={message.id} {...message}
              getMessages={this.getMessages}
              clickToggleRead={this.clickToggleRead}
              handleStar={this.handleStar}
              handleChecked={this.handleChecked}
            />
          )
        }
      </div>
    )
  }
}
