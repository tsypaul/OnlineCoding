import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import axios from "axios";
import "./Navbar.css"

export default class Navbar extends Component {

    Logout = () =>{
        axios.get('/logout')
        return (window.location='/');
    }

    profile = () =>{
        return (window.location='/Profile');
    }

    dashboard = () =>{
        return (window.location='/Dashboard');
    }

  render() {
    return (
    <Router>
        <div>
            <table>
                <tr><button className="NavButton" onClick={this.dashboard}>Dashboard</button></tr><br></br>
                <tr><button className="NavButton" onClick={this.profile}>Profile</button></tr><br></br>
                <tr><button className="NavButton" onClick={this.Logout}>Logout</button></tr><br></br>
            </table>
            
        </div>
    </Router>
    )
  }
}
