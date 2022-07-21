
import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import API from "../API/Api"
import Comment from './Comment';
import Rate from './Rate';
import ListComment from './ListComment';

function Detail() {
  const params = useParams();
  const [blogs, setBlogs] = useState("")
  const [comments, setComments] = useState([])
  const [idBlogReplys, setIdBlogReplys] = useState("")

  useEffect(() => {
    API.get("api/blog/detail/" + params.id)
      .then(res => {
        setBlogs(res.data.data)
        console.log(res)
        setComments(res.data.data.comment)
        // setIdBlogReplys(res.data.data.comment)
      })
  }, [])

  function getComment(cmt) {
    console.log("cmt",cmt)
    console.log("befo",comments);
    setComments([cmt,...comments])
  }

  function getValueBlog(valueBlog) {
    setIdBlogReplys(valueBlog)
  }

  function renderDetail() {

    if (Object.keys(blogs).length > 0) {
      return (
        <div>
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              <div className="single-blog-post">
                <h3>{blogs.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" />{blogs.created_at.split(" ")[1]}</li>
                    <li><i className="fa fa-calendar" />{blogs.created_at.split(" ")[0]}</li>
                  </ul>
                  <span>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </span>
                </div>
                <Link to="#">
                  <img src={"http://localhost/API/laravel/public/upload/Blog/image/" + blogs.image} alt="" />
                </Link>
                <p>
                  {blogs.description}</p> <br />
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><Link to="#">Pre</Link></li>
                    <li><Link to="#">Next</Link></li>
                  </ul>
                </div>
              </div>
            </div>{/*/blog-post-area*/}
            <Rate idBlog={params.id} />
            <div className="socials-share">
              <Link to="#"><img src="images/blog/socials.png" alt="" /></Link>
            </div>{/*/socials-share*/}
            <div>
              <div className="media commnets">
                <Link className="pull-left" to="#">
                  <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                </Link>
                <div className="media-body">
                  <h4 className="media-heading">Annie Davis</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <div className="blog-socials">
                    <ul>
                      <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                    </ul>
                    <Link className="btn btn-primary" to="">Other Posts</Link>
                  </div>
                </div>
              </div>
              <ListComment trans={comments} valueBlog={getValueBlog}/>
              <Comment idBlog={params.id} valComment={getComment} valueBlogTrans={idBlogReplys}/>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <div>
      {renderDetail()}
    </div>
  )
}

export default Detail