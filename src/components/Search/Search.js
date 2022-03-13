import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import categoryService from '../../services/CategoryService'
import productService from '../../services/ProductService'
function Search() {
  const [subCategoriesHomeAppliance, setSubCategoriesHomeAppliance] = useState(
    []
  )
  const [subCategoriesDigital, setSubCategoriesDigital] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [digitalResults, setDigitalResults] = useState([])
  const [homeApplianceResults, setHomeApplianceResults] = useState([])
  const [data, setData] = useState({
    categoryDigital: '',
    categoryHomeAppliance: '',
    search: '',
    searched: false,
  })
  const { categoryDigital, categoryHomeAppliance, search, searched } = data
  const init1 = () => {
    categoryService
      .getCategoryList('Digital')
      .then((resolve) => {
        console.log(resolve)
        setSubCategoriesDigital(resolve)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const init2 = () => {
    categoryService
      .getCategoryList('Home Appliances')
      .then((resolve) => {
        setSubCategoriesHomeAppliance(resolve)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    init1()
    init2()
  }, [])
  const searchDataDigital = () => {
    console.log('digital')
    productService
      .getProductsByCategory(categoryDigital)
      .then((response) => {
        console.log(response)
        setDigitalResults(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchData = () => {
    console.log('search')
    productService
      .find(search)
      .then((response) => {
        setSearchResults(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchDataHomeAppliance = () => {
    console.log('HomeAppliance')
    productService
      .getProductsByCategory(categoryHomeAppliance)
      .then((response) => {
        setHomeApplianceResults(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchSubmit = (event) => {
    event.preventDefault()
    searchDataHomeAppliance()
    searchDataDigital()
    searchData()
  }
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }
  const searchedProducts1 = (searchResults = []) => {
    return (
      <>
        {searchResults.map((product) => {
          return (
            <>
              <div className='col-4 mb-3'>
                <div class='card h-100 text-center p-4' key={product.id}>
                  <img
                    class='card-img-top'
                    src={product.image_urls[0]}
                    alt={product.name}
                    height='250px'
                  />
                  <div class='card-body'>
                    <h5
                      class='card-title mb-1
                     lead fw-bold'
                    >
                      {product.name}
                    </h5>
                    <p class='card-text'>
                      {product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>
                      Rs {product.price} / {product.duration}
                    </p>
                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        Add to cart
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
  const searchedProducts2 = (digitalResults = []) => {
    return (
      <>
        {digitalResults.map((product) => {
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
                    <p class='card-text'>
                      {product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>
                      Rs {product.price} / {product.duration}
                    </p>
                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        Add to cart
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
  const searchedProducts3 = (homeApplianceResults = []) => {
    return (
      <>
        {homeApplianceResults.map((product) => {
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
                    <p class='card-text'>
                      {product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>
                      Rs {product.price} / {product.duration}
                    </p>

                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to='/'>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        Add to cart
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
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select
                className='btn mr-2'
                onChange={handleChange('categoryHomeAppliance')}
              >
                <option value=''>Home Appliance</option>
                {subCategoriesHomeAppliance &&
                  subCategoriesHomeAppliance.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='input-group-prepend'>
              <select
                className='btn mr-2'
                onChange={handleChange('categoryDigital')}
              >
                <option value=''>Digital</option>
                {subCategoriesDigital &&
                  subCategoriesDigital.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type='search'
              className='form-control'
              onChange={handleChange('search')}
              placeholder='Search by name'
            />
          </div>
          <div className='btn input-group-append' style={{ border: 'none' }}>
            <button className='input-group-text'>Search</button>
          </div>
        </span>
      </form>
    )
  }
  return (
    <>
      <div className='row'>
        <div className='container mb-3'>{searchForm()}</div>
      </div>
      <div>
        <div className='container my-2 py-2'>
          <div className='row justify-content-center'>
            {searchedProducts3(homeApplianceResults)}
            {searchedProducts2(digitalResults)}
            {searchedProducts1(searchResults)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
