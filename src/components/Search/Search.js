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
  useEffect(
    () => {
      init1()
      init2()
    },
    [searchResults],
    [digitalResults],
    [homeApplianceResults]
  )
  const searchResult = () => {
    console.log('it comes here')
    console.log(categoryDigital)
    console.log(categoryHomeAppliance)
    console.log(search)
    if (categoryDigital === '') {
      productService
        .search(search, categoryHomeAppliance)
        .then((res) => {
          setSearchResults(res)
          setData({
            ...data,
            searched: true,

            categoryHomeAppliance: '',
          })
        })
        .catch((err) => console.log(err))
    }
    if (categoryHomeAppliance === '') {
      productService
        .search(search, categoryDigital)
        .then((res) => {
          setSearchResults(res)
          setData({
            ...data,
            searched: true,
            categoryDigital: '',
          })
        })
        .catch((err) => console.log(err))
    }
    if (search === '' && categoryHomeAppliance === '') {
      productService
        .search('', categoryDigital)
        .then((res) => {
          setSearchResults(res)
          setData({
            ...data,
            searched: true,
            categoryDigital: '',
          })
        })
        .catch((err) => console.log(err))
    }
    if (search === '' && categoryDigital === '') {
      productService
        .search('', categoryHomeAppliance)
        .then((res) => {
          setSearchResults(res)
          setData({
            ...data,
            searched: true,
            categoryHomeAppliance: '',
          })
        })
        .catch((err) => console.log(err))
    }
    if (categoryHomeAppliance === '' && categoryDigital === '') {
      productService
        .search(search, '')
        .then((res) => {
          setSearchResults(res)
          setData({ ...data, searched: true })
        })
        .catch((err) => console.log(err))
    }
  }
  const searchDataDigital = () => {
    console.log(categoryDigital)
    productService
      .getProductsByCategory(categoryDigital)
      .then((response) => {
        console.log(response)
        setDigitalResults(response)
        setData({ ...data, searched: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchData = () => {
    console.log(search)
    productService
      .find(search)
      .then((response) => {
        setSearchResults(response)
        setData({ ...data, searched: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchDataHomeAppliance = () => {
    console.log(categoryHomeAppliance)
    productService
      .getProductsByCategory(categoryHomeAppliance)
      .then((response) => {
        setHomeApplianceResults(response)
        setData({ ...data, searched: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchSubmit = (event) => {
    event.preventDefault()
    // searchDataHomeAppliance()
    // searchDataDigital()
    // searchData()
    searchResult()
  }
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
    if (name === 'categoryHomeAppliance') {
      setSubCategoriesDigital('')
    }
    if (name === 'categoryDigital') {
      setSubCategoriesHomeAppliance('')
    }
  }
  const searchMessage = (searched, searchResults) => {
    if (searched && searchResults.length > 0) {
      return `Found ${searchResults.length} products`
    }
    if (searched && searchResults.length < 1) {
      return `No products found`
    }
  }

  const searchedProducts1 = (searchResults = []) => {
    return (
      <>
        {searchResults.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
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
  const searchedProducts2 = (digitalResults = []) => {
    return (
      <>
        {digitalResults.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
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
  const searchedProducts3 = (homeApplianceResults = []) => {
    return (
      <>
        {homeApplianceResults.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
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
  const searchForm = () => {
    console.log('it executes again')
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
          <h2 className='mt-4 mb-4'>
            {searchMessage(
              searched,
              searchResults,
              homeApplianceResults,
              digitalResults
            )}
          </h2>
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
