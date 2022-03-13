import React, { useState, useEffect } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import validateInfo from './validateInfo'
import './Login.css'
import axios from 'axios'
import userService from '../../services/UserService'
import { useStateValue } from '../StateProvider/StateProvider'
axios.defaults.baseURL =
  'http://renttoday14-env.eba-csx4ziu6.ap-south-1.elasticbeanstalk.com/api/'
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
    checkUserExistance({ email, password })
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/'></Redirect>
    }
  }
  const showError = () => (
    <div className='login-form-error' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const checkUserExistance = (user) => {
    userService
      .userExists(user.email)
      .then((res) => {
        if (res === true) {
          signin(user)
        } else {
          console.log("user with these credentials doesn't exists")
        }
      })
      .catch((err) => console.log(err))
  }
  const signin = (user) => {
    userService
      .loginUser(user.email, user.password)
      .then((verified_user) => {
        console.log('user data: ', verified_user)
        setValues({
          ...values,
          redirectToReferrer: true,
        })
      })
      .catch((err) => {
        let err_msg = err.response.data.error.message
        if (!err.response) {
          err_msg = 'Error occured please try later'
        } else if (err_msg == 'Invalid identifier or password') {
          err_msg = err_msg.replace('identifier', 'email')
        }
        setValues({
          ...values,
          error: err_msg,
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
        <span className='signup-form-input-login'>
          New to Rentoday? Sign-up <NavLink to='/SignUp'>here</NavLink>
        </span>
        <span className='signup-form-input-login'>
          <NavLink to='/ForgotPasswordForm'>Forgot Password?</NavLink>
        </span>
      </form>
      {showError()}
      {redirectUser()}
    </div>
  )
}

export default Login
