import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import validateInfo from './validateInfo'
import './ResetPage.css'
import axios from 'axios'
import userService from '../../services/UserService'

function ResetPage(callback) {
  const resetCode = window.location.href
  console.log(resetCode)
  const myArray = resetCode.split('http://localhost:3000/ResetPageForm/?code=')
  console.log(myArray[1])
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPassword2, setEnteredPassword2] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    var error1 = {}
    setError('')
    setSuccess('')
    setErrors(validateInfo(values))
    setIsSubmitting(true)
    error1 = validateInfo(values)
    if (Object.keys(error1).length === 0) {
      userService
        .resetPassword(resetCode, values.password)
        .then((data) => {
          console.log("Your user's password has been reset.")
          setSuccess("Your user's password has been reset.")
          setError('')
        })
        .catch((err) => {
          setError(`An error occurred: ${err.response}`)
          setSuccess('')
          console.log('An error occurred:', err.response)
        })
    }
    console.log(values)
  }
  useEffect(() => {
    if (Object.keys(errors) === 0 && isSubmitting) {
      callback()
    }
  }, [errors])
  const showError = () => (
    <div className='reset-form-error' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='reset-form-success'
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  )
  return (
    <div className='reset-form-content-right'>
      <form className='reset-form' onSubmit={submitHandler}>
        <h1>Reset</h1>
        <div className='reset-form-inputs'>
          <label className='reset-form-label'>Password</label>
          <input
            type='password'
            name='password'
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
      {showError()}
      {showSuccess()}
    </div>
  )
}

export default ResetPage
