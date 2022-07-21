import React, { useState } from 'react'
import FormError from '../FormError/FormError';
import API from "../API/Api"

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

function isFileImage(file) {
    const imageReal = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/JPG', 'image/PNG']
    return file && imageReal.includes(file['type']);
}

function Register() {
    const [inputs, setInputs] = useState({})
    const [inputFiles, setInputFiles] = useState()
    const [errors, setErrors] = useState({})
    const [avatars, setAvatar] = useState({})

    const handleInput = (e) => {
            const nameInput = e.target.name;
            const value = e.target.value;
            setInputs(state => ({ ...state, [nameInput]: value }))
    }

    const handleUserInputFile=(e)=> {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload=(e)=> {
            setAvatar(e.target.result)// gui qua api
            setInputFiles(file[0]);
        }
        reader.readAsDataURL(file[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if (inputs.name === undefined || inputs.name === "") {
            flag = false;
            errorSubmit.name = "Vui long nhap name"
        }

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

        if (inputs.phone === undefined || inputs.phone === "") {
            flag = false;
            errorSubmit.phone = "Vui long nhap so dien thoai";
        }

        if (inputs.address === undefined || inputs.address === "") {
            flag = false;
            errorSubmit.address = "Vui long nhap dia chi";
        }
        
        if(inputFiles === undefined) {
            flag=false;
            errorSubmit.avatar="Vui long chon anh";
        } else if (!isFileImage(inputFiles)) {
            flag = false;
            errorSubmit.avatar = "FILE khong phai anh";
        } else if (isFileImage(inputFiles) && inputFiles.size > 1024 * 1024) {
            flag = false;
            errorSubmit.avatar = "Kich thuoc anh qua lon";
        }

        if (!flag) {
            setErrors(errorSubmit);
        }else {
            const dataRegister = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatars,
                level: 0
            }
            API.post("api/register", dataRegister)
            .then(res => {
                console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    setTimeout(() => alert('Dang ky thanh cong'), 100);
                }
            })
           
        }
        console.log(avatars)

    }

    return (
        <div>
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <FormError errors={errors} />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="name" placeholder="Name" onChange={handleInput} />
                    <input type="text" name="email" placeholder="Email Address" onChange={handleInput} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                    <input type="text" name="phone" placeholder="Phone" onChange={handleInput} />
                    <input type="text" name="address" placeholder="Address" onChange={handleInput} />
                    <input type="file" name="avatar" placeholder="Avatar" onChange={handleUserInputFile} />
                    <input type="number" name="level" placeholder="0" onChange={handleInput} disabled/>
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    )
}

export default Register