import React from 'react';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            field: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({field: e.target.value})
    }

    render(){
        const field = this.state.field;
        return(
            <div>
                <label>Please enter your username</label>
                <GetUsername username={field} handleChange={this.handleChange}></GetUsername>
                <RenderUsername username={field}></RenderUsername>
            </div>
        );
    }

}

class GetUsername extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <input value={this.props.username} onChange={this.props.handleChange}/>
            </div>
        )
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
        )
    }
    
}