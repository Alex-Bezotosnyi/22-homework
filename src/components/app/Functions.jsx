import {localStorageKey} from "./Constants";

export const setStorageData = ({email, password, isAuth}) => {
    return new Promise((res) => {
        localStorage.setItem(localStorageKey, JSON
            .stringify({
                    email,
                    password,
                    isAuth,
                }
            ))
        res();
    })
}