import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function ProductDetail() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const params = useParams();
    const [infoProductDetails, setInfoProductDetails] = useState([])
    const [images, setImages] = useState([])
    const [keyImages, setKeyImages] = useState("")
    useEffect(() => {
        axios.get("http://localhost/API/laravel/public/api/product/detail/" + params.idProduct)
            .then(res => {
                console.log(res.data.data)
                setInfoProductDetails(res.data.data)
                setImages(JSON.parse(res.data.data.image))
            })
    }, [])

    function handleGetIndex(index) {
        console.log(index)
        setKeyImages(index)
    }
    return (

        <div className="col-sm-9 padding-right">
            <Modal show={show} onHide={handleClose}>
                <Modal.Body><img src={"http://localhost/API/laravel/public/upload/user/product/" + infoProductDetails.id_user + "/" + images[keyImages]} alt="" /></Modal.Body>
            </Modal>
            <div className="product-details">{/*product-details*/}

                <div className="col-sm-5" >
                    <div className="view-product" onClick={handleShow}>
                        <img src={"http://localhost/API/laravel/public/upload/user/product/" + infoProductDetails.id_user + "/" + images[keyImages]} alt="" />
                        <a rel="prettyPhoto"><h3>ZOOM</h3></a>
                    </div>
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        {/* Wrapper for slides */}
                        <div className="carousel-inner">
                            <div className="item active">
                                {
                                    images.map((image, key) => {
                                        return (
                                            <img key={key} onClick={()=>handleGetIndex(key)} src={"http://localhost/API/laravel/public/upload/user/product/" + infoProductDetails.id_user + "/" + image} alt="" />
                                        )
                                    })
                                }
                            </div>
                            <div className="item">
                                <a href=""><img src="images/product-details/similar1.jpg" alt="" /></a>
                                <a href=""><img src="images/product-details/similar2.jpg" alt="" /></a>
                                <a href=""><img src="images/product-details/similar3.jpg" alt="" /></a>
                            </div>
                            <div className="item">
                                <a href=""><img src="images/product-details/similar1.jpg" alt="" /></a>
                                <a href=""><img src="images/product-details/similar2.jpg" alt="" /></a>
                                <a href=""><img src="images/product-details/similar3.jpg" alt="" /></a>
                            </div>
                        </div>
                        <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                        </a>

                        <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                        </a>

                    </div>
                    {/* Controls */}

                </div>

                <div className="col-sm-7">
                    <a className="right item-control" href="#similar-product" data-slide="next">
                        <div className="product-information">{/*/product-information*/}
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{infoProductDetails.name}</h2>
                            <p>Web ID: {infoProductDetails.web_id}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>{infoProductDetails.price}</span>
                                <label>Quantity:</label>
                                <input type="text" defaultValue={0} />
                                <button type="button" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart 
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> {infoProductDetails.condition}</p>
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <a href="" /><img src="images/product-details/share.png" className="share img-responsive" alt="" />
                        </div>{/*/product-information*/}
                    </a>
                </div>
            </div>
            <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="companyprofile">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tag">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                            <ul>
                                <li><a href='#' ><i className="fa fa-user" />EUGEN</a></li>
                                <li><a href='#' ><i className="fa fa-clock-o" />12:41 PM</a></li>
                                <li><a href='#' ><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name defaultValue={""} />
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>{/*/category-tab*/}
            {/*/product-details*/}

            <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <div className="recommended_items">{/*recommended_items*/}
                        <h2 className="title text-center">recommended items</h2>
                        <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/recommend3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                <i className="fa fa-angle-left" />
                            </a><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                <i className="fa fa-angle-right" />
                            </a></div><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        </a></div>{/*/recommended_items*/}<a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                    </a></div></div>

        </div >
    );
}

export default ProductDetail