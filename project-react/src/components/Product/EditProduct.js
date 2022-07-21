import React, { useEffect, useState } from 'react'
import FormError from '../FormError/FormError'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function isFileImage(file) {
    const imageReal = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/JPG', 'image/PNG']
    return file && imageReal.includes(file['type']);
}

function EditProduct() {
    const params = useParams();
    useEffect(() => {
        let dataAuth = localStorage.getItem("dataAuth")
        if (dataAuth) {
            dataAuth = JSON.parse(dataAuth);
            setUserIds(dataAuth.Auth.id)
            setTokens(dataAuth.success.token)
        }
        axios.get("http://localhost/API/laravel/public/api/category-brand")
            .then(res => {
                setCategorys(res.data.category)
                // console.log(res.data.category)
                setBrands(res.data.brand)
            })
        axios.get("http://localhost/API/laravel/public/api/user/product/" + params.idProduct ,
            {
                headers: {
                    "Authorization": "Bearer " + dataAuth.success.token,
                }
            })
            .then(res => {
                let product = res.data.data
                console.log(product.image)
                setInputs({
                    name: product.name,
                    price: product.price,
                    category: product.id_category,
                    brand: product.id_brand,
                    company: product.company_profile,
                    detail: product.detail,
                    status: product.status,
                    sale: product.sale,
                })
                setAvatarOld(product.image)
            })

    }, [])
    const [tokens, setTokens] = useState("")
    const [errors, setErrors] = useState({})
    const [avatarChecks, setAvatarChecks] =useState([]) 
    const [avatarOlds, setAvatarOld] = useState("")
    const [userIds, setUserIds] = useState("")
    const [avatars, setAvatars] = useState("")
    const [categorys, setCategorys] = useState([])
    const [brands, setBrands] = useState([])
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 1,
        sale: "",
    })
    const handleUserInputFile = (e) => {
        const file = e.target.files;
        setAvatars(file);
        // console.log(file.length)
    }

    function handleChangeValue(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    function renderSale() {
        if (inputs.status == 0) {
            return (
                <input name="sale" placeholder="0" onChange={handleChangeValue} />
            )
        }
    }
    function getCategory() {
        const myCategory = categorys.find((category)=> {
            return category.id == inputs.category;
        })
        return myCategory.category
    }

    function getBrand() {
        const myBrand = brands.find((brand)=> {
            return brand.id == inputs.brand;
        })
        return myBrand.brand
    }
    
    function handleCheckbox(e) {
        const myCheckbox = e.target.value;
        const isChecked = e.target.checked;
        let count = 0;
        // console.log("isChecked",isChecked)
        // console.log(myCheckbox)
        if(isChecked === true) {
            setAvatarChecks([...avatarChecks, myCheckbox])
        } else {
            const myAvatarCheck = avatarChecks.filter((avatarCheck)=> {
                return avatarCheck !== myCheckbox
            })
            setAvatarChecks(myAvatarCheck)

        }

        // setAvatarChecks(pre => {
        //     if(isChecked) {
        //         return [...pre, myCheckbox]
        //     }
        //     else {
        //         return avatarChecks.filter((avatarCheck)=> {
        //             return avatarCheck !== myCheckbox
        //         })
        //     }
        // })

        // setAvatars(myCheckbox)
        // ischecked => uncheck, !ischecked => check
    }   
    console.log(avatars.length - avatarChecks.length)
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if (inputs.name === undefined || inputs.name === "") {
            flag = false;
            errorSubmit.name = "Vui long nhap name";
        }

        if (inputs.price === undefined || inputs.price === "") {
            flag = false;
            errorSubmit.price = "Vui long nhap price";
        }

        if (inputs.category === undefined || inputs.category === "") {
            flag = false;
            errorSubmit.category = "vui long chon category";
        }

        if (inputs.brand === undefined || inputs.brand === "") {
            flag = false;
            errorSubmit.brand = "vui long chon brand";
        }

        if (avatars.length === "" || avatars.length === undefined) {
            flag = false;
            errorSubmit.avatar = "vui long chon anh";
        } else if (avatars.length > 3) {
            flag = false;
            errorSubmit.avatar = "vui long chon toi da 3 anh"
        } else {
            Object.values(avatars).map((avatar) => {
                if (!isFileImage(avatar)) {
                    flag = false;
                    errorSubmit.avatar = "FILE khong phai anh";
                } else if (isFileImage(avatar) && avatar.size > 1024 * 1024) {
                    flag = false;
                    errorSubmit.avatar = "Kich thuoc anh qua lon";
                }
            })
        }
    
        if(avatars.length - avatarChecks.length > 2) {
            flag = false;
            errorSubmit.avatar = "vui long chon toi da 3 anh"
        }

        if (avatars.length > 3) {
            flag = false;
            errorSubmit.avatar = "vui long chon toi da 3 anh"
        }
        if (avatars.length === "" || avatars.length === undefined) {
            flag = false;
            errorSubmit.avatar = "vui long chon anh";
        }
        if(avatars.length > 0 && avatars.length < 4) {
            Object.values(avatars).map((avatar) => {
                console.log(avatar)
                if (!isFileImage(avatar)) {
                    flag = false;
                    errorSubmit.avatar = "FILE khong phai anh";
                } else if (isFileImage(avatar) && avatar.size > 1024 * 1024) {
                    flag = false;
                    errorSubmit.avatar = "Kich thuoc anh qua lon";
                }
            })
        }
       
        if (!flag) {
            setErrors(errorSubmit);
        } else {
            let url =
                "http://localhost/API/laravel/public/api/user/edit-product/" + params.idProduct ;
            let accessToken = tokens;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            };

            let formData = new FormData();
            formData.append("name", inputs.name);
            formData.append("price", inputs.price);
            formData.append("category", inputs.category);;
            formData.append("brand", inputs.brand);
            formData.append("company", inputs.company);
            formData.append("detail", inputs.detail);
            formData.append("status", inputs.status);
            formData.append("sale", inputs.sale);
            
          
            Object.keys(avatars).map((key, i) => {
               
                formData.append("file[]", avatars[key])
               
            });
            
            avatarChecks.map((avatarCheck) => {
                
                formData.append("avatarCheckBox[]", avatarCheck)
              
            });

            axios.post(url, formData, config).then((res) => {
                console.log(res)
            });
        }
    }

    return (
        <>
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
            <div className="signup-form col-sm-9">{/*sign up form*/}
                <h2>Update product!</h2>
                <FormError errors={errors} />
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <input type="text" name="name" placeholder="Name" defaultValue={inputs.name} onChange={handleChangeValue} />
                    <input type="text" name="price" placeholder="Price" defaultValue={inputs.price} onChange={handleChangeValue} />
                    <select name="category" onChange={handleChangeValue}>
                        <option defaultValue={inputs.id_category} value="">{categorys.length>0 && inputs.category !== ""  ? getCategory() : "loading"}</option>
                        {categorys.map((category) =>
                            <option value={category.id} key={category.id}>
                                {category.category}
                            </option>
                        )}
                    </select>
                    <select name="brand" onChange={handleChangeValue}>
                        <option defaultValue={inputs.id_brand} value="">{brands.length>0 && inputs.brand !== "" ? getBrand() : "loading"}</option>
                        {brands.map((brand) =>
                            <option value={brand.id} key={brand.id}>
                                {brand.brand}
                            </option>
                        )}
                    </select>
                    <select value={inputs.status} id='status' name="status" onChange={handleChangeValue}>
                        <option value='1'>new</option>
                        <option value='0'>sale</option>
                    </select>
                    {renderSale()}
                    <input type="text" defaultValue={inputs.company} name="companyProfile" placeholder="Company profile" onChange={handleChangeValue} />
                    <input type="file" name='files[]' onChange={handleUserInputFile} multiple />
                    <div className='containerCheckbox'>
                        {Object.values(avatarOlds).map((avatarOld, key) => {
                            return (
                                <>
                                    <img key={key} className="imageDetail" src={"http://localhost/API/laravel/public/upload/user/product/" + userIds+ "/" + avatarOld} alt="" />
                                    <input type="checkbox" value={avatarOlds} onChange={handleCheckbox} />
                                </>
                            )
                        })
                        }
                    </div>
                    <textarea defaultValue={inputs.detail} placeholder='Detail' name='detail' onChange={handleChangeValue} >

                    </textarea>
                    <button type="submit" onClick={handleSubmit} className="btn btn-default">Update</button>
                </form>
            </div>
        </>
    )
}

export default EditProduct