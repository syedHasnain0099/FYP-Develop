import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import { userData } from '../../auth'
import productService from '../../services/ProductService'
import categoryService from '../../services/CategoryService'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import Rating from '../Rating/Rating'
function Products() {
  const { id, username, email } = userData()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = () => {
    console.log('running in getData')
    setLoading(true)
    productService
      .getAllAds(id)
      .then((response) => {
        console.log('ads: ', response)
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])
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
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.image_urls[0]}
                        className='card-img-top'
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
                    {/* 
                    {product.reviews.length > 0 &&
                      Array(product.reviews[0].rating)
                        .fill()
                        .map((_, i) => (
                          <span style={{ color: '#ffd700' }}>&#9733;</span>
                        ))} */}
                    <div className='text-muted mb-3'>
                      {product.reviews.length} reviews
                    </div>

                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn bg-cart mt-2 mb-2 mr-2'>
                        Get Quote
                      </button>
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
  return (
    <div>
      <div className='container my-1 py-1'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-6 fw-bolder text-center'>Products</h1>
            <hr />
          </div>
        </div>
        <Search />
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  )
}

export default Products
