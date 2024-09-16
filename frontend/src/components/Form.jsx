import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN , REFRESH_TOKEN } from "../constants";

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return <form onSubmit={handleSubmit}>
        <h1>{name}</h1>
        <input type="text" name="username" id="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="button" value="{name}" className="btn btn-primary form-control" />
    </form>
}

export default Form