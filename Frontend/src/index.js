import React from 'react';
import ReactDOM from 'react-dom';

import ToggleMenuButton from './components/Menu/ToggleMenuButton.jsx';
import Menu from './components/Menu/Menu.jsx';
import Backdrop from './components/Menu/Backdrop.jsx';
import Editor from './components/Editor/Editor.jsx';
import Dashboard from './public/Dashboard.jsx'
import './app.css'

export default class App extends React.Component{

    state = {
        visible: false,
        page: 'home'
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
                <button onClick={this.changePage}>Home</button>
                <button onClick={this.changePage}>Editor</button>
                <button onClick={this.changePage}>Profile</button>
                {this.state.page=="Editor"?
                    <div>
                        <div>
                            <ToggleMenuButton menuClickHandler={this.menuToggleHandler}></ToggleMenuButton>
                            <Menu show={this.state.visible}></Menu>
                            {backdrop}
                        </div>
                        <div className={this.state.visible ? "editor-container-open" : "editor-container-close"}>
                            <Editor></Editor>
                        </div>
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