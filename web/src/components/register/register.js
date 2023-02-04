import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory();
    const token = localStorage.getItem('token');
    if (token) {
        history.push("/")
    }
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {

        const { firstName, lastName, email, password, reEnterPassword } = user
        if (firstName && lastName && email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && password && (password === reEnterPassword)) {
            axios.post("http://localhost:5000/register", user)
                .then(res => {
                    alert(res.data.message)
                    history.push("/login")
                })
        } else {
            alert("invalid input")
        }

    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="firstName" value={user.firstName} placeholder="First Name" onChange={handleChange}></input>
            <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register