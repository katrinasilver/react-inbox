import React, { Component } from 'react';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import { FaReact } from 'react-icons/fa'
import axios from 'axios'

const url = 'http://localhost:8082/api/messages'
export default class Inbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
      ]
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
      return response.data

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="app">
        <header className="navbar navbar-default">
          <div className="container">
            <a href="/" className="navbar-brand"><FaReact />&nbsp; Inbox</a>
          </div>
        </header>

        <div className="container">
          <Toolbar />
          <MessageList getMessages={this.getMessages}/>
        </div>

      </div>
    );
  }
}
