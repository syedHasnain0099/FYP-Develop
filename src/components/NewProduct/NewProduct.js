import React, { useState } from 'react'
import './AdForm.css'
import AdForm from './AdForm'
function NewProduct(props) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  const saveProductDataHandler = (enteredProductData) => {
    const productData = { ...enteredProductData, id: Math.random.toString() }
    props.onAddProduct(productData)
  }
  return (
    <>
      <div className='form-container'>
        {/* <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-2.svg' alt='spaceship' />
        </div> */}
        {!isSubmitted ? (
          <AdForm
            submitForm={submitForm}
            onSaveProductData={saveProductDataHandler}
          />
        ) : (
          <AdForm />
        )}
      </div>
    </>
  )
}

export default NewProduct
