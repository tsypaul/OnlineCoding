import React, { Component } from 'react';
import Axios from 'axios';
import {FaFolderOpen, FaChevronDown, FaFile, FaFolder, FaChevronRight} from 'react-icons/fa';

import './MenuItem.css';

export default class MenuItem extends Component {

    constructor(props){
        super(props);
    }

    state = {
        fileArr: []
    }

    componentDidMount(){
        Axios({
            method: 'POST',
            url: '/loadFiles',
            data: {projectName: this.props.item.name}
        }).then(
            (res)=>{
                this.setState({fileArr: res.data.files});
                console.log(this.state.fileArr);
            }
        )
    }

    openFile(){

        
    }

  render() {

    const {item, level, onClick} = this.props;

    const padding = (level) =>{
        return level*20;
    }

    const paddingStyle = {
        paddingLeft: padding
    }

    return (
      <div>
        <div className='item' style={paddingStyle}>
            <div className='icons' onClick={onClick}>
                {item.type === 'folder' && (item.isOpen ? <FaChevronDown/> : <FaChevronRight/>)}
            </div>

            <div className='icons'>
                {item.type === 'file' && <FaFile/>}
                {item.type === 'folder' && item.isOpen === true && <FaFolderOpen/>}
                {item.type === 'folder' && !item.isOpen && <FaFolder/>}
            </div>

            <div>{item.name}</div>
        </div>
        {item.isOpen && this.state.fileArr.map((file, i)=>{
            <MenuItem item={file} level={level+1}/>
            {console.log("here")}
        })}
      </div>
    )
  }
}


