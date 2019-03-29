import React, { Component } from 'react'
import Axios from 'axios';
import ProjectList from '../components/ProjectList';
import { Treebeard } from 'react-treebeard/lib';
import './a.css'
import Editor from './../components/Editor/Editor'

const data = {
  "name": "react-treebeard",
  "toggled": true,
  "children": [
      {
          "name": "example",
          "children": [
              {
                  "name": "app.js",
                  "active": false
              },
              {
                  "name": "data.js"
              },
              {
                  "name": "index.html"
              },
              {
                  "name": "styles.js"
              },
              {
                  "name": "webpack.config.js"
              }
          ],
          "active": false,
          "toggled": true
      },
      {
          "name": "src",
          "children": [
              {
                  "name": "components",
                  "children": [
                      {
                          "name": "decorators.js"
                      },
                      {
                          "name": "treebeard.js"
                      }
                  ]
              },
              {
                  "name": "index.js"
              }
          ],
          "active": false,
          "toggled": true
      },
      {
          "name": "themes",
          "children": [
              {
                  "name": "animations.js"
              },
              {
                  "name": "default.js"
              }
          ],
          "active": false,
          "toggled": true
      },
      {
          "name": "Gulpfile.js"
      },
      {
          "name": "index.js"
      },
      {
          "name": "package.json"
      }
  ],
  "active": true
}

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
        {/* <ProjectList></ProjectList>
        <div id='newProject'>
          <input onChange={this.newProject} placeholder="filename with extension"/>
          <button onClick={this.submitNewProject}>New Project</button>
        </div> */}
        <div className='component'>
        <Treebeard data={data} ></Treebeard>
        </div>
        <div className='component'>
                            <Editor></Editor>
                        </div>
      </div>
    )
  }
}
