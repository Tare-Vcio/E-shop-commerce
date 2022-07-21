import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import {  useNavigate } from "react-router-dom"
import axios from 'axios';

function Rate(props) {
    const [rating, setRating] = useState(0)
    let navigate = useNavigate();

    // kiem tra login
    function handleRate() {
        console.log("có nhận")
        let isLogin = localStorage.getItem("isLogin");
        if (!isLogin) {
            alert('Vui long dang nhap!')
            navigate("/member/auth");
        } else {
            let dataAuth = JSON.parse(localStorage.getItem("dataAuth"));
            let url = "http://localhost/API/laravel/public/api/blog/rate/" + props.idBlog;
            let accessToken = dataAuth.success.token;
            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };
            const formData = new FormData();
            formData.append("blog_id", props.idBlog);
            formData.append("user_id", dataAuth.Auth.id);
            formData.append("rate", rating)

            axios.post(url, formData, config).then((res) => {
                console.log("res", res)
                // setRating(res.data.data);
                alert(res.data.message)
            });
        }
    }

    function changeRating(newRating) {
        let sum = 0;
        newRating.map((value) => {
            sum += value.rate
            console.log(value.rate)
        })
        let avg = sum / newRating.length;
        console.log(avg)
        setRating(avg)
    }

    useEffect(() => {
        axios.get("http://localhost/API/laravel/public/api/blog/rate/" + props.idBlog)
            .then(res => {
                console.log(res.data.data)
                changeRating(res.data.data)

            })
    }, [])

    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li onClick={handleRate}>
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={6}
                        name='rating'
                    />
                </li>
                <li className="color">(6 votes)</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li className="color"><link to="#" />Pink <span>/</span></li>
                <li className="color"><link to="#" />T-Shirt <span>/</span></li>
                <li className="color"><link to="#" />Girls</li>
            </ul>
        </div>
    );

}

export default Rate

