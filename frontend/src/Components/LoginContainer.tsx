import React, { useState } from "react"
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm"

interface LoginContainerProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ setIsLoggedIn }) => {

    const [showSignUpOrLogin, setSignUpOrLogin] = useState<boolean>(false);

    const toggleSignUpOrLogin = (event: React.FormEvent<HTMLButtonElement>) => {
        setSignUpOrLogin((showSignUp) => {
            return !showSignUp;
        })
    }

    return (
        <div className="FormContainer">
            {!showSignUpOrLogin && 
                <LoginForm 
                    toggleSignUpOrLogin={toggleSignUpOrLogin}
                    setIsLoggedIn={setIsLoggedIn}
                />
            }
            {showSignUpOrLogin && 
                <SignUpForm
                    toggleSignUpOrLogin={toggleSignUpOrLogin}
                />
            }
        </div>
        
    )
}