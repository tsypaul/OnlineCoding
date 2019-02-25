import React, { Component } from 'react'
import axios from "axios";
import {BrowserRouter as Router} from 'react-router-dom';

class changePassword extends Component {
    constructor() {
        super();
        this.state = {
            currentPassword:'',
            newPassword: '',
            passwordConf: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.changePassword=this.changePassword.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    changePassword(e) {
        e.preventDefault();
        axios.post('/ChangePassword',this.state).then(function(res){
          if(res.data==='Password was changed successfully'){
            return (window.location='/Profile')
          }else{
            alert(res.data);
          }
        })
    }
    
    render() {
        return (
        <Router> 
            <div>
                <form onSubmit= {this.changePassword}>
                    <div>
                        <label className="Label" >Current Password</label>
                        <input className="Input" type='password' id="currentPassword" name="currentPassword" value={this.state.currentPassword} placeholder="Enter your current password" onChange={this.handleChange}/>
                    </div><br></br>
                    <div>
                        <label className="Label">New Password</label>
                        <input className="Input" type='password' id="newPassword" name="newPassword" value={this.state.newPassword} placeholder="Enter your new password" onChange={this.handleChange}/>
                    </div><br></br>
                    <div>
                        <label className="Label">Confirm Your New Password</label>
                        <input className="Input" type='password' id="passwordConf" name="passwordConf" value={this.state.passwordConf} placeholder="Enter your new password again" onChange={this.handleChange}/>
                    </div><br></br>
                    <div>
                        <button className="Button">Submit</button>
                    </div>
                </form>
            </div>
        </Router>
        );
        
    }
}

export default changePassword;
