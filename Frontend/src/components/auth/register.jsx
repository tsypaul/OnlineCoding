import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
            <body>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form onSubmit={this.handleSubmit} className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control"
                                               placeholder="Username" required autoFocus name="username" value={this.state.username} onChange={this.handleChange}/>
                                        <label htmlFor="inputUserame">Username</label>
                                    </div>


                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control"
                                               placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange}/>
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputConfirmPassword" className="form-control"
                                               placeholder="Password" required name="passwordConf" value={this.state.passwordConf} onChange={this.handleChange}/>
                                        <label htmlFor="inputConfirmPassword">Confirm password</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase "
                                            type="submit">Register
                                    </button>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        );
    }
}
export default register;