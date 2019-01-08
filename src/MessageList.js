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
      selected: {},
      composing: false
    }
  }

  componentDidMount() { this.getMessages() }

  findUnread = () => this.state.messages.reduce((i, message) => message.read === false ? 1 + i : i, 0)
  messageLength = (i = 0) => this.state.messages.length + i
  selectedMessage = () => Object.keys(this.state.selected).filter(id => this.state.selected[id] === true)
  selectedLength = () => this.selectedMessage().length
  selectedId = () => Object.keys(this.state.selected).filter(id => this.state.selected[id] === true && id )
  isSelected = (id) => this.state.selected[id] || false

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

  request = async (command, key = null, value = null) => {
    const id = this.selectedId()
    try {
      await axios.patch(url, { command: command, messageIds: id, [key] : value })
      this.getMessages()
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = () => this.request('delete')
  handleRead = (value) => this.request('read', 'read', value)
  handleLabels = (label, type) => this.request(type, 'label', label)

  clickToggleRead = async (id) => {
    try {
      await axios.patch(url, { command: 'read', messageIds: [id], read: true })
      this.setState({
        messages: this.state.messages.map(message => {
          return message.id === id ? { ...message, viewing: !message.viewing, read: true } : { ...message }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleStar = async (id) => {
    try {
      await axios.patch(url, { command: 'star', messageIds: [id] })
      this.setState({
        messages: this.state.messages.map(message => {
          return message.id === id ? { ...message, viewing: !!message.viewing, starred: !message.starred } : { ...message }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChecked = (id) => {
    if (this.state.selected.hasOwnProperty.id) {
      const selected = Object.keys(this.state.selected).reduce((acc, val) => {
        return val === id ? { ...acc, [id]: !this.state.selected[id]} : { ...acc, [id]: true }
      }, {})
      this.setState({ selected })
    }
    else {
      const selected = { ...this.state.selected, [id]: !this.state.selected[id] }
      this.setState({ selected })
    }
  }

  selectIcons = () => {
    let state = this.messageLength()
    let selected = this.selectedLength()

    return selected === state ? "fa-check-square-o"
      : selected < state && selected > 0 ? "fa-minus-square-o"
        : selected === 0 && "fa-square-o"
  }

  selectAll = () => {
    const ids = this.state.messages.map(({ id }) => id)
    const selected = ids.reduce((acc, id) => ({ ...acc, [id]: true }), {})

    this.setState({
      selected: this.selectedLength() === this.messageLength() ? {} : selected
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
          messageLength={this.messageLength}
          selectedMessage={this.selectedMessage}
          selectedLength={this.selectedLength}
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
            messageLength={this.messageLength}
            compose={this.compose}
          />
        }
        {
          this.state.messages.map(message =>
            <Message
              key={message.id}
              {...message}
              selected={this.isSelected(message.id)}
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
