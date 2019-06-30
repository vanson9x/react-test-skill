import React, {Component} from "react";

export default class HomeComponent extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Welcome!</h1>
                <a href="http://207.148.100.47" target="blank"><h2>🖱 Demo 🕶</h2></a>
                <a href="https://github.com/vanson9x/react-test-skill" target="blank">Source code</a>
                <h2>#Run server test</h2>
                <p>$npm run server</p>
                <h2>#Run project</h2>
                <p>$npm start</p>
                <h2>#Run build project</h2>
                <p>$npm run build</p>
            </div>
        )
    }
}
