import React from 'react';

import './ToggleMenuButton.css';

const ToggleMenuButton = props =>{
    return(
    <button className="ToggleMenuButton" onClick={props.menuClickHandler}>
        <div className="ToggleMenuButton-line"></div>
        <div className="ToggleMenuButton-line"></div>
        <div className="ToggleMenuButton-line"></div>
    </button>
    );
}

export default ToggleMenuButton;