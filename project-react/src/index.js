import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './components/Blog/Blog'
import Detail from './components/Blog/Detail';
import Auth from './components/Member/Auth';
import Home from './components/Member/Home';
import Account from './components/Layout/Account';
import MyProduct from './components/Product/MyProduct';
import ProductDetail from './components/Product/ProductDetail';
import AddProduct from './components/Product/AddProduct';
import EditProduct from './components/Product/EditProduct';
import AccountCart from './components/Product/AccountCart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/blog/list" element={<Blog/>}/>
        <Route path="/blog/detail/:id" element={<Detail/>}/>
        <Route path="/member/auth" element={<Auth/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/myProduct" element={<MyProduct/>}/>
        <Route path="/account/myProduct/addProduct" element={<AddProduct/>}/>
        <Route path="/account/myProduct/editProduct/:idProduct" element={<EditProduct/>}/>
        <Route path="/myProduct/productDetail/:idProduct" element={<ProductDetail/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/cart" element={<AccountCart/>}/>

      </Routes>
    </App>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
