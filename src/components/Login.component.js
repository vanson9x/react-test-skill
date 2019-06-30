import React, {Component, Fragment} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./Login.component.scss";
import {Link, Redirect} from "react-router-dom";
import {observer} from "mobx-react";
import {computed, observable} from "mobx";
import axios from "axios";
import md5 from 'md5';

import store from "../stores/Authention.store";
import MyToast from "../stores/MyToast.store";

@observer
export default class LoginComponent extends Component {
    @observable validated = false;
    @observable redirect = false;

    usernameRef = new React.createRef();
    passwordRef = new React.createRef();
    rememberRef = new React.createRef();

    componentDidMount() {
        if (store.username) this.usernameRef.current.value = store.username;
    }

    @computed get getValidated() {
        return this.validated;
    }

    @computed get getRediretc() {
        return this.redirect;
    }

    // Event submit form login.
    onSubmit = (event) => {
        this.validated = true;
        if (this.usernameRef.current.value.trim() && this.passwordRef.current.value.trim()) {
            axios.post('http://localhost:3000/login', {
                username: this.usernameRef.current.value.trim(),
                password: md5(this.passwordRef.current.value.trim()),
                remember: this.rememberRef.current.value
            })
                .then(res => {
                    const {data} = res;
                    if (data.code !== 403) {
                        store.setUsername(data.username);
                        store.setToken(data.token);
                        store.setFullName(data.fullname);
                        this.redirect = true;
                        MyToast.push('Đăng nhập thành công', 3000);
                    } else {
                        MyToast.push(data.message);
                    }
                });
        }
        event.preventDefault();
    };

    render() {
        return (
            <Fragment>
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
                                            <Form.Control as="input"
                                                          ref={this.usernameRef}
                                                          type="text" required/>
                                            <Form.Control.Feedback type="invalid">Không được bỏ
                                                trống.</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <Form.Label className="small">Mật khẩu</Form.Label>
                                                <Link to="" className="small">Quên mật khẩu</Link>
                                            </div>
                                            <Form.Control as="input"
                                                          ref={this.passwordRef}
                                                          type="password" required/>
                                            <Form.Control.Feedback type="invalid">Không được bỏ
                                                trống.</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check className="small"
                                                        ref={this.rememberRef}
                                                        type="checkbox" label="Ghi nhớ tài khoản"/>
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
                {this.redirect && <Redirect to='/'/>}
            </Fragment>
        )
    }
}
