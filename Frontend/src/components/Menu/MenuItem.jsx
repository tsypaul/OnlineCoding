import React from 'react';

const MenuItem = props => {
    let isDir = <div className="menu-item">{props.name}</div>
    if(props.dir){
        isDir = <MenuItem className="menu-item dir"></MenuItem>
    }
    return {isDir}
}

export default MenuItem;