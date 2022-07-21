import React, { useState, useEffect } from 'react'
import FormError from '../FormError/FormError';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

function Account() {

    useEffect(() => {
        let dataAuth = localStorage.getItem("dataAuth")
        if (dataAuth) {
            dataAuth = JSON.parse(dataAuth);
            console.log(dataAuth.Auth.avatar)
            setInputs({
                name: dataAuth.Auth.name,
                email: dataAuth.Auth.email,
                phone: dataAuth.Auth.phone,
                address: dataAuth.Auth.address,
                avatar: dataAuth.Auth.avatar,
                id: dataAuth.Auth.id,
                token: dataAuth.success.token,
            })
        }
    }, [])
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: "", // hien tai dang la avatar cu
        id: "",
        token: "",
        password: "",
    })

    const [inputFiles, setInputFiles] = useState()
    const [avatars, setAvatar] = useState({})
    const [errors, setErrors] = useState({})

    function handleChangeValue(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    const handleUserInputFile = (e) => {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload=(e)=> {
            setAvatar(e.target.result)
            setInputFiles(file[0]);
        }
        reader.readAsDataURL(file[0]);
    }

    function handleSubmit(e) {
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

        if (inputFiles === undefined) {
            flag = false;
            errorSubmit.avatar = "Vui long chon anh";
        } else if (!isFileImage(inputFiles)) {
            flag = false;
            errorSubmit.avatar = "FILE khong phai anh";
        } else if (isFileImage(inputFiles) && inputFiles.size > 1024 * 1024) {
            flag = false;
            errorSubmit.avatar = "Kich thuoc anh qua lon";
        }

        if (!flag) {
            setErrors(errorSubmit);
        } else {
            let url =
                "http://localhost/API/laravel/public/api/user/update/" + inputs.id;
            let accessToken = inputs.token;
            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };
            const formData = new FormData();
            formData.append("id", inputs.id);
            formData.append("name", inputs.name);
            formData.append("email", inputs.email);;
            formData.append("password", inputs.password);
            formData.append("phone", inputs.phone);
            formData.append("address", inputs.address);
            formData.append("avatar", avatars);
            console.log(avatars)
            axios.post(url, formData, config).then((res) => {
                // props.valComment(res.data.data)
                localStorage.setItem("dataAuth", JSON.stringify(res.data));
                console.log(res.data)

            });
        }


    }

    return (
        <div>
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>ACCOUNT</h2>
                    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <Link data-toggle="collapse" data-parent="#accordian" to="#sportswear">
                                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                        ACCOUNT
                                    </Link>
                                </h4>
                            </div>
                            <div id="sportswear" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                        <li><Link to="#">Nike </Link></li>
                                        <li><Link to="#">Under Armour </Link></li>
                                        <li><Link to="#">Adidas </Link></li>
                                        <li><Link to="#">Puma</Link></li>
                                        <li><Link to="#">ASICS </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default" >
                            <div className="panel-heading">
                                <h4 className="panel-title" >
                                    <Link data-toggle="collapse" data-parent="#accordian" to="/account/myProduct">
                                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                        MY PRODUCT
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>{/*/category-products*/}
                    <div className="shipping text-center">{/*shipping*/}
                        {/* <img src={shipping } alt="" /> */}
                    </div>{/*/shipping*/}
                </div>
            </div>
            <div className="signup-form col-sm-5">{/*sign up form*/}
                <h2>User Update!</h2>
                <FormError errors={errors} />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="name" value={inputs.name} onChange={handleChangeValue} />
                    <input type="text" readOnly name="email" value={inputs.email} onChange={handleChangeValue} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChangeValue} />
                    <input type="text" name="phone" value={inputs.phone} onChange={handleChangeValue} />
                    <input type="text" name="address" value={inputs.address} onChange={handleChangeValue} />
                    <input type="file" name="avatar" onChange={handleUserInputFile} />
                    <button type="submit" className="btn btn-default" >Update</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    )
}

export default Account