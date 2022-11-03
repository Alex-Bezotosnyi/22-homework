import React, {useContext, useState} from 'react';
import {AuthContext} from "../../app/Data";
import {Link, useNavigate} from "react-router-dom";
import {localStorageKey} from "../../app/Constants";
import BlockIcon from "../../assets/padlock.png"
import SignInCSS from "./SignIn.module.css";

const SignIn = () => {

    const HISTORY = useNavigate();

    const {signInHandle, setUser} = useContext(AuthContext);
    const [emailData, setEmail] = useState("");
    const [passwordData, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        const dataFromLocalStorage = localStorage.getItem(localStorageKey);
        console.log(dataFromLocalStorage);
        console.log(emailData)
        if (dataFromLocalStorage && dataFromLocalStorage.length) {
            const {email, password} = JSON.parse(dataFromLocalStorage);
            if (emailData === email && passwordData === password) {
                signInHandle();
                HISTORY("/Main")
            } else {
                alert("Something wrong with your input")
            }
        }
    }

    return (
        <div className={SignInCSS.container__wrapper}>
            <div className={SignInCSS.container__main}>
                <div className={SignInCSS.container__box}>
                    <div className={SignInCSS.container__blockIcon}>
                        <img src={BlockIcon}/>
                    </div>
                    <div className={SignInCSS.container__name}>Sign up</div>
                    <div className={SignInCSS.container__forms}>
                        <div className={SignInCSS.container__forms_input}>
                            <div className={SignInCSS.container__forms_email}>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    min="3"
                                    value={emailData}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}/>
                            </div>
                            <div className={SignInCSS.container__forms_password}>
                                <input
                                    type="password"
                                    placeholder="Password *"
                                    value={passwordData}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}/>
                            </div>
                            <button className={SignInCSS.container__button} onClick={onSubmit}>
                                SIGN IN
                            </button>
                            <div className={SignInCSS.container__text}>
                                Don`t have an account?
                                <Link to="/"> Sign Up</Link>
                            </div>
                            <div className={SignInCSS.container__text_bottom}>Copyright © Your Website 2020
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;