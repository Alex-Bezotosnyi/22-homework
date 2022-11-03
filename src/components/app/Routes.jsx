import React from "react";
import {Route, Routes as RoutesApp} from "react-router-dom";
import SignUp from "../auth/SignUp/SignUp";
import SignIn from "../auth/SignIn/SignIn";
import Main from "../Main/Main";

const Routes = () => {
    return <RoutesApp>
        {
            <>
                <Route path="/" element={<SignUp/>}/>
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/Main" element={<Main/>}/>
                <Route path="*" element={<SignUp/>}/>
            </>
        }
    </RoutesApp>
}

export default Routes;