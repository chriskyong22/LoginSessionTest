import React from "react"
import { requestLogOut } from "../Services/Fetch"

interface LogoutContainerProps { 
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutContainer: React.FC<LogoutContainerProps> = ({ setIsLoggedIn }) => {

    const handleLogOut = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        requestLogOut().then((response) => {
            setIsLoggedIn(false);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div>
            <button
                onClick={handleLogOut}
            >
                Log Out.
            </button>
        </div>
    )
}