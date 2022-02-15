import React, { useState } from "react"
import { sendSignUp } from "../Services/Fetch"

interface SignUpProps {
    toggleSignUpOrLogin: (event: React.FormEvent<HTMLButtonElement>) => void;
}

interface SignUpState {
    username: string; 
    password: string;
    email: string;
}

export const SignUpForm: React.FC<SignUpProps> = ({ toggleSignUpOrLogin }) => {

    const [signUpState, setSignUpState] = useState<SignUpState>({
        username: "",
        password: "",
        email: ""
    })

    const handleSignUpState = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setSignUpState({
            ...signUpState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        sendSignUp(signUpState).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="SignUpFormContainer">
            <h3>
                Sign up!
            </h3>
            <input
                name="username"
                placeholder="Username"
                value={signUpState.username}
                onChange={handleSignUpState}
            />
            <input
                name="password"
                placeholder="Password"
                value={signUpState.password}
                onChange={handleSignUpState}
            />
            <input
                name="email"
                placeholder="Email"
                value={signUpState.email}
                onChange={handleSignUpState}
            />
            <button
                onClick={handleSubmit}
            >
                Sign up
            </button>
            <button 
                onClick={toggleSignUpOrLogin}
            >
                Sign in
            </button>
        </div>
    )
}