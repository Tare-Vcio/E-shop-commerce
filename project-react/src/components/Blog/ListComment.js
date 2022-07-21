import React from 'react'
import { Link } from 'react-router-dom';


function ListComment(props) {

  const handleReply = (e) => {
    const idBlog = e.target.id;
    props.valueBlog(idBlog);
    console.log(idBlog)
  }
  function fetchData() {
    if (Object.keys(props.trans).length > 0) {
      return props.trans.map((value, key) => {
        if (value.id_comment == 0) {
          return (
            <React.Fragment key={key} >
              <li key={key} className="media">
                <Link className="pull-left" to="#">
                  <img className="media-object" src={"http://localhost/API/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                </Link>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{value.name_user}</li>
                    <li><i className="fa fa-clock-o" />{value.created_at}</li>
                    <li><i className="fa fa-calendar" />{value.updated_at}</li>
                  </ul>
                  <p>{value.comment}</p>
                  <a className="btn btn-primary" id={value.id} onClick={handleReply} ><i className="fa fa-reply" />Replay</a>
                </div>
              </li>
              {props.trans.map((value2, key2) => {
                if (value.id == value2.id_comment) {
                  return (
                    <li key={key2} className="media second-media">

                      <a className="pull-left" href="#">
                        <img className="media-object" src="" alt="" />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user"></i>{value2.name_user}</li>
                          <li><i className="fa fa-clock-o"></i>{value2.created_at}</li>
                          <li><i className="fa fa-calendar"></i>{value2.updated_at}</li>
                        </ul>
                        <p>{value2.comment}</p>
                      </div>
                    </li>
                  )
                }
              })}
            </ React.Fragment>
          )
        }
      })
    }
  }
  return (
    <div className="response-area">
      <ul className='media-list'>
        {fetchData()}
      </ul>
    </div>


  )
}

export default ListComment