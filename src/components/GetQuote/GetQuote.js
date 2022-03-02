import React, { useState } from 'react'
import './GetQuote.css'
function GetQuote({ id, title, image, price, rating }) {
  const [enteredStartDate, setEnteredStartDate] = useState('')
  const [enteredEndDate, setEnteredEndDate] = useState('')
  const [enteredLocation, setEnteredLocation] = useState('')
  const [enteredQuantity, setEnteredQuantity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const startDateChangeHandler = (event) => {
    setEnteredStartDate(event.target.value)
  }
  const endDateChangeHandler = (event) => {
    setEnteredEndDate(event.target.value)
  }
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value)
  }
  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const getQuoteData = {
      startDate: new Date(enteredStartDate),
      endDate: new Date(enteredEndDate),
      location: enteredLocation,
      quantity: enteredQuantity,
    }
    setIsSubmitting(true)
    console.log(getQuoteData)
  }

  return (
    <div className='getquote-form-container'>
      <span className='getquote-close-btn'>×</span>
      <div className='getquote-form-content-left'>
        <img className='getquote-form-img' src={image} alt='spaceship' />
        <p className='getquote-checkoutProduct__title'>{title}</p>
        <p className='getquote-product__price'>
          <small>Rs</small>
          <strong>{price}</strong>
        </p>
        <div className='getquote-product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span>&#9733;</span>
            ))}
        </div>
      </div>
      <div className='getquote-form-content-right'>
        <form className='getquote-form' onSubmit={submitHandler}>
          <h1>One Request, Multiple Quotes</h1>
          <div className='getquote-form-inputs'>
            <label htmlFor='startdate' className='getquote-form-label'>
              Start Date
            </label>
            <input
              type='date'
              id='startdate'
              className='getquote-form-input'
              name='startdate'
              placeholder='Start'
              //value={enteredUserName}
              onChange={startDateChangeHandler}
            />
            {/* {errors.username && <p>{errors.username}</p>} */}
          </div>
          <div className='getquote-form-inputs'>
            <label htmlFor='enddate' className='getquote-form-label'>
              End Date
            </label>
            <input
              type='date'
              id='enddate'
              className='getquote-form-input'
              name='enddate'
              placeholder='End'
              //value={enteredUserName}
              onChange={endDateChangeHandler}
            />
            {/* {errors.username && <p>{errors.username}</p>} */}
          </div>
          <div className='getquote-form-inputs'>
            <label htmlFor='location' className='getquote-form-label'>
              Where
            </label>
            <input
              type='text'
              id='location'
              className='getquote-form-input'
              name='location'
              placeholder='City'
              //value={enteredUserName}
              onChange={locationChangeHandler}
            />
            {/* {errors.username && <p>{errors.username}</p>} */}
          </div>
          <div className='getquote-form-inputs'>
            <label htmlFor='quantity' className='getquote-form-label'>
              Quantity
            </label>
            <input
              type='number'
              id='quantity'
              className='getquote-form-input'
              name='quantity'
              placeholder='Quantity'
              //value={enteredUserName}
              onChange={quantityChangeHandler}
            />
            {/* {errors.username && <p>{errors.username}</p>} */}
          </div>

          <button type='submit' className='getquote-form-input-btn'>
            Request Quotes
          </button>
        </form>
      </div>
    </div>
  )
}

export default GetQuote
