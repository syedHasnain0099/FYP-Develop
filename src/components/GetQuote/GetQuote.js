import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import productService from '../../services/ProductService'
import quoteService from '../../services/QuoteService'
import { userData } from '../../auth'
import './GetQuote.css'
import { cities } from './cities'
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
function GetQuote() {
  let city = cities()
  let today = new Date().toISOString().slice(0, 10)

  console.log(today)
  let { productId } = useParams()
  const { id, username, email } = userData()
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
      location: enteredLocation.value,
      quantity: enteredQuantity,
    }
    console.log('get quote data: ', getQuoteData)
    postQuote(getQuoteData)
    console.log(getQuoteData)
  }
  const postQuote = (getQuoteData) => {
    // here to run or connect with backend
    quoteService
      .sendRequestQuote(
        getQuoteData.startDate,
        getQuoteData.endDate,
        getQuoteData.quantity,
        getQuoteData.location,
        id,
        productId,
        0,
        'pending'
      )
      .then((data) => console.log('congratulations your post is added ', data))
      .catch((err) => console.log(err))
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
  const ShowProducts1 = () => {
    console.log('running')

    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='' style={{ padding: '40px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.image_urls[0]}
                        className='card-img-top'
                        // width='96'
                        // height='350'
                        // alt=''
                        height='250px'
                      />
                    </div>
                  </div>
                  <div className='card-body bg-light text-center'>
                    <div className='mb-2'>
                      <h5 className='font-weight-bold mb-2'>
                        <Link
                          to={`/products/${product.id}`}
                          className='text-default mb-2'
                          data-abc='true'
                        >
                          {product.name}
                        </Link>
                      </h5>
                      <p class='text-muted'>
                        {product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className='mb-0 font-weight-semibold'>
                      Rs {product.rent} / day
                    </h3>

                    {product.reviews.length > 0 &&
                      Array(product.reviews[0].rating)
                        .fill()
                        .map((_, i) => (
                          <span style={{ color: '#ffd700' }}>&#9733;</span>
                        ))}
                    <div className='text-muted mb-3'>
                      {product.reviews.length} reviews
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h6>Details</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        })}
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
              {/* <p className='getquote-product__price'>{product.description}</p> */}
              <p className='getquote-product__price'>
                <div>Product Description:</div>
                <br />
                <div>{product.description}</div>
                <small>Rs</small>
                <strong>{product.rent}</strong>
              </p>
              <div className='getquote-product__rating'>
                {product.reviews.length > 0 &&
                  Array(product.reviews[0].rating)
                    .fill()
                    .map((_, i) => <span>&#9733;</span>)}
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
        {loading ? <Loading /> : <ShowProducts1 />}
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
              min={today}
              placeholder='Start'
              onChange={startDateChangeHandler}
            />
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
              min={enteredStartDate}
              onChange={endDateChangeHandler}
            />
          </div>
          <div className='getquote-form-inputs'>
            <label htmlFor='location' className='getquote-form-label'>
              Where
            </label>
            <VirtualizedSelect
              options={city}
              onChange={(value) => setEnteredLocation(value)}
              value={enteredLocation}
            />
            {/* <input
              type='text'
              id='location'
              className='getquote-form-input'
              name='location'
              placeholder='City'
              onChange={locationChangeHandler}
            /> */}
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
              onChange={quantityChangeHandler}
              min='1'
              max='10'
            />
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
