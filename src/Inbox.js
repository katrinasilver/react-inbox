import React, { Component } from 'react';
import MessageList from './MessageList'
import { FaReact } from 'react-icons/fa'

export default class Inbox extends Component {
  render() {
    return (
      <div className="app">
        <header className="navbar navbar-default">
          <div className="container">
            <a href="/" className="navbar-brand"><FaReact />&nbsp; Inbox</a>
          </div>
        </header>

        <div className="container">
          <MessageList />
        </div>
      </div>
    )
  }
}
