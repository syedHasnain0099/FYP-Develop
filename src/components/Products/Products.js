import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import productService from '../../services/ProductService'
import categoryService from '../../services/CategoryService'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
function Products() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  // categoryService.getCategories()
  // sub categories of home appliances
  // categoryService.getCategoryList('Home Appliances')
  // productService.getProductsByCategory('Air Purifiers')
  // productService.find('iphone 8 plus')
  // productService.getAllAds()
  const getData = () => {
    console.log('running in getData')
    setLoading(true)
    productService
      .getAllAds()
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

  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='col-4 mb-3'>
                <div class='card h-100 text-center p-4' key={product.id}>
                  <img
                    class='card-img-top'
                    src={product.image_urls[0]}
                    alt={product.name}
                    height='250px'
                    //style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                  <div class='card-body'>
                    <h5
                      class='card-title mb-1
                     lead fw-bold'
                    >
                      {product.name}
                    </h5>
                    <p class='lead mt-2'>
                      {product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>
                      Rs {product.rent} / {product.duration}
                    </p>
                    <Link to={`/products/${product.id}`}>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
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
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>Products</h1>
            <hr />
          </div>
        </div>
        <Search />
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default Products
