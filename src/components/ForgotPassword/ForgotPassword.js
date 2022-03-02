import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './ForgotPassword.css'
import validateInfo from './validateInfo'
import axios from 'axios'
import userService from '../../services/UserService'

function ForgotPassword(callback) {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const usernameChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const values = {
      email: enteredEmail,
    }
    setErrors(validateInfo(values))
    setIsSubmitting(true)
    userService
				.forgetPassword(values.email)
				.then((data) => {
					console.log('Your user received an email')
				})
				.catch((err) => {
          console.log('An error occurred:', err.response)
				})
    // axios
      // .post(
      //   'http://rentalelectronics-env.eba-zs7v2ewu.ap-south-1.elasticbeanstalk.com/api/auth/forgot-password',
      //   {
      //     email: values.email, // user's email
      //   }
      // )
      // .then((response) => {
      //   console.log('Your user received an email')
      // })
      // .catch((error) => {
      //   console.log('An error occurred:', error.response)
      // })
  }
  useEffect(() => {
    if (Object.keys(errors) === 0 && isSubmitting) {
      callback()
    }
  }, [errors])
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
    </div>
  )
}

export default ForgotPassword
