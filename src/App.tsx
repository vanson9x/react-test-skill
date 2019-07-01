import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './App.css';
import {LoginComponent} from "./modules/login/LoginModule";
import {NavigationBarComponent} from "./modules/navigation-bar/NavigationBarModule";
import {RegisterComponent} from './modules/register/RegisterModule';

class App extends React.Component {
    public render() {
        const homePage = () => <div className="container">
            <h1 className="text-center">Welcome!</h1>
            <a href="http://207.148.100.47" target="_blank"><h2>🖱 Demo 🕶</h2></a>
            <a href="https://github.com/vanson9x/react-test-skill/tree/react-typescript" target="_blank">Source code</a>
            <h2>#Run project</h2>
            <p>$npm start</p>
            <h2>#Run build project</h2>
            <p>$npm run-script build</p>
        </div>;
        return (
            <>
                <BrowserRouter>
                    <NavigationBarComponent/>
                    <Switch>
                        <Route path="/" exact={true} render={homePage}/>
                        <Route path="/login" exact={true} component={LoginComponent}/>
                        <Route path="/register" exact={true} component={RegisterComponent}/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;
