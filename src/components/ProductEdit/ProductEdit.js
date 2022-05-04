import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import categoryService from '../../services/CategoryService'
import productService from '../../services/ProductService'
import { userData } from '../../auth'
function ProductEdit() {
  let { productId } = useParams()
  console.log('productid', productId)
  const { id } = userData()
  const [categories, setCategories] = useState([])
  const [mediaIds, setMediaIds] = useState('')
  const [videoMediaId, setVideoMediaId] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [values, setValues] = useState({
    name: '',
    description: '',
    rent: '',
    duration: '',
    subcategory: '',
    category: '',
    quantity: '',
    loading: false,
    error: '',
    createdProduct: '',
  })
  const getProducts = (productId) => {
    productService
      .findOneProduct(productId)
      .then((response) => {
        console.log('product: ', response)
        setValues(response[0])
      })
      .catch((err) => {
        console.log('inside catch')
        console.log(err)
      })
  }
  useEffect(() => {
    getProducts(productId)
  }, [])
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

  const {
    name,
    description,
    rent,
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
        console.log(res)
        console.log('id of uploaded image', res)
        setMediaIds(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const videoMediaHandleChange = (event) => {
    productService
      .uploadMedia(event.target.files)
      .then((res) => {
        console.log('id of uploaded video', res)
        setVideoMediaId(res)
      })
      .catch((err) => console.log(err))
  }
  const subCategoryHandleChange = (event) => {
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    setValues({ ...values, subcategory: option })
  }

  const handleChange = (names) => async (event) => {
    const value = names === 'photo' ? event.target.files[0] : event.target.value
    setValues({ ...values, [names]: value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    const mIds = []
    mIds.push(mediaIds)
    if (videoMediaId != '') {
      mIds.push(videoMediaId)
    }

    // postAd(
    //   { name, description, rent, duration, subcategory, quantity, id },
    //   mIds
    // )
  }
  const postAd = (props, mediaIds) => {
    productService
      .postAd(
        props.name,
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
          name: '',
          description: '',
          photo: '',
          video: '',
          rent: '',
          category: '',
          subcategory: '',
          duration: '',
          quantity: '',
          error: false,
          loading: false,
          createdProduct: data.data.attributes.product_name,
        })
        setMediaIds('')
        setVideoMediaId('')
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
      <div className='form-group mb-4'>
        <label className='btn btn-secondary'>
          <input
            onChange={mediaHandleChange}
            type='file'
            name='photo'
            accept='image/*'
            required
            multiple
          />
        </label>
      </div>
      <h4>Post Video</h4>
      <div className='form-group mb-4'>
        <label className='btn btn-secondary'>
          <input
            onChange={videoMediaHandleChange}
            type='file'
            name='video'
            accept='.mov,.mp4'
            required
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Product Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          value={name}
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
        <label className='text-muted'>Estimated Rent Per Day</label>
        <input
          onChange={handleChange('rent')}
          value={rent}
          type='number'
          min='0'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>
          Max availability of Product for Rent
        </label>
        <input
          onChange={handleChange('duration')}
          value={duration}
          type='number'
          min='0'
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
        <label className='text-muted'>Quantity of product</label>
        <input
          onChange={handleChange('quantity')}
          value={quantity}
          type='number'
          min='0'
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
      <h2>{`${createdProduct}`} ad is updated</h2>
    </div>
  )
  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )

  return (
    <div className='container-fluid mt-4'>
      {/* <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'> */}
      <h3 className='card-header mb-3'>Edit your Ad</h3>
      <div className='col-md-8 offset-md-2'>{newPostForm()}</div>
      {/* </div>
      </div> */}
      {showLoading()}
      {showSuccess()}
      {showError()}
    </div>

    // <div className='container mt-4'>
    //   <div className='row'>
    //     <h3 className='card-header'>Post an ad</h3>
    //     <div className='col-md-8 offset-md-2'>
    //       {showLoading()}
    //       {showSuccess()}
    //       {showError()}
    //       {newPostForm()}
    //     </div>
    //   </div>
    // </div>
  )
}

export default ProductEdit
