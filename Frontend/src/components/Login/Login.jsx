import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css"
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

class Login extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

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

    render(){
        return(
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

class RenderUsername extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let label;
        if(/^[A-z]+$/.test(this.props.username)){
            label = <label>Valid Username</label>;
        }else if(this.props.username == ""){
            label = <label></label>
        }else{
            label = <label>Not Valid</label>
        }
        return(
            <div>{label}</div>
        );
    }
    
}

export default withCookies(Login);