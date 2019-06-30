import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import axios from "axios";

import "./Register.component.scss";
import MyFormControlValidateStore, {Validations} from "../stores/MyFormValidate.store";

@observer
export default class RegisterComponent extends Component {
    @observable validated = false;

    constructor(props) {
        super(props);
        this.registerForm = {
            fullName: new MyFormControlValidateStore([
                Validations.required(),
                Validations.regexp(/^[A-z\s]{8,}$/)
            ]),
            email: new MyFormControlValidateStore([
                Validations.required(),
                Validations.regexp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            username: new MyFormControlValidateStore([
                Validations.required(),
                Validations.regexp(/^[0-9a-z]{6,16}$/)
            ]),
            password: new MyFormControlValidateStore([
                Validations.required(),
                Validations.regexp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/),
            ])
        };
    }

    // Event submit form.
    onSubmit = (event) => {
        axios.get('http://localhost:3000/test')
            .then(response => {
                console.log(response);
            });
        event.preventDefault();
        /*this.validated = false;
        let valid = true;
        Object.keys(this.registerForm).map((key) => {
            if (!this.registerForm[key].checkValidate()) {
                valid = false;
            }
        });

        if (valid) {
            alert('hehe');
        } else {
            this.validated = true;
            event.preventDefault();
        }*/
    };

    render() {
        return (
            <Container id="Register-page" className="mt-1">
                <Row>
                    <Col xs={12} lg={{span: 4, offset: 4}}>
                        <Card className="my-lg-5">
                            <Card.Body>
                                <h4 className="font-weight-bold mb-3">Đăng ký</h4>
                                <Form
                                    noValidate
                                    validated={this.getValidated}
                                    onSubmit={this.onSubmit}>
                                    <Form.Group>
                                        <Form.Label className="small">Họ và Tên</Form.Label>
                                        <Form.Control ref={this.fullNameCrtl.ref}
                                                      isInvalid={this.fullNameCrtl.isInValid}
                                                      onChange={e => this.fullNameCrtl.checkValidate()}
                                                      type="text"/>
                                        {this.fullNameCrtl.error.required && <Form.Control.Feedback type='invalid'>
                                            Không được bỏ trống.
                                        </Form.Control.Feedback>}
                                        {this.fullNameCrtl.error.regexp && <Form.Control.Feedback type='invalid'>
                                            Phải có từ 8 ký tự trở lên và chỉ bao gồm ký tự hoa, thường và space.
                                        </Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="small">Email</Form.Label>
                                        <Form.Control as="input"
                                                      isInvalid={this.emailCtrl.isInValid}
                                                      onChange={e => this.emailCtrl.checkValidate()}
                                                      ref={this.emailCtrl.ref} type="email"/>
                                        {this.emailCtrl.error.required &&
                                        <Form.Control.Feedback type="invalid">Không được bỏ
                                            trống.</Form.Control.Feedback>}
                                        {this.emailCtrl.error.regexp &&
                                        <Form.Control.Feedback type="invalid">Email không hợp
                                            lệ.</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="small">Tài khoản</Form.Label>
                                        <Form.Control as="input"
                                                      isInvalid={this.usernameCtrl.isInValid}
                                                      onChange={e => this.usernameCtrl.checkValidate()}
                                                      ref={this.usernameCtrl.ref}
                                                      type="text"/>
                                        {this.usernameCtrl.error.required && <Form.Control.Feedback type="invalid">
                                            Không được bỏ trống.
                                        </Form.Control.Feedback>}
                                        {this.usernameCtrl.error.regexp &&
                                        <Form.Control.Feedback type="invalid">Phải có từ 6 đến 16 ký tự. Có thể bao gồm
                                            ký tự
                                            thường hoặc số.</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="small">Mật khẩu</Form.Label>
                                        <Form.Control as="input"
                                                      isInvalid={this.passwordCtrl.isInValid}
                                                      onChange={e => this.passwordCtrl.checkValidate()}
                                                      ref={this.passwordCtrl.ref}
                                                      type="password"/>
                                        {this.passwordCtrl.error.required &&
                                        <Form.Control.Feedback type="invalid">Không được bỏ
                                            trống.</Form.Control.Feedback>}
                                        {this.passwordCtrl.error.regexp &&
                                        <Form.Control.Feedback type="invalid">Phải có từ 8 đến 24 ký tự. Bao gồm ký tự
                                            thường, hoa và số.</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">Đăng ký</Button>
                                    </Form.Group>
                                    <Form.Group className="text-center">
                                        <Form.Label className="small">Bạn đã có tài khoản?
                                            <Link to="/login" className="pl-1 font-italic">Đăng
                                                nhập</Link></Form.Label>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }


    @computed
    get getValidated() {
        return this.validated;
    }

    get fullNameCrtl() {
        return this.registerForm.fullName;
    }

    get emailCtrl() {
        return this.registerForm.email;
    }

    get usernameCtrl() {
        return this.registerForm.username;
    }

    get passwordCtrl() {
        return this.registerForm.password;
    }
}

