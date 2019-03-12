import React, { Component } from 'react';

import MenuItem from './MenuItem.jsx';
import './menu.css';
import Axios from 'axios';

export default class Menu extends Component{


    constructor(props){
        super(props);
        this.state={
            root: {
                name: this.props.project,
                type: 'folder',
                isOpen: true
            }
        }
        this.toggleDirectory.bind(this);
    }

    toggleDirectory(){
        this.setState({
            isOpen: !this.isOpen
        })
    }

    render(){

        let menuClasses = 'menu', control = '';
        if(this.props.show){
            menuClasses = 'menu show';
            control = 'control'
        }

        return (
            <div>
                <nav className={menuClasses}>
                    <MenuItem item={this.state.root} onClick={this.toggleDirectory} level={0}></MenuItem>
                </nav>
                <div className={control}></div>
            </div>
        ) 
    }
}
