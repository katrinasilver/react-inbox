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
      composing: false,
      selected: {}
    }
  }

  componentDidMount() { this.getMessages() }

  findAll = (method, boolean) => this.state.messages.reduce((i, message) => message[method] === boolean ? 1 + i : i, 0)
  stateLength = (i = 0) => this.state.messages.length + i
  findId = () => this.state.messages.filter(message => message.selected).map(message => message.id)
  selectedLength = () => this.findAll('selected', true)
  findUnread = () => this.findAll('read', false)

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
    const id = this.findId()
    try {
      await axios.patch(url, { command: command, messageIds: id.length > 0 ? id : [id], [key] : value })
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
    let selected = {}
    if (this.state.selected.hasOwnProperty.id) {
      selected = Object.keys(this.state.selected).reduce((acc, ele) => {
        return ele === id ? { ...acc, [id]: !this.state.selected[id]} : { ...acc, [id]: true }
      }, {})
    }
    else {
      selected = { ...this.state.selected, [id]: !this.state.selected[id] }
    }
    this.setState({ selected })

    // this.setState({
    //   messages: this.state.messages.map(message => {
    //     return message.id === id ? { ...message, selected: !message.selected } : { ...message }
    //   })
    // })
  }

  selectIcons = () => {
    let state = this.stateLength()
    let local = this.selectedLength('selected', true)

    return local === state ? "fa-check-square-o"
      : local < state && local > 0 ? "fa-minus-square-o"
        : local === 0 ? "fa-square-o" : null
  }

  selectAll = () => {
    // let selection = this.selectedLength('selected', true) !== this.stateLength() && true
    // // if (selection) {
    //   this.setState({
    //     messages: this.state.messages.map(message => {
    //       return {...message, selected: message.selected }
    //     })
    //   })
    // }
    const selected = Object.keys(this.state.selected).map(ele => {
      return { ele: true }
    })
    console.log({selected})
    this.setState({ selected: true })
  }

  showForm = (e) => {
    e.preventDefault()
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

  isSelected = (id) => {
    return this.state.selected[id] || false
  }

  render() {
    return (
      <div>
        <Toolbar
          composing={this.state.composing}
          stateLength={this.stateLength}
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
            stateLength={this.stateLength}
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
