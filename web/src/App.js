import React from 'react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect,  useContext } from "react";
import { GlobalContext } from './context/Context';
import loaderImg from './img/loader.webp';
import axios from 'axios';
import Product from './components/product'
import Login from './components/login'
import SignUp from './components/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {

  let { state, dispatch } = useContext(GlobalContext);

  console.log("state: ", state);
  
  const logoutHandler = async () => {

    try {
      let response = await axios.post(`${state.baseUrl}/logout`,
        {},
        {
          withCredentials: true
        })
      console.log("response: ", response);

      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
    }

  }

  useEffect(() => {

    const getProfile = async () => {
      try {
        let response = await axios.get(
          `${state.baseUrl}/profile`,
          {
            withCredentials: true,
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          });

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])

  useEffect(() => {

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.withCredentials = true;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  }, [])




  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    {
      (state.isLogin === true) ?

          <div className="container">
            <Link className="navbar-brand" to={'/'}>
              ecommerce-app
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link className="navbar-brand" to={'/'}>
                  Product
                </Link>
                </li>
                <li className="nav-item">
                {state?.user?.firstName} {state?.user?.lastName}  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        : null
      }
    {
      (state.isLogin === false) ?
      
      <div className="container">
        <Link className="navbar-brand" to={'/sign-in'}>
        ecommerce-app
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={'/sign-in'}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/sign-up'}>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    : null
    }
    </nav>
    <div className="auth-wrapper">
  <div className="auth-inner">
    {(state.isLogin === true) ?
  
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    
      : null}

    {(state.isLogin === false) ?
      
    <Routes>
       <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
      </Routes>
     
       : null
    }

    {(state.isLogin === null) ?

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
        <img width={300} src={loaderImg} alt="" />
      </div>

      : null}
      </div>  
    </div>  
 </div>
     
  
  )
}
export default App