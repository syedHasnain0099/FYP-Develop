import React, { useEffect, useState } from 'react'
import validateInfo from './validateInfo'
import { NavLink } from 'react-router-dom'
import './SignUp.css'
import userService from '../../services/UserService'

const SignUp = () => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    contactNo: '',
    password: '',
    password2: '',
    error: '',
    success: '',
  })
  const {
    username,
    email,
    password,
    password2,
    error,
    success,
    firstname,
    lastname,
    contactNo,
  } = values
  const [errors, setErrors] = useState({})
  const contactNoChangeHandler = (event) => {
    setValues({ ...values, error: false, contactNo: event.target.value })
  }
  const firstnameChangeHandler = (event) => {
    setValues({ ...values, error: false, firstname: event.target.value })
  }
  const lastnameChangeHandler = (event) => {
    setValues({ ...values, error: false, lastname: event.target.value })
  }
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
  function submitHandler(event) {
    clearErrorFields()
    event.preventDefault()
    setErrors(validateInfo(values))
    var errors = validateInfo(values)
    if (Object.keys(errors).length === 0) {
      console.log(values)
      checkUserExistence({
        username,
        email,
        password,
        password2,
        firstname,
        lastname,
        contactNo,
      })
    }
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
  const checkUserExistence = (user) => {
    userService
      .userExists(user.email)
      .then((res) => {
        if (res == true) {
          setValues({
            ...values,
            error: 'Email already exists! please enter a new one',
            success: false,
          })
        } else {
          userService
            .findUserbyName(user.username)
            .then((res) => {
              if (res == true) {
                console.log('username already exists! please enter some else: ')
                setValues({
                  ...values,
                  error: 'Username already exists! please enter a new one',
                  success: false,
                })
              } else {
                setValues({ ...values, error: false, success: true })
                userService
                  .addUser(
                    user.username,
                    user.email,
                    user.password,
                    user.firstname,
                    user.lastname,
                    user.contactNo,
                    'user'
                  )
                  .then((data) => {
                    console.log('congratulations you are registered ', data)
                    setValues({
                      ...values,
                      username: '',
                      email: '',
                      password: '',
                      password2: '',
                      firstname: '',
                      lastname: '',
                      contactNo: '',
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
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
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
            FirstName
          </label>
          <input
            type='text'
            id='firstname'
            className='signup-form-input'
            name='firstname'
            placeholder='Enter your firstname'
            onChange={firstnameChangeHandler}
            value={firstname}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className='signup-form-inputs'>
          <label htmlFor='username' className='signup-form-label'>
            LastName
          </label>
          <input
            type='text'
            id='lastname'
            className='signup-form-input'
            name='lastname'
            placeholder='Enter your lastname'
            onChange={lastnameChangeHandler}
            value={lastname}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
        <div className='signup-form-inputs'>
          <label htmlFor='username' className='signup-form-label'>
            Username (Only alphanumeric)
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
          <label htmlFor='email' className='signup-form-label'>
            Contact No (Format : 01234567890)
          </label>
          <input
            type='tel'
            name='contactNo'
            id='contactNo'
            className='signup-form-input'
            placeholder='Enter your ContactNo'
            // pattern='[0-9]{4}-[0-9]{7}'
            pattern='[0-9]{11}'
            onChange={contactNoChangeHandler}
            value={contactNo}
          />
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
