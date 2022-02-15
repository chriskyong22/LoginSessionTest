import React, { useState } from "react";
import { verifyLogin } from "../Services/Fetch"

interface LoginFormProps {
    toggleSignUpOrLogin: (event: React.FormEvent<HTMLButtonElement>) => void;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginState {
    username: string; 
    password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleSignUpOrLogin, setIsLoggedIn }) => {

    const [loginState, setLoginState] = useState<LoginState>({
        username: "",
        password: ""
    });

    const handleLoginState = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setLoginState({
            ...loginState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        verifyLogin(loginState.username, loginState.password).then((response) => {
            setIsLoggedIn(true);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="LoginFormContainer">
            <h3>
                Login!
            </h3>
            <input
                name="username"
                placeholder="Username"
                value={loginState.username}
                onChange={handleLoginState}
            />
            <input
                name="password"
                placeholder="Password"
                value={loginState.password}
                onChange={handleLoginState}
            />
            <button
                onClick={handleSubmit}
            >
                Login
            </button>
            <button
                onClick={toggleSignUpOrLogin}
            >
                Sign up
            </button>
        </div>
    )
}