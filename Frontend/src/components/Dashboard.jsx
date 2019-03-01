import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css';
import { BrowserRouter as Router } from "react-router-dom";
import Delete from "@material-ui/icons/DeleteOutlined";
import Exit from "@material-ui/icons/ExitToAppOutlined";
import Add from "@material-ui/icons/Add";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        projectName: '',
        projects: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.newProject=this.newProject.bind(this);
    this.userProjects=this.userProjects.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.deleteProject=this.deleteProject.bind(this);
    this.leaveProject=this.leaveProject.bind(this);
    this.renameProject=this.renameProject.bind(this);
    this.openProject=this.openProject.bind(this);
  }

  newProject(e) {
    e.preventDefault();
    axios.post('/createProject',this.state).then(function(res){
      if(res.data==='Project was created successfully'){
        return (window.location='/Dashboard');
      }else{
        alert(res.data)
      }
    });
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  deleteProject({target}){
    let req={
      id:target.id
    }
    axios.post('/deleteProject/',req);
    return (window.location='/Dashboard');
  }

  renameProject({target}){
    let req={
      id:target.id,
      name:this.state.projectName
    }
    axios.post('/renameProject/',req).then(res=>console.log(res.data));
    return (window.location='/Dashboard');
  }

  leaveProject({target}){
    let req={
      id:target.id
    }
    axios.post('/leaveProject/',req);
    return (window.location='/Dashboard');
  }

  componentDidMount(){
    this.userProjects();
  }

  userProjects(){
    //e.preventDefault();
    let currentComponent = this;
    axios.get('/dashboard').then(function(res){
      if(res.data==='User not logged in'){
        return (window.location='/');
      }else{
        //console.log(res.data)
        return currentComponent.setState({projects:res.data})
      }
    });
  }

  openProject({target}){
    let params={
      name:target.name,
      id: target.id
    }
    return (window.location='/Project/'+params.name+'/'+params.id)
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="Dash header">
          <div className="container">
            <h1>Dashboard</h1><br></br>
          </div>
          <div className="Nav" >
            <table><Navbar></Navbar></table>
          </div>
        </div>
        <div className="Dash Form"><br></br>
        <table>
          <h1>Projects</h1>
          {this.state.projects.map((project,index)=>(
          <div key={index}><br></br>
              <button id={project.project} name={project.projectName} title="Open Project" className="Button" onClick={this.openProject}>{project.projectName}</button>
              <button title="Delete Project" className="Button Delete" id={project.project} onClick={this.deleteProject}><Delete></Delete></button>
              <button title="Leave Project" className="Button Delete" id={project.project} onClick={this.leaveProject}><Exit></Exit></button>
              <input className="Input" id={project.project} name="projectName" placeholder="Enter your new project name" onChange={this.handleChange}/>
              <button className="Button" id={project.project} onClick={this.renameProject}>Rename</button>
          </div>
          ))}
        
        <div><br></br>
          <button title="Create Project" className="Button" onClick={this.newProject}><Add></Add></button>
          <input className="Input" name="projectName" placeholder="Enter your project name" onChange={this.handleChange}/>
        </div>
        </table>
        </div>
      </div>
      </Router>
    )
  }
}