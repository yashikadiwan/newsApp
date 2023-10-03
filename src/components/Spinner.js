import React, { Component } from 'react'
import load from './load.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={load} alt="" className="src" />
     
      </div>
    )
  }
}
