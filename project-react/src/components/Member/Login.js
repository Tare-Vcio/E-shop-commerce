import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import FormError from '../FormError/FormError'
import API from "../API/Api"

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

function Login() {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({})
    let isLogin = false;

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if (inputs.email === undefined || inputs.email === "") {
            flag = false;
            errorSubmit.email = "Vui long nhap email";
        } else if (!isEmail(inputs.email)) {
            flag = false;
            errorSubmit.email = "Vui long nhap dung dinh dang email";
        }

        if (inputs.password === undefined || inputs.password === "") {
            flag = false;
            errorSubmit.password = "vui long nhap password";
        }

        if(!flag) {
            setErrors(errorSubmit)
        } else {
            const dataLogin = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            }
            API.post("api/login", dataLogin)
            .then(res => {
                console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                    isLogin = false;
                } else {
                    isLogin = true
                    alert("Đăng nhập thành công")
                    localStorage.setItem("isLogin" ,JSON.stringify(isLogin));
                    localStorage.setItem("dataAuth", JSON.stringify(res.data))  
                    navigate("/home")
                }
            })
        }
    }
    return (
        <div>
            <FormError errors={errors}/>
            <div className="login-form" >{/*login form*/}
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="email" placeholder="Email Address" onChange={handleInput}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
        </div>
    )
}

export default Login