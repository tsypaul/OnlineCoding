import React from 'react';
import ReactDOM from 'react-dom';

import {CookiesProvider} from 'react-cookie';

import Navbar from './components/Navbar.jsx';

export default class App extends React.Component{

    

    render(){
        return (
            <CookiesProvider>
                <Navbar></Navbar>
            </CookiesProvider>
        );
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);