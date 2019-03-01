import React, { Component } from 'react'
import Axios from 'axios';
import ProjectList from '../components/ProjectList';

export default class Dashboard extends Component {

  state={
    visible: true,
    filename: ''
  }

  newProject=(e)=>{
    this.setState({filename: e.target});
  }

  submitNewProject(){
    Axios({
      method: 'POST',
      url: '/code',
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
        <ProjectList></ProjectList>
        <div id='newProject'>
          <input onChange={this.newProject} placeholder="filename with extension"/>
          <button onClick={this.submitNewProject}>New Project</button>
        </div>
      </div>
    )
  }
}
