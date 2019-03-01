import React, { Component } from 'react'
import Axios from 'axios';
import ProjectItem from './ProjectItem';

export default class ProjectList extends Component {

    state = {
      projectArr: []
    }

    componentDidMount(){
      Axios({
        method: 'GET',
        url: '/loadProject',
        data: {username: 'paul'}
      }).then(
          (res)=>{
            console.log(res.data.projects);  
            this.setState({projectArr: res.data.projects});
          }
      );
    }

  render() {
    

    return (
      <div className='projectContainer'>
        {this.state.projectArr.map((project, i)=>{
          console.log(project.name);
          return (<ProjectItem key={i} name={project.name}></ProjectItem>)
        })}
      </div>
    )
  }
}
