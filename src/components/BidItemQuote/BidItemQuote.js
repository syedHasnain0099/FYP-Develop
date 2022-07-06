import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import biddingService from '../../services/BiddingService'
import productService from '../../services/ProductService'
import quoteService from '../../services/QuoteService'
import { userData } from '../../auth'
import './GetQuote.css'

import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
function BidItemQuote() {
  let { productId } = useParams()
  const { id, username, email } = userData()
  const [maxValue, setmaxValue] = useState('')
  const [enteredQuantity, setEnteredQuantity] = useState('')
  const [createdProduct, setCreatedProduct] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = (productId) => {
    setLoading(true)
    biddingService
      .getOneBiddingItem(productId)
      .then((response) => {
        console.log(response)
        setData(response)
        // setmaxValue(response[0].quantity)
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

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const getQuoteData = {
      quantity: enteredQuantity,
    }
    console.log('get quote data: ', getQuoteData)
    postQuote(getQuoteData)
    console.log(getQuoteData)
  }
  const postQuote = (getQuoteData) => {
    // here to run or connect with backend
    biddingService
      .updateBid(enteredQuantity, productId, id)
      .then((data) => {
        console.log('congratualtions your bid is updated!', data)
        setCreatedProduct(data.data.attributes.city)
      })
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
                          to={`/bidProduct/${product.id}`}
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
                      Rs {product.bid}
                    </h3>

                    {/* {product.reviews.length > 0 &&
                      Array(product.reviews[0].rating)
                        .fill()
                        .map((_, i) => (
                          <span style={{ color: '#ffd700' }}>&#9733;</span>
                        ))} */}
                    <div className='text-muted mb-3'>
                      {/* {product.reviews.length} reviews */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={
        { height: '100px', display: createdProduct ? '' : 'none' }
        // { height: '100px' }
      }
    >
      <h2>Quote has been sent SuccessFully</h2>
    </div>
  )

  return (
    <div className='getquote-form-container'>
      <Link to='/bidding/products' className='getquote-close-btn'>
        ×
      </Link>

      <div className='getquote-form-content-left'>
        {loading ? <Loading /> : <ShowProducts1 />}
      </div>
      <div className='getquote-form-content-right'>
        {showSuccess()}
        <form className='getquote-form' onSubmit={submitHandler}>
          <h1>Submit Your Bid</h1>
          <div className='getquote-form-inputs'>
            <label htmlFor='quantity' className='getquote-form-label'>
              Enter Your Bid
            </label>
            <input
              type='number'
              id='quantity'
              className='getquote-form-input'
              name='quantity'
              placeholder='Bidding amount'
              onChange={quantityChangeHandler}
              min='1'
              // max={maxValue}
              max='100000'
            />
          </div>

          <button type='submit' className='getquote-form-input-btn'>
            Bid Item
          </button>
        </form>
      </div>
    </div>
  )
}

export default BidItemQuote
