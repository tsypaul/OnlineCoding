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
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input type="text" id="username" className="validate" name="username" value={this.state.username} onChange={this.handleChange} />
                            <label htmlFor="username">Username</label>

                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="password" type="password" className="validate" name="password" value={this.state.password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <button className="btn btn-large waves-effect waves-light hoverable green accent-3 white-text" type="submit">Login</button>

                </form>
            </div>
        );
        
    }
}

export default login;
