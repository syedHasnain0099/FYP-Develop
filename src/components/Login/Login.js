import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import validateInfo from './validateInfo'
import './Login.css'
import axios from 'axios'
import userService from '../../services/UserService'

axios.defaults.baseURL = 'http://rentalelectronics-env.eba-zs7v2ewu.ap-south-1.elasticbeanstalk.com/api/';
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;


// import { useStateValue } from '../StateProvider/StateProvider'
function Login(callback) {
  // const [{}, dispatch] = useStateValue()
  // const addUser = (event) => {
  //   dispatch({
  //     type: 'ADD_USER',
  //     user: event.target.value,
  //   })
  //   console.log(event.target.value)
  // }

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  // const tokenUpdate = () => {
  //   const token = localStorage.getItem('token');
  //   if (token)
  //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   else
  //     delete axios.defaults.headers.common.Authorization;
  // };
  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && isSubmitting) {
  //     callback()
  //   }
  // }, [errors])
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
				.then((data) => {
					// navigate(RouteAdminDashboard);
          console.log(data);
          setValues({
          ...values,
          redirectToReferrer: true,
        })
				})
				.catch((err) => {
          setValues({
          ...values,
          error: err.response.data.error.message,
          loading: false,
        })
					if (!err.response) {
						setServerError('Error occured please try later');
					} else {
						setServerError('');
						// setFieldError('Password', err.response.data.error.message);
					}
				})

    // axios
    //   .post(API, {
    //     identifier: user.email,
    //     password: user.password,
    //   })
    //   .then((response) => {
    //     // Handle success.
    //     console.log('Well done!')
    //     console.log('User profile', response.data)
    //     console.log('User token', response.data.jwt)
    //     localStorage.setItem('token', response.data.jwt);
    //     // tokenUpdate();
    //     setValues({
    //       ...values,
    //       redirectToReferrer: true,
    //     })
    //   })
    //   .catch((error) => {
    //     // Handle error.
    //     console.log('An error occurred:', error.response.data.error.message)
    //     //console.log(data.error)
    //     setValues({
    //       ...values,
    //       error: error.response.data.error.message,
    //       loading: false,
    //     })
    //   })
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
