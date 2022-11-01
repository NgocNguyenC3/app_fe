import React from "react";
import './register.css';
import {

    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import axios from "axios";

import 'antd/dist/antd.css';


export const Register = () => {
    const [form] = Form.useForm();

    const [registerForm, setRegisterForm] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleSubmitData = async (e: any) => {
        await setRegisterForm({
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password"),
            confirmPassword: form.getFieldValue("confirmPassword"),
        })
        e.preventDefault();
        if (!registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
            alert("Check all field again")
            return;
        }


        if (registerForm.password !== registerForm.confirmPassword) {
            alert("Password do not match")
            return;
        }
        try {
            await registerApp(registerForm);
            alert("Register successful!")
        } catch (err) {
            alert((err as any).response.data.message);
        }
    };
    return (
        <div className="screen">

            <Form
                form={form}
                className="screen"
            >
                <h2>Register</h2>
                <Form.Item
                    className="email"
                    name={"email"}
                    rules={[
                        { required: true },
                        { type: "email", message: "Please enter valid email" },
                    ]}
                >
                    <Input
                        className="input"
                        placeholder="example@gmail.com"
                        required
                    />
                </Form.Item>
                <Form.Item
                    className="password"
                    name={"password"}
                    rules={[
                        { required: true },
                        {
                            //pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            message:
                                "Required password > 8 characters, >1 number, >1 uppercase letter, >1 lowercase letter, 1 special letter",
                        },
                    ]}
                >
                    <Input.Password
                        className="input"
                        name={"pasword"}
                        placeholder={"Password"}
                        iconRender={(visible) =>
                            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        required
                    />
                </Form.Item>
                <Form.Item
                    className="password"
                    name={"confirmPassword"}
                    rules={[
                        { required: true },
                        {
                            message:
                                "Please enter a valid password with mininum 8 characters, at least one uppercase letter, one lowercase letter and one number",
                        },
                        {
                            validator: (rule, value) => {
                                if (value !== form.getFieldValue("password")) {
                                    return Promise.reject("Passwords do not match");
                                }
                            },
                        },
                    ]}
                >
                    <Input.Password
                        className="input"
                        name={"confirmPassword"}
                        placeholder={"confirm passoword"}
                        iconRender={(visible) =>
                            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <div className="button">
                        <Button
                            type="primary"
                            className="register"
                            ghost
                            onClick={handleSubmitData}
                        >
                            Register
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};



interface RegisterData {
    email: string;
    password: string;
}


export const axiosClient = axios.create({
    baseURL:
        "https://appbeus.herokuapp.com/",
});
export const registerApp = (data: RegisterData) => {
    return axiosClient.post("v1/auth/register", data);
};