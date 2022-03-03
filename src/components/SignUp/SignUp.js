import React, { useEffect, useState } from 'react'
import validateInfo from './validateInfo'
import { Link } from 'react-router-dom'
import './SignUp.css'
import axios from 'axios'
import userService from '../../services/UserService'

const SignUp = (callback) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    error: '',
    success: '',
  })
  const { username, email, password, password2, error, success } = values
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const usernameChangeHandler = (event) => {
    setValues({ ...values, error: false, username: event.target.value })
  }
  const emailChangeHandler = (event) => {
    setValues({ ...values, error: false, email: event.target.value })
  }
  const passwordChangeHandler = (event) => {
    setValues({ ...values, error: false, password: event.target.value })
  }
  const password2ChangeHandler = (event) => {
    setValues({ ...values, error: false, password2: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setErrors(validateInfo(values))
    if (Object.keys(errors).length === 0) {
      signup({ username, email, password, password2 })
    }

    console.log(values)
  }
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. please <Link to='/login'>Signin</Link>
    </div>
  )
  // useEffect(() => {
  //   if (Object.keys(errors).length === 0) {
  //     callback()
  //   }
  // }, [errors])
  const signup = (user) => {
    userService
      .addUser(user.username, user.email, user.password)
      .then((data) => {
        // navigate(RouteAdminDashboard);
        console.log(data)
        setValues({
          ...values,
          username: '',
          email: '',
          password: '',
          password2: '',
          error: false,
          success: true,
        })
      })
      .catch((err) => {
        setValues({
          ...values,
          error: error.response.data.error.message,
          success: false,
        })
        if (!err.response) {
          setServerError('Error occured please try later')
        } else {
          setServerError('')
          // setFieldError('Password', err.response.data.error.message);
        }
      })
  }

  return (
    <div className='signup-form-container'>
      {showError()}
      {showSuccess()}
      <form className='signup-form' onSubmit={submitHandler}>
        <h1>
          Get Started with us today! Create your account by filling out the
          information below
        </h1>
        <div className='signup-form-inputs'>
          <label htmlFor='username' className='signup-form-label'>
            Username
          </label>
          <input
            type='text'
            id='username'
            className='signup-form-input'
            name='username'
            placeholder='Enter your username'
            onChange={usernameChangeHandler}
            value={username}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='signup-form-inputs'>
          <label htmlFor='email' className='signup-form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='signup-form-input'
            placeholder='Enter your Email'
            onChange={emailChangeHandler}
            value={email}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='signup-form-inputs'>
          <label htmlFor='password' className='signup-form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='signup-form-input'
            placeholder='Enter your password'
            onChange={passwordChangeHandler}
            value={password}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='signup-form-inputs'>
          <label htmlFor='password2' className='signup-form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            name='password2'
            id='password2'
            className='signup-form-input'
            placeholder='Enter your password'
            onChange={password2ChangeHandler}
            value={password2}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button type='submit' className='signup-form-input-btn'>
          Sign up
        </button>

        <span className='signup-form-input-login'>
          Already have an account? login <a href='#'>here</a>
        </span>
      </form>
    </div>
  )
}

export default SignUp
