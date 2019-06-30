import React, {Component, Fragment} from "react";
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import store from "../stores/Authention.store";


@observer
export default class NavigationBarComponent extends Component {
    render() {
        // variable dom when don't login.
        const notAuthentTemp = <Fragment>
            <Link to="/register"><Button size="sm" variant="primary">
                <i className="fas fa-user-plus" aria-hidden="true"></i> Đăng ký</Button></Link>
            <Link to="/login"><Button size="sm" className="mx-2" variant="success">
                <i className="fas fa-sign-in-alt" aria-hidden="true"></i> Đăng nhập</Button></Link>
        </Fragment>;

        // variable dom when logined.
        const authentTemp = <Fragment>
            <label className="font-weight-bold text-white">Xin chào! {store.fullname}</label>
            <Button size="sm" className="mx-2" variant="outline-danger"
                    onClick={store.logout}>
                <i className="fas fa-sign-out-alt" aria-hidden="true"></i></Button>
        </Fragment>;


        return (
            <Container>
                <Row>
                    <Col xs={12} className="px-0">
                        <Navbar bg="dark" expand="lg" className="justify-content-between">
                            <Navbar.Brand><Link to="/">🏠</Link></Navbar.Brand>
                            <Form inline>
                                {store.isLogin ? authentTemp : notAuthentTemp}
                            </Form>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}
