import React from 'react';

import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

class Login extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state ={
            field: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    postLoginInfo(route, data){
        return fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            cookies.set(JSON.stringify(res.json().name));
        })
    }

    handleChange(e){
        this.setState({field: e.target.value})
    }

    getPassword(){

    }

    render(){
        const field = this.state.field;
        const pass = this.state.password;
        return(
            <div>
                <form method="POST" action="/"> 
                {/* {this.postLoginInfo('/login',{username: field, password: pass})} */}
                    <label>Please enter your username</label>
                    <input value={field} onChange={this.handleChange}/>
                    <input value={pass} type="password" onChange={this.getPassword}/>
                    <RenderUsername username={field}></RenderUsername>
                    <input type="submit" value="submit"/>
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