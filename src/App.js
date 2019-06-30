import React, {Component, Fragment} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomeComponent from "./components/Home.component"
import LoginComponent from "./components/Login.component";
import RegisterComponent from "./components/Register.compoent";
import NavigationBarComponent from "./components/NavigationBar.component";
import {Toast} from "react-bootstrap";
import {observer} from "mobx-react";

import MyToast from "./stores/MyToast.store";

@observer
export default class App extends Component {


    render() {
        const ToastTemplate = <div className="my-toast">
            <Toast onClose={MyToast.pop} show={MyToast.show} delay={MyToast.delay}
                   autohide>
                <Toast.Header className="text-primary bg-danger">
                    <strong className="mr-auto ml-1 text-white">Thông báo</strong>
                </Toast.Header>
                <Toast.Body>
                    {MyToast.message}
                </Toast.Body>
            </Toast>
        </div>;
        return (
            <Fragment>
                {ToastTemplate}
                <BrowserRouter>
                    <NavigationBarComponent/>
                    <Switch>
                        <Route path="/" exact component={HomeComponent}/>
                        <Route path="/login" exact component={LoginComponent}/>
                        <Route path="/register" exact component={RegisterComponent}/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}
