import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';
import ToggleMenuButton from '../Menu/ToggleMenuButton.jsx';
import FileBrowser from '../Menu/FileBrowser.jsx';
import Members from '../Menu/Members.jsx';
import Backdrop from '../Menu/Backdrop.jsx';


const socket = SocketIOClient('http://localhost:4000');

export default class Editor extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            FilesVisible: false,
            MembersVisible:false,
            files:[],
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
            id:this.props.match.params.id
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
        axios.get('/project/members/'+req.id).then(res=>this.setState({members:res.data}))
    }

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        // Axios({
        //     method: 'POST',
        //     url: '/code',
        //     data: {code: newValue},
        // }).then(
        //     (res)=>{
        //         console.log(res.data.msg);
        //     }
        // )
        socket.emit('code change', newValue);
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

    render(){

        socket.on('code change', (code)=>{
            this.setState({code: code});
        });

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
            <div>
            <div>
                <h1>{this.props.match.params.projectName}</h1>
                <ToggleMenuButton menuClickHandler={this.menuToggleHandler}></ToggleMenuButton>
                <FileBrowser id={this.props.match.params.id} show={this.state.FilesVisible} files={this.state.files}></FileBrowser>
                {backdrop}
            </div>
            <div>
                <button onClick={this.membersToggleHandler}>Members</button>
                <Members id={this.props.match.params.id} name={this.props.match.params.projectName} show={this.state.MembersVisible} members={this.state.members}></Members>
            </div>
            <div style={{height: '100%'}}>
                <select onChange={this.updateLanguageType}>
                    <option value="javascript">Javascript</option>
                    <option value="java">Java</option>
                    <option value="json">JSON</option>
                </select>
                {value==='java' ? 
                <Fragment>
                    <input onChange={this.inputChange} value={this.state.javaclass}></input>
                    {!/^[A-Za-z]+$/.test(this.state.javaclass)?
                        <span>bad class name</span>
                    :null}
                    <button onClick={this.javaAddClass} disabled={!/^[A-Za-z]+$/.test(this.state.javaclass)}>Add Class</button>
                </Fragment>
                : null}
                <hr/>
                        
                <MonacoEditor
                    height="500"
                    language={value}
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />

            </div>
            </div>
            </Router>
        );
    }
}