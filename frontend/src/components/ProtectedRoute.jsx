import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN , ACCESS_TOKEN } from '../constants'
import { useState , useEffect } from 'react'

function ProtectedRoute({ children }) {
    const [isAuthorised, setAuthorised] = useState(null);

    useEffect(() => {
        auth().catch(() => setAuthorised(false))
    }, [])

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/auth/token/refresh", {
                refresh: refreshToken,
            });
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthorised(true);
            } else {
                setAuthorised(false);
            }
        } catch(error) {
            console.log(error);
            setAuthorised(false);
        }
    }

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;
            if(tokenExpiration < now){
                await refreshToken();
            } else {
                setAuthorised(true);
            }
        } else {
            setAuthorised(false);
        }
    };

    if(isAuthorised===null){
        return <div>LOADING...</div>;
    } 
    return isAuthorised ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;