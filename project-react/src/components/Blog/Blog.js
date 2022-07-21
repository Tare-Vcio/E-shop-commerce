import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import API from "../API/Api"

function Blog() {
  const [blogs, setBlogs] = useState()

  useEffect(() => {

    
    API.get("api/blog")
      .then(res => {
        setBlogs(res.data.blog.data)
      })
  }, [])
  const blogItem = () => {
    console.log(blogs);
    return (
      <div>
        {blogs.map((blog, index) =>
          <div className="single-blog-post" component="div" key={index}>
            <h3>{blog.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" /> Mac Doe</li>
                <li><i className="fa fa-clock-o" />{blog.created_at.split(" ")[1]}</li>
                <li><i className="fa fa-calendar" />{blog.created_at.split(" ")[0]}</li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <Link to="#">
              <img src={"http://localhost/API/laravel/public/upload/Blog/image/" + blog.image} alt="" />
            </Link>
              <p>{blog.description}</p>
            <Link className="btn btn-primary" to={"/blog/detail/" + blog.id}>Read More</Link>
          </div>
          )}
      </div>
    )
  }
  return (
    <div>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>

                {blogs && blogItem()}
                <div className="pagination-area">
                  <ul className="pagination">
                    <li><Link to="#" className="active">1</Link></li>
                    <li><Link to="#">2</Link></li>
                    <li><Link to="#">3</Link></li>
                    <li><Link to="#"><i className="fa fa-angle-double-right"/></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">{/*Footer*/}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="companyinfo">
                  <h2><span>e</span>-shopper</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <Link to="#">
                      <div className="iframe-img">
                        <img src="images/home/iframe1.png" alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o" />
                      </div>
                    </Link>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <Link to="#">
                      <div className="iframe-img">
                        <img src="images/home/iframe2.png" alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o" />
                      </div>
                    </Link>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <Link to="#">
                      <div className="iframe-img">
                        <img src="images/home/iframe3.png" alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o" />
                      </div>
                    </Link>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="video-gallery text-center">
                    <Link to="#">
                      <div className="iframe-img">
                        <img src="images/home/iframe4.png" alt="" />
                      </div>
                      <div className="overlay-icon">
                        <i className="fa fa-play-circle-o" />
                      </div>
                    </Link>
                    <p>Circle of Hands</p>
                    <h2>24 DEC 2014</h2>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="address">
                  <img src="images/home/map.png" alt="" />
                  <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Service</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><Link to="#">Online Help</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                    <li><Link to="#">Order Status</Link></li>
                    <li><Link to="#">Change Location</Link></li>
                    <li><Link to="#">FAQ’s</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Quock Shop</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><Link to="#">T-Shirt</Link></li>
                    <li><Link to="#">Mens</Link></li>
                    <li><Link to="#">Womens</Link></li>
                    <li><Link to="#">Gift Cards</Link></li>
                    <li><Link to="#">Shoes</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Policies</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><Link to="#">Terms of Use</Link></li>
                    <li><Link to="#">Privecy Policy</Link></li>
                    <li><Link to="#">Refund Policy</Link></li>
                    <li><Link to="#">Billing System</Link></li>
                    <li><Link to="#">Ticket System</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>About Shopper</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><Link to="#">Company Information</Link></li>
                    <li><Link to="#">Careers</Link></li>
                    <li><Link to="#">Store Location</Link></li>
                    <li><Link to="#">Affillate Program</Link></li>
                    <li><Link to="#">Copyright</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-sm-offset-1">
                <div className="single-widget">
                  <h2>About Shopper</h2>
                  <form action="#" className="searchform">
                    <input type="text" placeholder="Your email address" />
                    <button type="submit" className="btn btn-default"><i className="fa fa-arrow-circle-o-right" /></button>
                    <p>Get the most recent updates from <br />our site and be updated your self...</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <p className="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
              <p className="pull-right">Designed by <span><Link target="_blank" to="http://www.themeum.com">Themeum</Link></span></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Blog