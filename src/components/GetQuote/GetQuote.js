import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import productService from '../../services/ProductService'
import './GetQuote.css'
function GetQuote() {
  let { productId } = useParams()
  const [enteredStartDate, setEnteredStartDate] = useState('')
  const [enteredEndDate, setEnteredEndDate] = useState('')
  const [enteredLocation, setEnteredLocation] = useState('')
  const [enteredQuantity, setEnteredQuantity] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = (productId) => {
    setLoading(true)
    productService
      .findOneProduct(productId)
      .then((response) => {
        console.log(response)
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log('inside catch')
        console.log(err)
      })
  }
  useEffect(() => {
    getProducts(productId)
  }, [])
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
    postQuote(getQuoteData)
    console.log(getQuoteData)
  }
  const postQuote = (getQuoteData) => {
    // here to run or connect with backend
  }
  const Loading = () => {
    return (
      <>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
      </>
    )
  }
  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              {console.log('running')}
              <img
                className='getquote-form-img'
                src={product.image_urls[0]}
                alt='spaceship'
              />
              <p className='getquote-checkoutProduct__title'>{product.name}</p>
              <p className='getquote-product__price'>
                <small>Rs</small>
                <strong>{product.price}</strong>
              </p>
              <div className='getquote-product__rating'>
                {Array(product.reviews[0].rating)
                  .fill()
                  .map((_, i) => (
                    <span>&#9733;</span>
                  ))}
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div className='getquote-form-container'>
      <span className='getquote-close-btn'>×</span>
      <div className='getquote-form-content-left'>
        {loading ? <Loading /> : <ShowProducts />}
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
