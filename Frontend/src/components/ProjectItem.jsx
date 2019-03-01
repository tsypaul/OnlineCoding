import React, { Component } from 'react';
import './ProjectItem.css';

export default class ProjectItem extends Component {

    constructor(props){
        super(props);
    }

  render() {
    return (
        <div>
            <div className='projectBox'>
                <img src='' className='imgBox'></img>
                <a href="#" className='textBox'>{this.props.name}</a>
            </div>
        </div>
    )
  }
}
