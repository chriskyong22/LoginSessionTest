import axios from "axios"
import { UserModel } from "../Models/User"
const BACKEND_BASE_URL = "http://localhost:3001/"

export const verifyLogin = async (username: string, password: string): Promise<unknown> => {
    const loginURL = BACKEND_BASE_URL + 'login';
    return axios.post(loginURL, {username, password}, {
        withCredentials: true
    });
}

export const sendSignUp = async (user: UserModel): Promise<String> => {
    const signUpURL = BACKEND_BASE_URL + 'signUp';
    return axios.post(signUpURL, user).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        return error.response.data;
    })
}

export const requestLogOut = async(): Promise<unknown> => {
    const logoutURL = BACKEND_BASE_URL + 'logout'
    return axios.get(logoutURL, {
        withCredentials: true
    });
}