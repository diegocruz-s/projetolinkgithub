import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { api } from '../services/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [auth, setAuth] = useState(false);

    useEffect(()=>{
        const objUser = JSON.parse(user);

        if(user){
            setUser(objUser);
        }

        setLoading(false)

    }, [])
    
    useEffect(() => {
        if(user){
            setAuth(true)
            api.defaults.headers.authorization = `Bearer ${user.token}`
        }else{
            setAuth(false)
        }
    }, [user])


    const login = async (email, password) => {

        setLoading(true)

        const url = `/users/login`;
        const user = {
            email, password
        }

        const response = await api.post(url, user)
                        .then((res) => res.data)
                        .catch((res) => res.response.data);

        if(response.error){
            setError(false)
            setError(response.error);
            setLoading(false)
            return;
        }else{
            setError(false);
        }

        setUser(response);

        api.defaults.headers.authorization = `Bearer ${response.token}`

        setLoading(false);
        localStorage.setItem('user', JSON.stringify(response));

    }

    const register = async (user) => {

        setLoading(true);

        const url = `/users`;

        const response = await api.post(url, user)
                        .then(res => res.data)
                        .catch(res => res.response.data);

        if(response.error){
            setError(false)
            setError(response.error)
            setLoading(false)
        }else{
            setError(false);
        }

        api.defaults.headers.authorization = `Bearer ${response.token}`

        setUser(response);

        setLoading(false)

        localStorage.setItem('user', JSON.stringify(response));

    }

    const logout = () => {
        setError(false);
        localStorage.removeItem('user');
        api.defaults.headers.authorization = null;
        setLoading(false);
        setUser(null);

    }

    return(
        <AuthContext.Provider value={{ 
            auth, 
            login, 
            register, 
            logout, 
            loading, 
            error, 
            user 
        }}>
            { children }
        </AuthContext.Provider>
    )
}