import React, { Component } from 'react';

import MenuItem from './MenuItem.jsx';
import './menu.css';
import Axios from 'axios';

export default class Menu extends Component{

    state={
        root: {
            name: this.props.project,
            type: 'folder',
            isOpen: false
        }
    }

    constructor(props){
        super(props);
        this.toggleDirectory = this.toggleDirectory.bind(this);
    }

    toggleDirectory(){
        this.setState({
            isOpen: !this.isOpen
        })
    }
    
    render() {
        return (
          <div>
            <MenuItem item={this.state.root} onClick={this.toggleDirectory} level={0}></MenuItem>
          </div>
        )
      }
}
