import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Home.css";


class Home extends Component {
    state = {
        visible: false,
        page: 'Login'
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

    render() {
        return (
            <Router basename='/'>
                <div className="App">

                    <div className="App_Side">
                        <div className="container">
                            <h2>Online Code Editor</h2>
                        </div>
                    </div>
                    <div className="App_Form">

                        <div className="container PageSwitcher">
                            <div className="btn-group">
                                <button type="button" className=".btn-lg btn btn-success" onClick={this.changePage}>Login</button>
                                <button type="button" className=".btn-lg btn btn-danger" onClick={this.changePage}>Register</button>
                            </div>
                        </div>

                        <Route exact path='/'>
                            {this.state.page==="Login"?
                                <div>
                                    <Login></Login>
                                </div>
                                : (this.state.page==="Register"?
                                    <Register></Register>
                                    : <div></div>)}
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Home;