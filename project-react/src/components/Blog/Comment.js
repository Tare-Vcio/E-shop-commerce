import axios from "axios";
import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

function Comment(props) {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMessages, setErrorsMessage] = useState("");
  // console.log(props.valueBlogTrans)
  const handleMessage = (e) => {
    // lay gia tri cua textarea
    const value = e.target.value;
    setMessage(value);
  };

  const handleComment = (e) => {
    // kiem tra da comment chưa
    let isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      alert("Vui lòng đăng nhập");
      navigate("/member/auth");
    } else {
      if (message === undefined || message === "") {
        setErrorsMessage("Vui long nhap comment");
      } else {
        let dataAuth = JSON.parse(localStorage.getItem("dataAuth"));
        let url =
          "http://localhost/API/laravel/public/api/blog/comment/" +
          props.idBlog;
        let accessToken = dataAuth.success.token;
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };
        const formData = new FormData();
        formData.append("id_blog", props.idBlog);
        formData.append("id_user", dataAuth.Auth.id);
        formData.append("id_comment", props.valueBlogTrans ? props.valueBlogTrans : 0);
        formData.append("comment", message);
        formData.append("image_user", dataAuth.Auth.avatar);
        formData.append("name_user", dataAuth.Auth.name);

         axios.post(url, formData, config).then((res) => {
          props.valComment(res.data.data)
          setMessage(res.data.data);
          console.log(res.data.data)
        });
      }
    }
  };
  
  return (
    <section>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <p>{errorMessages}</p>
              <textarea
                name="message"
                type="text"
                value={message}
                rows={11}
                onChange={handleMessage}
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleComment}
              >
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*/Repaly Box*/}
    </section>
  );
}
export default Comment;
