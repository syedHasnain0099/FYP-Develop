import React from 'react'
import { useState } from 'react'
import ResetPage from './ResetPage'
import './ResetPage.css'
function ResetPageForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  return (
    <>
      <div className='reset-form-container'>
        {!isSubmitted ? <ResetPage submitForm={submitForm} /> : <ResetPage />}
      </div>
    </>
  )
}

export default ResetPageForm
