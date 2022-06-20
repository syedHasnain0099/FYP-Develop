import React, { useState } from 'react'
import AdminForgotPassword from './AdminForgotPassword'

import './ForgotPassword.css'
function ForgotPasswordFormAdmin() {
  console.log('Admin admin')
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  return (
    <>
      <div className='forgot-form-container'>
        {!isSubmitted ? (
          <AdminForgotPassword submitForm={submitForm} />
        ) : (
          <AdminForgotPassword />
        )}
      </div>
    </>
  )
}

export default ForgotPasswordFormAdmin
