import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';


import Login from '../Login/Login.jsx';
import Editor from '../Editor/Editor.jsx';

export default class Navbar extends Component {

    Login = () =>{
        return <Login></Login>;
    }

    Editor = () =>{
        return <Editor></Editor>
    }

  render() {
    return (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/Editor">Editor</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/profile" component={this.Login}></Route>
                <Route path="/Editor" component={this.Editor}></Route>
            </Switch>
        </div>
    </Router>
    )
  }
}
