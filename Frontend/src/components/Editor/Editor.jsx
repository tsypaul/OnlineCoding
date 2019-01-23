import React, { Fragment } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            code: '// type your code... \n',
            value: 'javascript',
            javaclass: '',
            disabled: 'disabled',
        }
        this.updateLanguageType = this.updateLanguageType.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        fetch('http://localhost:3000/code', {
            method: 'POST',
            body: JSON.stringify({
                code: newValue
            }),
            
            
        })
        .then((res)=>{
            res.json().then((data) =>{
                console.log(data.msg);
            });
        })
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

    showExplorer(){

    }

    dismissExplorer(){

    }

    render(){
        const {code, value} = this.state;
        const options = {
            selectOnlineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            automaticLayout: false,
        };
        return (
            <div style={{height: '100%'}}>
                <select onChange={this.updateLanguageType}>
                    <option value="javascript">Javascript</option>
                    <option value="java">Java</option>
                    <option value="json">JSON</option>
                </select>
                {value=='java' ? 
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
        );
    }

}