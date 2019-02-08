import React, { Component } from 'react'
import Axios from 'axios';

export default class Dashboard extends Component {

  state={
    visible: true,
    filename: ''
  }

  newProject(){
    
  }

  submitNewProject(){
    Axios({
      method: 'POST',
      url: '/code',
      name: ''
    }).then(
      (res)=>{
        if(res.data == 'exist'){

        }
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.newProject}>New Project</button>
        {this.state.visible?
        <input value={this.state.filename} placeholder="filename with extension"/>:null}
      </div>
    )
  }
}
