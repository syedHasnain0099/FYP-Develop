import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import { userData } from '../../auth'
import categoryService from '../../services/CategoryService'
import productService from '../../services/ProductService'
import axios from 'axios'
function AddProduct() {
  const { id } = userData()
  const [categories, setCategories] = useState([])
  const [mediaIds, setMediaIds] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const init = () => {
    categoryService
      .getCategories()
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => {
        setValues({ ...values, error: err })
      })
  }
  const init1 = () => {
    categoryService
      .getCategoryList(category)
      .then((resolve) => {
        setSubCategories(resolve)
      })
      .catch((err) => {
        setValues({ ...values, error: err })
      })
  }

  const [values, setValues] = useState({
    productname: '',
    description: '',
    rent: '',
    duration: '',
    subcategory: '',
    category: '',
    quantity: '',
    photo: '',
    video: '',
    loading: false,
    error: '',
    createdProduct: '',
  })

  const {
    productname,
    description,
    rent,
    photo,
    video,
    duration,
    category,
    quantity,
    subcategory,
    loading,
    error,
    createdProduct,
  } = values
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    init1()
  }, [category])

  const mediaHandleChange = (event) => {
    productService
      .uploadMedia(event.target.files)
      .then((res) => {
        console.log('id of uploaded image', res)
        setMediaIds(res)
      })
      .catch((err) => console.log(err))
  }
  const subCategoryHandleChange = (event) => {
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    setValues({ ...values, subcategory: option })
  }

  const handleChange = (name) => async (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    console.log(mediaIds)
    postAd(
      { productname, description, rent, duration, subcategory, quantity, id },mediaIds
    )
  }
  const postAd = (props, mediaIds) => {
    console.log('media ids: ', mediaIds)
    productService
      .postAd(
        props.productname,
        props.description,
        props.rent,
        props.duration,
        props.subcategory,
        props.quantity,
        props.id,
        mediaIds
      )
      .then((data) => {
        console.log('congratulations your post is added ', data)
        setValues({
          ...values,
          productname: '',
          description: '',
          photo: '',
          video: '',
          rent: '',
          category: '',
          subcategory: '',
          duration: '',
          quantity: '',
          loading: false,
          createdProduct: data.productname,
        })
        setMediaIds('')
      })
      .catch((err) => {
        let err_msg = err.response.data.error.message
        if (!err.response) {
          err_msg = 'Error occured please try later'
        }
        setValues({ ...values, error: err_msg })
      })
  }
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={mediaHandleChange}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <h4>Post Video</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            // onChange={videoHandleChange}
            type='file'
            name='video'
            accept='.mov,.mp4'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Product Name</label>
        <input
          onChange={handleChange('productname')}
          type='text'
          value={productname}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          value={description}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Estimated Rent</label>
        <input
          onChange={handleChange('rent')}
          value={rent}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Estimated Duration</label>
        <input
          onChange={handleChange('duration')}
          value={duration}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select
          onChange={handleChange('category')}
          value={category}
          className='form-control'
        >
          <option>Please Select</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Sub Category</label>
        <select
          onChange={subCategoryHandleChange}
          value={subcategory}
          className='form-control'
        >
          <option>Please Select</option>
          {subCategories &&
            subCategories.map((c, i) => (
              <option key={i} id={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          value={quantity}
          type='number'
          className='form-control'
        />
      </div>
      <button className='btn btn-outline-primary'>Create Product</button>
    </form>
  )
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  )
  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )

  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='card-header'>Post an ad</h3>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </div>
  )
}

export default AddProduct
