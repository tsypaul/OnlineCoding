import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./components/Home";
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/auth/profile.jsx';
import Editor from './components/Editor/Editor.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Profile" component={Profile} />
          <Route path="/Project/:projectName/:id" component={Editor}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
