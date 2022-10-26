import React from "react";
import './register.css';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import axios from "axios";


export const Register = () => {
    const [registerForm, setRegisterForm] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);

    const handleChangeData = (e: React.FormEvent<HTMLFormElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        if (name === "confirmPassword") {
            if (value !== registerForm.password) {
                setErrorMsg("Passwords do not match");
            } else {
                setErrorMsg(undefined);
            }
        }
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(1);
        if (errorMsg || !registerForm.password || !registerForm.confirmPassword) {
            console.log(2);
            return;
        }


        if (registerForm.password !== registerForm.confirmPassword) {
            console.log(3);
            setErrorMsg("Passwords do not match");
            return;
        }
        try {
            console.log(3);
            await registerApp(registerForm);
            alert("Register successful!")
        } catch (err) {
            alert((err as any).response.data.message);
        }
    };
    return (
        <div className="screen">
            <form
                className="screen"
                onChange={handleChangeData}
                onSubmit={handleSubmitData}
            >
                <h2>Register</h2>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <div className="sec-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            required
                        />
                    </div>
                </div>
                <PasswordInput name="password" label="Password" />
                <PasswordInput
                    name="confirmPassword"
                    label="Confirm Password"
                    errorMsg={errorMsg}
                />
                <button className="register">Register</button>

            </form>
        </div>
    );
};

export const PasswordInput = ({
    name,
    label,
    errorMsg,
}: {
    name: string;
    label: string;
    errorMsg?: string;
}) => {
    const [visible, setVisible] = React.useState(false);
    return (
        <div className="password">
            <label htmlFor={name}>{label}</label>
            <div className="sec-2">
                <input
                    type={visible ? "text" : "password"}
                    name={name}
                    placeholder="············"
                    //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                    title="Required password > 8 characters, >1 number, >1 uppercase letter, >1 lowercase letter, 1 special letter"
                    required
                />
                {visible ? (
                    <EyeOutlined
                        onClick={() => {
                            setVisible(false);
                        }}
                    />
                ) : (
                    <EyeInvisibleOutlined
                        onClick={() => {
                            setVisible(true);
                        }}
                    />
                )}
            </div>
            {errorMsg && <span className="error">{errorMsg}</span>}
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