import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';

import Members from '../Menu/Members.jsx';
import Backdrop from '../Menu/Backdrop.jsx';
import {Treebeard, decorators} from 'react-treebeard/lib'
import './Editor.css'
  
//   decorators.Header = {

//   }


const socket = SocketIOClient('http://localhost:3000');

export default class Editor extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            FilesVisible: false,
            MembersVisible:false,
            files:{},
            members:[],
            code: '// type your code... \n',
            value: 'javascript',
            javaclass: '',
            disabled: 'disabled'
        }
        this.menuToggleHandler=this.menuToggleHandler.bind(this);
        this.membersToggleHandler=this.membersToggleHandler.bind(this);
        this.backdropClickHandler=this.backdropClickHandler.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.projectFiles=this.projectFiles.bind(this);
        this.projectMembers=this.projectMembers.bind(this);
        this.updateLanguageType = this.updateLanguageType.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    menuToggleHandler(){
        this.setState((prevState)=>{
            return {FilesVisible: !prevState.FilesVisible};
        });
    }

    membersToggleHandler(){
        this.setState((prevState)=>{
            return {MembersVisible: !prevState.MembersVisible};
        });
    }

    backdropClickHandler(){
        this.setState(
            {FilesVisible: false, MembersVisible:false}
        );
    }

    componentDidMount(){
        this.projectFiles();
        this.projectMembers();
    }

    projectFiles(){
        let currentComponent = this;
        let req={
            id:this.props.match.params.id,
            name:this.props.match.params.projectName
        }
        axios.get('/project/contents/'+req.id).then(function(res){
            if(res.data==='User is not logged in'){
                return (window.location='/');
            }else if(res.data==='User is not a member'){
                return (window.location='/Dashboard');
            }else{
                currentComponent.setState({files:res.data});
            }
        })
    }

    projectMembers(){
        let req={
            id:this.props.match.params.id
        }
        axios.get('/project/members/'+req.id)
        .then(res=>this.setState({members:res.data}));
    }

    onChange = (newValue, path) => {
        console.log('onChange', newValue);
        this.setState({code: newValue});
        socket.emit(path, newValue);
    }

    editorDidMount = (editor) => {
        console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
        this.editor = editor;
    }

    changeEditorValue = () => {
        if(this.editor){
            this.editor.setValue('//code changed! \n');
        }
    }

    changeBySetState = () => {
        this.setState({ code: '//code changed by setState! \n'});
    }
    updateLanguageType = (e) =>{
        let {value} = e.target;
        console.log(value);
        this.setState({
            value: value,
        });
    }

    javaAddClass = () =>{
        this.setState({
            code: this.state.code + '\npublic class ' + this.state.javaclass + '{\n\t\n}',
        });
    }

    inputChange(e){
        this.setState({
            javaclass: e.target.value,
        });
        if(!/^[A-Za-z]+$/.test(e.target.value)){
            console.log("bad");
            this.setState({
                disabled: 'disabled',
            });
        }else{
            console.log("good");
            this.setState({
                disabled: 'enabled',
            });
        }
        console.log(this.state);
    }

    onToggle(node, toggled){
        console.log(node.name)
        if(node.type === 'file'){
            axios.post('/project/code/', {name: node.path})
            .then((res)=>{
                this.onChange(res.data, node.path);
            })
        }
        socket.on(node.path, (code)=>{
            this.setState({code: code})
        })
        if(node.children){
            node.toggled = toggled;
        }
        this.setState({cursor: node});
        // console.log(this.state.files);
    }
    

    render(){

        const {code, value} = this.state;
        const options = {
            selectOnlineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            automaticLayout: false,
        };
        let backdrop;

        if(this.state.FilesVisible||this.state.MembersVisible){
            backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler}></Backdrop>
        }

        return (
            <Router>
            <div className='editor-container'>
                <ul className='navbar'>
                        <li className='navbar-item' >Home</li>
                        <li className='navbar-item' >Profile</li>
                </ul>
                <div>
                    <button className='customized-button' onClick={this.membersToggleHandler}>Members</button>
                    <Members id={this.props.match.params.id} name={this.props.match.params.projectName} show={this.state.MembersVisible} members={this.state.members}></Members>
                </div>
                <div className='file-explorer'>
                    <Treebeard data={this.state.files} onToggle={this.onToggle}></Treebeard>
                </div>
                <div className='editor'>
                    <select onChange={this.updateLanguageType}>
                        <option value="javascript">Javascript</option>
                        <option value="java">Java</option>
                        <option value="json">JSON</option>
                    </select>
                    {value==='java' ? 
                    <Fragment>
                        <input onChange={this.inputChange} value={this.state.javaclass}></input>
                        {!/^[A-Za-z]+$/.test(this.state.javaclass)?
                            <span className='class-input'>bad class name</span>
                        :null}
                        <button className='customized-button' onClick={this.javaAddClass} disabled={!/^[A-Za-z]+$/.test(this.state.javaclass)}>Add Class</button>
                    </Fragment>
                    : null}
                    <hr/>
                            
                    <MonacoEditor
                        height="700"
                        language={value}
                        value={code}
                        options={options}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                        theme='vs-dark'
                    />

                </div>
            </div>
            </Router>
        );
    }
}