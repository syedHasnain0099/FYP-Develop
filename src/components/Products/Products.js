import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import productService from '../../services/ProductService'
import categoryService from '../../services/CategoryService'
import { Skeleton } from '@mui/material'
function Products() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  let componentMounted = true
  // categoryService.getCategories()
  // sub categories of home appliances
  // categoryService.getCategoryList('Home Appliances')
  // productService.getProductsByCategory('Air Purifiers')
  // productService.find('iphone 8 plus')
  // productService.getAllAds()
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      productService
        .getAllAds()
        .then((response) => {
          console.log(response)
          if (componentMounted) {
            setData(response)
            setFilter(response)
            setLoading(false)
            console.log(filter)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      return () => {
        componentMounted = false
      }
    }
    getProducts()
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
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat)
    setFilter(updatedList)
  }
  const ShowProducts = () => {
    return (
      <>
        <div className='buttons d-flex justfiy-content-center mb-5 pb-5'>
          <button
            className='btn btn-outline-dark me-2'
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className='btn btn-outline-dark me-2'
            onClick={() => filterProduct("mens's clothing")}
          >
            Home Appliances
          </button>
          <button
            className='btn btn-outline-dark me-2'
            onClick={() => filterProduct("mens's clothing")}
          >
            Digital
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className='col-md-3 mb-4'>
                <div class='card h-100 text-center p-4' key={product.id}>
                  <img
                    class='card-img-top'
                    src={product.image_urls[0]}
                    alt={product.title}
                    height='250px'
                  />
                  <div class='card-body'>
                    <h5 class='card-title mb-0 lead fw-bold'>
                      {product.description}...
                    </h5>
                    <p class='card-text'>{product.price}</p>
                    <a href='#' class='btn btn-outline-dark'>
                      Add To Cart
                    </a>
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
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default Products
