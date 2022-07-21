import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userContext from "../Context/UserContext"


function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState({})
  const useCart = useContext(userContext)
  const [countCarts, setCountCarts] = useState(0)
  useEffect(() => {
    axios.get("http://localhost/API/laravel/public/api/product")
      .then(res => {
        console.log(res.data.data)
        setItems(res.data.data)
      })
  }, [])

  function handleGetId(id, e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      console.log('parent clicked');
      navigate("/myProduct/productDetail/" + id)
    }

    // const getId = e.target.value;
    // console.log(getId)
    // console.log(e)

  }

  function handleAdd(id) {
    console.log("children clicked")
    setCountCarts(countCarts => countCarts + 1);
    let itemLocals = {};
    let localStore = localStorage.getItem("itemCart");
    if (localStore) {
      localStore = JSON.parse(localStore)
      itemLocals = { ...localStore }
      itemLocals[id] = 1;
      Object.keys(localStore).map((key, index) => {
        if (key == id) {
          localStore[key]++;
          return itemLocals[id] = localStore[key];
        } 
      })
    } else {
      itemLocals[id] = 1;
    }

    localStorage.setItem("itemCart", JSON.stringify(itemLocals));

  }
  console.log(countCarts)

  return (
    <>
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-9 padding-right"><a data-toggle="collapse" data-parent="#accordian" href="">
                <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Features Items</h2>
                  {Object.values(items).map((item, key) => {
                    let imageItem = JSON.parse(item.image);
                    return (
                      <div key={key} className="col-sm-4">

                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src={"http://localhost/API/laravel/public/upload/user/product/" + item.id_user + "/" + imageItem[0]} alt="" />
                              <h2>{item.price}</h2>
                              <p>{item.name}</p>
                              <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                            </div>
                            
                            <div className="product-overlay" onClick={(e)=>handleGetId(item.id, e)} >
                              <div className="overlay-content">
                                <h2>{item.price}</h2>
                                <p>{item.name}</p>
                                
                                <a href="#" className="btn btn-default add-to-cart" onClick={() => handleAdd(item.id)}><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                          <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                              <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                              <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>{/*features_items*/}
                <div className="category-tab">{/*category-tab*/}
                  <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                      <li className="active"><a to="#tshirt" data-toggle="tab">T-Shirt</a></li>
                      <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                      <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                      <li><a href="#kids" data-toggle="tab">Kids </a></li>
                      <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active in" id="tshirt">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="blazers">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery4.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="sunglass">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="kids">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="poloshirt">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/*/category-tab*/}
              </a><div className="recommended_items"><a data-toggle="collapse" data-parent="#accordian" href="">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
              </a><div id="recommended-item-carousel" className="carousel slide" data-ride="carousel"><a data-toggle="collapse" data-parent="#accordian" href="#womens">
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
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
                            <link to="#" className="btn btn-default add-to-cart" /><i className="fa fa-shopping-cart" />Add to cart
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a><a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                      <i className="fa fa-angle-left" />
                    </a><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                      <i className="fa fa-angle-right" />
                    </a></div><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                  </a></div>{/*/recommended_items*/}<a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                </a></div><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
              </a></div><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
            </a></div><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
          </a></section><a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
        </a>
      </div>
    </>
  )
}
export default Home