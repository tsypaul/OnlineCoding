import React, { Component } from 'react';
import Axios from 'axios';

export default class MenuItem extends Component {

    state = {
        fileArr: []
    }

    componentDidMount(){
        Axios({
            method: 'GET',
            url: '/loadFiles',
            data: {projectName: this.props.name}
        }).then(
            (res)=>{
                this.setState({fileArr: res.data.files});
                console.log(this.state.fileArr);
            }
        )
    }

    openFile(){

        
    }

    toggleDirectory(e){

    }

  render() {

    return (
      <div>
        {this.state.fileArr.map((file, i)=>{
            return file.isDirectory? (<div className='directory' key={i} onClick={this.toggleDirectory}>{file.filename} directory</div>) 
            : (<div className='' key={i} onClick={this.openFile}>{file.filename}</div>)
        })}
      </div>
    )
  }
}


// const MenuItem = props => {

//     Axios

//     let isDir = <div className="menu-item">{props.name}</div>
//     if(props.dir){
//         isDir = <MenuItem className="menu-item dir"></MenuItem>
//     }
//     return {isDir}
// }

// export default MenuItem;