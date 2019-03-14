import React from 'react';
import './FileBrowser.css';

class FileBrowser extends React.Component{
    render(){
        let menuClasses = 'menu';
        if(this.props.show){
            menuClasses = 'menu show';
        }
        return(
            <div className={menuClasses}>
                <h2>{this.props.name}</h2>
                {this.props.files.map((file)=>(
                    <div>{file.key}</div>
                ))}
            </div>
        )
    }
}




export default FileBrowser;