import React from 'react';

import MenuItem from './MenuItem.jsx';
import './menu.css';

const Menu = props =>{
    let files = [
        {name: "abc.java", isDir: false},
        {name: "abc", isDir: true},
        {name: "abc.json", isDir: false},
        {name: "abc.js", isDir: false}
    ]
    let menuClasses = 'menu', control = '';
    if(props.show){
        menuClasses = 'menu show';
        control = 'control'
    }

    return (
        <div>
            <nav className={menuClasses}>
                <ul>
                    <div>haha</div>
                    <div>yes</div>
                </ul>
            </nav>
            <div className={control}></div>
        </div>
        
      )
}

export default Menu;