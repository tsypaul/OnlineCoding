import React, { Component } from 'react';
import axios from 'axios';
import "../Home.css";
axios.defaults.withCredentials = true;

class register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            passwordConf: ''
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
        axios.post('register',this.state).then(function(res){
          if(res.data.message==='Login Successful'){
            return (window.location = "/Dashboard");
          }else{
            alert(res.data);
          }
        });
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">username</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Confirm Your Password</label>
                <input type="password" id="passwordConf" className="FormField__Input" placeholder="Enter your password again" name="passwordConf" value={this.state.passwordConf} onChange={this.handleChange} />
              </div>

              
              <div className="FormField">
                  <button className="FormField__Button">Sign Up</button>
              </div>
            </form>
          </div>
        );
    }
}
export default register;