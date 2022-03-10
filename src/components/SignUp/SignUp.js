import React, { useEffect, useState } from 'react'
import validateInfo from './validateInfo'
import { NavLink } from 'react-router-dom'
import './SignUp.css'
import userService from '../../services/UserService'

const SignUp = () => {
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
  const clearErrorFields = () => {
    setErrors('')
  }
  async function submitHandler(event) {
    clearErrorFields()
    event.preventDefault()
    console.log('values: ', values)
    setErrors(validateInfo(values))
    var errors = validateInfo(values)
    console.log('errors: ', Object.keys(errors))
    if (Object.keys(errors).length === 0) {
      console.log('field errors are not present')
      signup({ username, email, password, password2 })
    }

    console.log(values)
  }
  const showError = () => (
    <div className='signup-form-error' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='signup-form-success'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. please Signin
    </div>
  )
  const signup = (user) => {
    userService
      .addUser(user.username, user.email, user.password, "user")
      .then((data) => {
        console.log('congratulations you are registered ', data)
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
        let err_msg = err.response.data.error.message
        if (!err.response) {
          err_msg = 'Error occured please try later'
        } else if (err_msg == 'Email is already taken') {
          err_msg = err_msg + '\nPlease enter a new one!'
        }
        setValues({
          ...values,
          error: err_msg,
          loading: false,
        })
      })
  }

  return (
    <div className='signup-form-container'>
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
          Already have an account? login <NavLink to='/login'>here</NavLink>
        </span>
      </form>
      {showError()}
      {showSuccess()}
    </div>
  )
}

export default SignUp
