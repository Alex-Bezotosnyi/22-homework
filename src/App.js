import Routes from "./components/app/Routes";
import {AuthContext} from "./components/app/Data";
import {useEffect, useState} from "react";
import {localStorageKey} from "./components/app/Constants";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState();

    const signInHandle = () => {
        setIsAuth(true);
    }

    const signUpHandle = () => {
        setIsAuth(true);
    }

    const signOutHandle = () => {
        setIsAuth(false);
    }

    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem(localStorageKey);

        if(dataFromLocalStorage) {
            const {email, password, isAuth} = JSON.parse(dataFromLocalStorage);
            setUser({email, password});
            setIsAuth(isAuth);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            signInHandle,
            signUpHandle,
            signOutHandle,
            user,
            setUser,
        }}>
            <Routes/>
        </AuthContext.Provider>
    )
}

export default App;
