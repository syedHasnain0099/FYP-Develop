import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import validateInfo from './validateInfo'
import './ResetPage.css'
import axios from 'axios'
import userService from '../../services/UserService'

function ResetPage(callback) {
  const resetCode = window.location.href

  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPassword2, setEnteredPassword2] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  }
  const password2ChangeHandler = (event) => {
    setEnteredPassword2(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const values = {
      password: enteredPassword,
      password2: enteredPassword2,
    }
    setErrors(validateInfo(values))
    setIsSubmitting(true)
    console.log(values)
    userService
      .resetPassword(resetCode, values.password)
      .then((data) => {
        console.log("Your user's password has been reset.")
      })
      .catch((err) => {
        console.log('An error occurred:', err.response)
      })
  }
  useEffect(() => {
    if (Object.keys(errors) === 0 && isSubmitting) {
      callback()
    }
  }, [errors])
  return (
    <div className='reset-form-content-right'>
      <form className='reset-form' onSubmit={submitHandler}>
        <h1>Reset</h1>
        <div className='reset-form-inputs'>
          <label className='reset-form-label'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='reset-form-input'
            placeholder='Enter your Password'
            onChange={passwordChangeHandler}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='reset-form-inputs'>
          <label className='reset-form-label'>Confirm Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='reset-form-input'
            placeholder='Enter your Password'
            onChange={password2ChangeHandler}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button type='submit' className='reset-form-input-btn'>
          reset
        </button>
      </form>
    </div>
  )
}

export default ResetPage
