import React, { useState } from 'react'
import './AdForm.css'
function AdForm(props) {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')
  const [enteredDate, setEnteredDate] = useState('')
  const [enteredImage, setEnteredImage] = useState()
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
  }
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value)
  }
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value)
  }
  const imageChangeHandler = (event) => {
    setEnteredImage(event.target.files[0])
  }
  const submitHandler = (event) => {
    event.preventDefault()

    const productData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      image: enteredImage,
    }
    setEnteredTitle('')
    setEnteredAmount('')
    setEnteredDate('')
    setEnteredImage()
    console.log(productData)
    props.onSaveProductData(productData)
  }

  return (
    <div className='form-content-right'>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-inputs'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='form-input'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='form-inputs'>
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            className='form-input'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='form-inputs'>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <input
            type='date'
            name='date'
            id='date'
            className='form-input'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='form-inputs'>
          <label htmlFor='image' className='form-label'>
            Add Picture
          </label>
          <input
            type='file'
            name='image'
            id='image'
            className='form-input'
            onChange={imageChangeHandler}
          />
        </div>

        <button type='Submit' className='form-input-btn'>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AdForm
