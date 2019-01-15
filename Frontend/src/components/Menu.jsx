import React, { Component } from 'react'

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state={
            visible: false,
        }
    }

    show(){
        this.setState({visible: true});
    }

    hide(){
        this.setState({visible: false});
    }

  render() {
    return (
      <div className="menu">
        <div className={this.state.visible? "show" : "hide"}>{this.props.children}</div>
      </div>
    )
  }
}
