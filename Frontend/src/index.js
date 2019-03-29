import React from 'react';
import ReactDOM from 'react-dom';

import ToggleMenuButton from './components/Menu/ToggleMenuButton.jsx';
import Backdrop from './components/Menu/Backdrop.jsx';
import Editor from './components/Editor/Editor.jsx';
import Dashboard from './public/Dashboard.jsx'
import './app.css'
import MenuContainer from './components/Menu/MenuContainer.jsx';
import {Treebeard} from 'react-treebeard/lib';


const data = {
    "name": "react-treebeard",
    "toggled": true,
    "children": [
        {
            "name": "example",
            "children": [
                {
                    "name": "app.js",
                    "active": false
                },
                {
                    "name": "data.js"
                },
                {
                    "name": "index.html"
                },
                {
                    "name": "styles.js"
                },
                {
                    "name": "webpack.config.js"
                }
            ],
            "active": false,
            "toggled": true
        },
        {
            "name": "src",
            "children": [
                {
                    "name": "components",
                    "children": [
                        {
                            "name": "decorators.js"
                        },
                        {
                            "name": "treebeard.js"
                        }
                    ]
                },
                {
                    "name": "index.js"
                }
            ],
            "active": false,
            "toggled": true
        },
        {
            "name": "themes",
            "children": [
                {
                    "name": "animations.js"
                },
                {
                    "name": "default.js"
                }
            ],
            "active": false,
            "toggled": true
        },
        {
            "name": "Gulpfile.js"
        },
        {
            "name": "index.js"
        },
        {
            "name": "package.json"
        }
    ],
    "active": true
}

export default class App extends React.Component{

    state = {
        visible: false,
        page: 'home',
        fileArr: {data}
    }

    menuToggleHandler = () =>{
        this.setState((prevState)=>{
            return {visible: !prevState.visible};
        });
    }

    backdropClickHandler = () =>{
        this.setState(
            {visible: false}
        );
    }

    changePage = (e) =>{
        let text = e.target.innerHTML;
        this.setState({page: text});
    }

    render(){
        let backdrop;

        if(this.state.visible){
            backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler}></Backdrop>
            
        }

        return (
            <div>
                <ul className='navbar'>
                    <li className='navbar-item' onClick={this.changePage}>Home</li>
                    <li className='navbar-item' onClick={this.changePage}>Editor</li>
                    <li className='navbar-item' onClick={this.changePage}>Profile</li>
                </ul>
                {this.state.page=="Editor"?
                    <div>
                        <div className='component'>
                            {/* <ToggleMenuButton menuClickHandler={this.menuToggleHandler}></ToggleMenuButton> */}
                            {/* <MenuContainer show={this.state.visible} project="a"></MenuContainer> */}
                            {/* {backdrop} */}
                            <Treebeard data={this.state.fileArr}></Treebeard>
                        </div>
                        {/* <div className='component'>
                            <Editor></Editor>
                        </div> */}
                    </div>
                : (this.state.page=="Home"?
                    <Dashboard></Dashboard>
                : <div></div>)}
            </div>
        );
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);