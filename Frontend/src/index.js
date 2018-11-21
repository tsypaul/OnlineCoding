import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login.jsx'

export default class App extends React.Component{

    render(){
        return <Login></Login>;
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);