import React, { Component } from 'react';
import MessageList from './MessageList'
import { FaReact } from 'react-icons/fa'

/*
Ask instructors:
  - select resets after you apply or remove a label
  - how to clean the state of the labels so they go back to the default value
*/
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
