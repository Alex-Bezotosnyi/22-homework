import React, {useContext, useState} from 'react';
import {AuthContext} from "../../app/Data";
import {setStorageData} from "../../app/Functions";
import {Link, useNavigate} from "react-router-dom";
import BlockIcon from "../../assets/padlock.png"
import SignUpCSS from "./SignUp.module.css";

const SignUp = () => {

    const HISTORY = useNavigate();

    const {signUpHandle, setUser} = useContext(AuthContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkImpression = /([A-Za-z]{3,})(@)([A-Za-z]{2,})(\.)([a-z]{2,})/g;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    const validateNames = () => {
        if (firstName.trim() === "" && lastName.trim() === "") {
            return SignUpCSS.container__forms_names
        } else if (firstName.length + lastName.length >= 30) {
            return SignUpCSS.success
        } else {
            return SignUpCSS.invalid
        }
    }

    function validateEmail() {
        if (email.trim() === "") {
            return SignUpCSS.container__forms_email;
        } else if (email.match(checkImpression)) {
            return SignUpCSS.success;
        } else {
            return SignUpCSS.invalid;
        }
    }

    function validatePassword() {
        if (password.length >= 8 &&
            upperCase.test(password) &&
            lowerCase.test(password)
        ) {
            return SignUpCSS.success;
        } else if (password.trim() === "") {
            return SignUpCSS.container__forms_password;
        }
        return SignUpCSS.invalid;
    }

    const onSubmit = () => {
        if (firstName.length + lastName.length < 30) {
            alert("First Name and Last Name should have more than 30 symbols in total")
            return;
        } else if (!email.match(checkImpression)) {
            alert("Email should consist of min 3 symbols, At sign(@), min 2 symbols, dot, min 2 symbols")
            return;
        } else if (!password.length >= 8 ||
            !upperCase.test(password) ||
            !lowerCase.test(password)) {
            alert("Password is less than 8 or doesn`t have One uppercase symbol or One lowercase symbol")
            return;
        }

        setStorageData({
            firstName,
            lastName,
            email,
            password,
            isAuth: false,
        }).then(() => {
            setUser({
                firstName,
                lastName,
                email,
                password,
            })
            signUpHandle();
            HISTORY("/SignIn");
        })
    }

    return (
        <div className={SignUpCSS.container__wrapper}>
            <div className={SignUpCSS.container__main}>
                <div className={SignUpCSS.container__box}>
                    <div className={SignUpCSS.container__blockIcon}>
                        <img src={BlockIcon}/>
                    </div>
                    <div className={SignUpCSS.container__name}>Sign up</div>
                    <div className={SignUpCSS.container__forms}>
                        <div className={SignUpCSS.container__forms_input}>
                            <div className={SignUpCSS.container__forms_names}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="First Name *"
                                        min="5"
                                        value={firstName}
                                        className={validateNames()}
                                        onChange={(event) => {
                                            setFirstName(event.target.value);
                                        }}/>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name *"
                                        min="5"
                                        value={lastName}
                                        className={validateNames()}
                                        onChange={(event) => {
                                            setLastName(event.target.value);
                                        }}/>
                                </div>
                            </div>
                            <div className={SignUpCSS.container__forms_email}>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    min="3"
                                    value={email}
                                    className={validateEmail()}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}/>
                            </div>
                            <div className={SignUpCSS.container__forms_password}>
                                <input
                                    type="password"
                                    placeholder="Password *"
                                    value={password}
                                    className={validatePassword()}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}/>
                            </div>
                            <button className={SignUpCSS.container__button} onClick={onSubmit} type="submit">
                                SIGH UP
                            </button>
                            <div className={SignUpCSS.container__text}>
                                Already have an account?
                                <Link to="/SignIn"> Sign in</Link>
                            </div>
                        </div>
                        <div className={SignUpCSS.container__text_bottom}>Copyright © Your Website 2020
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;