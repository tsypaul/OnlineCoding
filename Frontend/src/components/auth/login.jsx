import React, { Component } from 'react';
import axios from 'axios';
import "../Home.css";
axios.defaults.withCredentials = true;

class login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/login',this.state).then(function(res){
          if(res.data.message==='Login Successful'){
            //console.log(res.data);
            return (window.location = "/Dashboard");
          }else{
            alert(res.data);
          }
        })
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="username">Username</label>
                <input type="username" id="username" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button">Login</button>
              </div>
            </form>
          </div>
        );
        
    }
}

export default login;
