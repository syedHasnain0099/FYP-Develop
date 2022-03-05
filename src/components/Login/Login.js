import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import validateInfo from './validateInfo'
import './Login.css'
import axios from 'axios'
import userService from '../../services/UserService'
import { useStateValue } from '../StateProvider/StateProvider'
axios.defaults.baseURL =
  'http://rentalelectronics-env.eba-zs7v2ewu.ap-south-1.elasticbeanstalk.com/api/'
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

function Login(callback) {
  const [{}, dispatch] = useStateValue()
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })
  const addUser = () => {
    const emailCopy = email.split('@')
    dispatch({
      type: 'ADD_USER',
      user: emailCopy[0],
    })
  }

  const emailChangeHandler = (event) => {
    setValues({ ...values, error: false, email: event.target.value })
  }
  const passwordChangeHandler = (event) => {
    setValues({ ...values, error: false, password: event.target.value })
  }
  const { email, password, error, loading, redirectToReferrer } = values
  const submitHandler = (event) => {
    event.preventDefault()
    setErrors(validateInfo(values))
    setIsSubmitting(true)
    signin({ email, password })
  }
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/'></Redirect>
    }
  }
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showLoading = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading....</h2>
        </div>
      )
    )
  }

  const signin = (user) => {
    userService
      .loginUser(user.email, user.password)
      .then((verified_user) => {
        // navigate(RouteAdminDashboard);
        // console.log(data)
        // addUser()
        console.log("user data: ",verified_user);
        setValues({
          ...values,
          redirectToReferrer: true,
        })
      })
      .catch((err) => {
        let err_msg= err.response.data.error.message;
        if (!err.response) {
          err_msg='Error occured please try later';
        } 
        else if(err_msg == "Invalid identifier or password") {
          err_msg = err_msg.replace("identifier", "email");
        }
        setValues({
          ...values,
          error: err_msg,
          loading: false,
        })
      })
  }

  return (
    <div className='login-form-container'>
      <form className='login-form' onSubmit={submitHandler}>
        <h1>Sign-in</h1>
        <div className='login-form-inputs'>
          <label className='login-form-label'>E-mail</label>
          <input
            type='text'
            name='email'
            id='email'
            className='login-form-input'
            placeholder='Enter your Email'
            onChange={emailChangeHandler}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='login-form-inputs'>
          <label className='login-form-label'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='login-form-input'
            placeholder='Enter your Password'
            onChange={passwordChangeHandler}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type='submit' className='login-form-input-btn'>
          Login
        </button>

        <Link to='/SignUp' className='login-header__link'>
          <span className='login-form-input-login'>
            New to Rentoday? Sign-up <a href='#'>here</a>
          </span>
        </Link>
        <Link to='/ForgotPasswordForm' className='login-header__link'>
          <span className='login-form-input-login'>
            <a href='#'>Forgot Password? </a>
          </span>
        </Link>
      </form>
      {showError()}
      {showLoading()}
      {redirectUser()}
    </div>
  )
}

export default Login
