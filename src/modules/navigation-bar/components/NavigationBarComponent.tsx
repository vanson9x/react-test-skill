import {observer} from "mobx-react";
import * as React from "react";
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import appStore from "../../../AppStore";

@observer
export default class NavigationBarComponent extends React.Component {
    public render() {
        const notAuthentTemp = <>
            <Link to="/register"><Button size="sm" variant="primary">
                <i className="fas fa-user-plus" aria-hidden="true"/> Đăng ký</Button></Link>
            <Link to="/login"><Button size="sm" className="mx-2" variant="success">
                <i className="fas fa-sign-in-alt" aria-hidden="true"/> Đăng nhập</Button></Link>
        </>;

        // variable dom when logined.
        const authentTemp = <>
            <label className="font-weight-bold text-white">Xin chào! {appStore.account.fullname}</label>
            <Button size="sm" className="mx-2" variant="outline-danger"
                    onClick={appStore.logout}>
                <i className="fas fa-sign-out-alt" aria-hidden="true"/></Button>
        </>;


        return (
            <Container>
                <Row>
                    <Col xs={12} className="px-0">
                        <Navbar bg="dark" expand="lg" className="justify-content-between">
                            <Navbar.Brand><Link to="/">🏠</Link></Navbar.Brand>
                            <Form inline={true}>
                                {appStore.isLogin ? authentTemp : notAuthentTemp}
                            </Form>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }

}
