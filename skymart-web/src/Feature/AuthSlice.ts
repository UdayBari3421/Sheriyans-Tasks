import { createSlice } from "@reduxjs/toolkit";
import { GlobleConfiguration } from "../globalConfig";

interface User {
    name: string,
    email: string,
    password: string
}

interface IsLoginType {
    isLoggedIn: boolean;
    loginType: string;
    user: User | null
}


const { LOGIN, REGISTER } = GlobleConfiguration;

const initialState: IsLoginType = {
    isLoggedIn: JSON.parse(localStorage.getItem("user") || "null"),
    loginType: LOGIN,
    user: JSON.parse(localStorage.getItem("user") || "null"),
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setIsLoggedIn: (state, { payload }) => {
            state.isLoggedIn = payload;
        },

        setLoginFormType: (state) => {
            state.loginType === LOGIN
                ? state.loginType = REGISTER
                : state.loginType = LOGIN
        },

        setUser: (state, { payload }) => {
            state.user = payload
        }
    },
});

export const {
    setIsLoggedIn,
    setLoginFormType,
    setUser
} = AuthSlice.actions;

export default AuthSlice.reducer;