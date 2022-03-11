import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import { userData } from '../../auth'
import categoryService from '../../services/CategoryService'
function AddProduct() {
  const { id, username, email, type } = userData()
  const { token } = isAuthenticated()
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
    subcategorie: '',
    category: '',
    quantity: '',
    photo: '',
    video: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: new FormData(),
  })
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const {
    productname,
    description,
    rent,
    photo,
    video,
    duration,
    category,
    quantity,
    subcategorie,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    init1()
  }, [category])
  const handleChange = (name) => (event) => {
    const value =
      name === 'video' || 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }
  const clickSubmit = (event) => {
    event.preventDefault()
    console.log('photo', photo)
    setValues({ ...values, error: '', loading: true })
    // postAd({ productname, description, rent, photo })

    //id of user by using variable named id
    //token of user by using varaible named token
    //all data will be available in value formData
    //if error use setValues({...values,error:data.error})
    //else success empty the values using setValues({...values,productname:"",description:'',photo:"",rent:"",quantity:"",loading:false, createdProduct:"data.name"})
  }
  // const postAd = (user) => {
  //   userService
  //     .addUser(user.username, user.email, user.password, 'user')
  //     .then((data) => {
  //       console.log('congratulations you are registered ', data)
  //       setValues({
  //         ...values,
  //         username: '',
  //         email: '',
  //         password: '',
  //         password2: '',
  //         error: false,
  //         success: true,
  //       })
  //     })
  //     .catch((err) => {
  //       let err_msg = err.response.data.error.message
  //       if (!err.response) {
  //         err_msg = 'Error occured please try later'
  //       } else if (err_msg == 'Email is already taken') {
  //         err_msg = err_msg + '\nPlease enter a new one!'
  //       }
  //       setValues({
  //         ...values,
  //         error: err_msg,
  //         loading: false,
  //       })
  //     })
  // }
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
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
            onChange={handleChange('video')}
            type='file'
            name='video'
            accept='.mov,.mp4'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
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
          onChange={handleChange('subcategorie')}
          value={subcategorie}
          className='form-control'
        >
          <option>Please Select</option>
          {subCategories &&
            subCategories.map((c, i) => (
              <option key={i} values={c.name}>
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
          {/* {showLoading()}
          {showSuccess()}
          {showError()} */}
          {newPostForm()}
        </div>
      </div>
    </div>
  )
}

export default AddProduct
