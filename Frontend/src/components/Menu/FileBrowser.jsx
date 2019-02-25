import React from 'react';
import './FileBrowser.css';
import axios from "axios";

class FileBrowser extends React.Component{
    render(){
        let menuClasses = 'menu';
        if(this.props.show){
            menuClasses = 'menu show';
        }
        return(
            <div>
            <nav className={menuClasses}>
                <h2>File Explorer</h2><br></br>
                <div>{this.props.files.map((file)=>(
                    <div>{file.key}</div>
                ))}</div>
            </nav>
            </div>
        )
    }
}




export default FileBrowser;