import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomeComponent from "./components/Home.component"
import LoginComponent from "./components/Login.component";
import RegisterComponent from "./components/Register.compoent";
import NavigationBarComponent from "./components/NavigationBar.component";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavigationBarComponent/>
                <Switch>
                    <Route path="/" exact component={HomeComponent}/>
                    <Route path="/login" exact component={LoginComponent}/>
                    <Route path="/register" exact component={RegisterComponent}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
