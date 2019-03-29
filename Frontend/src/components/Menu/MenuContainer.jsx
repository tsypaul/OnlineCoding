import React, { Component } from 'react';
import {Treebeard} from 'react-treebeard/lib';

import './Menu.css'

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

export default class MenuContainer extends Component {


    constructor(props){
        super(props);
        this.state = {
            fileArr: {data}
        }
    }

    // componentDidMount(){
    //     Axios({
    //         method: 'POST',
    //         url: '/loadFiles',
    //         data: {projectName: this.props.item.name}
    //     }).then(
    //         (res)=>{
    //             this.setState({fileArr: res.data.files});
    //             console.log(this.state.fileArr);
    //         }
    //     )
    // }

    

    render(){

        let menuClasses = 'menu', control = '';
        if(this.props.show){
            menuClasses = 'menu show';
            control = 'control'
        }

        return (
            <div>
                {/* <nav className={menuClasses}> */}
                
                    
                {/* </nav> */}
                 {/* <div className={control}></div> */}
            </div>
        ) 
    }
  
}
