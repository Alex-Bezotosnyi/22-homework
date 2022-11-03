import React, {useContext} from 'react';
import {AuthContext} from "../app/Data";
import {setStorageData} from "../app/Functions";
import {useNavigate} from "react-router-dom";
import MainCSS from "./Main.module.css"

const Main = () => {

    const HISTORY = useNavigate();

    const {signOutHandle} = useContext(AuthContext);

    const signOut = () => {
        setStorageData({
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            isAuth: false,
        }).then(() => {
            signOutHandle();
            HISTORY("/")
        })
    }

    return (
        <div className={MainCSS.container__wrapper}>
            <h1>Dashboard Page</h1>
            <button onClick={signOut}>
                Sign Out
            </button>
        </div>
    );
};

export default Main;