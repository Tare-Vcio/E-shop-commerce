import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


function MyProduct() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        token: "",
        userId: "",
    })
    const [infors, setInfors] = useState([])

    useEffect(() => {
        let dataAuth = localStorage.getItem("dataAuth")
        if (dataAuth) {
            dataAuth = JSON.parse(dataAuth);
            setInputs({
                userId: dataAuth.Auth.id,
                token: dataAuth.success.token,
            }) 
            axios.get("http://localhost/API/laravel/public/api/user/my-product",
            {
                headers: {
                    "Authorization": "Bearer " + dataAuth.success.token,
                }
            })
            .then(res => {
                console.log(res.data.data)
                setInfors(res.data.data)
            })
        }
    }, [])

    function handleDelete(e) {
        const idCategory = e.target.value;
        console.log(idCategory)
        let url = "http://localhost/API/laravel/public/api/user/delete-product/" + idCategory;
        let config = {
            headers: {
                "Authorization": "Bearer " + inputs.token,
            }
        }
        axios.get(url, config)
            .then(res => {
                console.log(res)
                setInfors(res.data.data)
            })
    }

    function handleEdit(e) {
        const idProduct = e.target.value;
        // props.valueBlog(idBlog);
        navigate(`/account/myProduct/editProduct/${idProduct}`);
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
            <div className='col-sm-8'>
                <div id="cart_items">
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="id">Id</td>
                                    <td className="name">Name</td>
                                    <td className="image">Image</td>
                                    <td className="price">Price</td>
                                    <td className="action">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(infors).map((information) => {
                                    let imageCategory = JSON.parse(information.image);  
                                    return (
                                        <tr className='tableCategory' key={information.id}>
                                            <td>{information.id}</td>
                                            <td>{information.name}</td>
                                            <td><img src={"http://localhost/API/laravel/public/upload/user/product/" + inputs.userId + "/" + imageCategory[0]} alt="" /></td>
                                            <td>{information.price}</td>
                                            <td className='actionEdit'>
                                                <button className='edit' value={information.id} onClick={handleEdit}>Edit</button>
                                                <button className='delete' value={information.id} onClick={handleDelete}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Link className="btn btn-default check_out" to="/account/myProduct/addProduct">Add New</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProduct