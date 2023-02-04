import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
const Login = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    if (token) {
        history.push("/")
    }
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:5000/login", user)
            .then(res => {
                alert(res.data.message)
                localStorage.setItem('ud.detail', JSON.stringify(res.data.result));
                localStorage.setItem('token', JSON.stringify(res.data.result.token));
                history.push("/")
            })
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login