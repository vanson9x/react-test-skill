import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./Login.component.scss";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import store from "../stores/Authention.store";
import {computed, observable} from "mobx";


const myRef = React.createRef();


@observer
export default class LoginComponent extends Component {
    @observable validated = false;

    constructor(props) {
        super(props);
    }

    @computed get getValidated() {
        return this.validated;
    }

    // Event submit form login.
    onSubmit = (event) => {
        this.validated = true;
        event.preventDefault();
    };

    render() {
        return (
            <Container id="Login-page" className="mt-1">
                <Row>
                    <Col xs={12} lg={{span: 4, offset: 4}}>
                        <Card className="my-lg-5">
                            <Card.Body>
                                <h4 className="font-weight-bold mb-3">Đăng nhập</h4>
                                <Form
                                    noValidate
                                    validated={this.getValidated}
                                    onSubmit={this.onSubmit}>
                                    <Form.Group>
                                        <Form.Label className="small">Tài khoản</Form.Label>
                                        <Form.Control as="input" type="text" required/>
                                        <Form.Control.Feedback type="invalid">Không được bỏ trống.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="d-flex justify-content-between">
                                            <Form.Label className="small">Mật khẩu</Form.Label>
                                            <Link to="" className="small">Quên mật khẩu</Link>
                                        </div>
                                        <Form.Control as="input" type="password" required/>
                                        <Form.Control.Feedback type="invalid">Không được bỏ trống.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check className="small" type="checkbox" label="Ghi nhớ tài khoản"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">Đăng nhập</Button>
                                    </Form.Group>
                                    <Form.Group className="text-center">
                                        <Form.Label className="small">Bạn chưa có tài khoản?
                                            <Link to="/register" className="pl-1 font-italic">Đăng
                                                ký</Link></Form.Label>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
