import React, { Component } from 'react'
import Message from './Message'

export default class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      checked: false,
      starred: false
    }
  }
  componentDidMount() {
    this.showMessage()
  }

  showMessage = async () => {
    try {
      const message = await this.props.getMessages()
      this.setState({
        messages: message
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        {
          this.state.messages.map(message =>
            <Message
              key={message.id} {...message}
            />
          )
        }
      </div>
    )
  }
}
