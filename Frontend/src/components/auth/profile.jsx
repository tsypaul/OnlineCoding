import React, { Component } from 'react'
import axios from "axios";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ChangePass from './changePassword.jsx';
import Navbar from '../Navbar/Navbar.jsx';

class profile extends Component {
    constructor() {
        super();
        this.state = {
            username:'',
            currentPassword:'',
            newPassword: '',
            passwordConf: '',
            page:'Profile'
        };
        this.componentDidMount=this.componentDidMount.bind(this);
        this.User=this.User.bind(this);
    }

    changePage = (e) =>{
        let text = e.target.name;
        this.setState({page: text})
    }
    
    componentDidMount(){
        this.User();
    }

    User(){
        //e.preventDefault();
        axios.get('/profile').then(res=>this.setState({username:res.data.name}));
        
    }
    
    render() {
        return (
        <Router> 
            <div className="App">
                <div className="Dash header">
                    <div className="container">
                        <h1>Profile</h1>
                    </div>
                    <div className="Nav" >
                        <Navbar></Navbar>
                    </div>
                </div>
                <div className="Dash Form"><br></br>
                <table>
                    <ul>
                    <br></br><h3>Hello, {this.state.username}</h3><br></br>
                        <button className="Button" name='changePassword' onClick={this.changePage}>Change your Password</button>
                    </ul>
                <Route exact path='/Profile'>
                 {this.state.page==="changePassword"?
                <div>
                    <ChangePass></ChangePass>
                </div>
                : <div></div>}
                </Route>
              </table>
              </div>
            </div>
        </Router>
        );
        
    }
}

export default profile;
