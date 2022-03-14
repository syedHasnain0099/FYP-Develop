import React, { useState, useEffect } from 'react'
import './ForgotPassword.css'
import validateInfo1 from './validatInfo1'
import userService from '../../services/UserService'

function ForgotPassword(callback) {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const usernameChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const values = {
      email: enteredEmail,
    }
    var error1 = {}
    setIsSubmitting(true)
    setError('')
    setSuccess('')
    setErrors(validateInfo1(values))
    error1 = validateInfo1(values)
    console.log(error1)
    if (Object.keys(error1).length === 0) {
      console.log('field errors are not present')
      checkEmailExistance(values.email)
    }
  }

  const checkEmailExistance = (email) => {
    userService
      .userExists(email)
      .then((res) => {
        if (res === true) {
          forgetPassword(email)
          setError('')
        } else {
          setError("Email doesn't exists")
          setSuccess('')
        }
      })
      .catch((err) => console.log(err))
  }
  const forgetPassword = (email) => {
    console.log('it is working')
    userService
      .forgetPassword(email)
      .then((data) => {
        console.log('Your user received an email')
        setSuccess('User has received an email')
      })
      .catch((err) => {
        setError(`An error occurred: ${err.response}`)
        console.log('An error occurred:', err.response)
      })
  }
  useEffect(() => {
    if (Object.keys(errors) === 0 && isSubmitting) {
      callback()
    }
  }, [errors])
  const showError = () => (
    <div
      className='forgotpassword-form-error'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='forgotpassword-form-success'
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  )
  return (
    <div className='forgot-form-content-right'>
      <form className='forgot-form' onSubmit={submitHandler}>
        <h1>Forget your password?</h1>
        <div className='forgot-form-inputs'>
          <label className='forgot-form-label'>E-mail</label>
          <input
            type='text'
            name='email'
            id='email'
            className='forgot-form-input'
            placeholder='Enter your Email'
            onChange={usernameChangeHandler}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <button type='submit' className='forgot-form-input-btn'>
          Recover Password
        </button>
      </form>
      {showError()}
      {showSuccess()}
    </div>
  )
}

export default ForgotPassword
