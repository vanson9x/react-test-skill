import * as md5 from "md5";
import {observer} from "mobx-react";
import * as React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

import appStore from "../../../AppStore";
import LoginService from "../LoginService";
import store from "../LoginStore";

@observer
export default class LoginComponent extends React.Component {
    // @ts-ignore
    public usernameRef = new React.createRef();
    // @ts-ignore
    public passwordRef = new React.createRef();
    // @ts-ignore
    public rememberRef = new React.createRef();

    // Event submit form login.
    public onSubmit = (event: any) => {
        store.validated = true;
        if (this.usernameRef.current.value.trim() && this.passwordRef.current.value.trim()) {
            LoginService.login(
                this.usernameRef.current.value.trim(),
                md5(this.passwordRef.current.value.trim()),
                this.rememberRef.current.value
            )
                .then(res => {
                    const data: { fullname: string, email: string, username: string, token: string } = res.data;
                    appStore.setFullName(data.fullname);
                    appStore.setToken(data.token);
                    appStore.setUsername(data.username);
                    store.redirect = true;
                    alert('Đăng nhập thành công');
                })
                .catch(err => alert('Xin lỗi! Dường như đã có lỗi xảy ra.'));
        }
        event.preventDefault();
    };

    // @ts-ignore
    // tslint:disable-next-line
    public componentDidMount() {
        if (appStore.account.username) {
            this.usernameRef.current.value = appStore.account.username;
        }
    }

    // @ts-ignore
    // tslint:disable-next-line
    public render() {
        return (
            <>
                <Container id="Login-page" className="mt-1">
                    <Row>
                        <Col xs={12} lg={{span: 4, offset: 4}}>
                            <Card className="my-lg-5">
                                <Card.Body>
                                    <h4 className="font-weight-bold mb-3">Đăng nhập</h4>
                                    <Form
                                        noValidate={false}
                                        validated={store.getValidated}
                                        onSubmit={this.onSubmit}>
                                        <Form.Group>
                                            <Form.Label className="small">Tài khoản</Form.Label>
                                            <Form.Control as="input"
                                                          ref={this.usernameRef}
                                                          type="text" required={true}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <Form.Label className="small">Mật khẩu</Form.Label>
                                                <Link to="" className="small">Quên mật khẩu</Link>
                                            </div>
                                            <Form.Control as="input"
                                                          ref={this.passwordRef}
                                                          type="password" required={true}/>
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
                {store.redirect && <Redirect to='/'/>}
            </>
        )
    }
}
