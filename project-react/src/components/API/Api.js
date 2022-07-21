import axios from 'axios'

export default axios.create({
    baseURL: `http://localhost/API/laravel/public/`
});

