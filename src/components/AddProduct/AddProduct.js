import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import { userData } from '../../auth'
import categoryService from '../../services/CategoryService'
function AddProduct() {
  const { id, username, email } = userData()
  const { token } = isAuthenticated()
  const init = () => {
    categoryService
      .getCategories()
      .then((response) => {
        console.log(response)
        setValues({ ...values, categories: response, formData: new FormData() })
      })
      .catch((err) => {
        setValues({ ...values, error: err })
      })
  }

  const [values, setValues] = useState({
    name: '',
    description: '',
    rent: '',
    duration: '',
    categories: [],
    category: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })
  const {
    name,
    description,
    rent,
    duration,
    categories,
    category,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values
  useEffect(() => {
    init()
  }, [])
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }
  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    //id of user by using variable named id
    //token of user by using varaible named token
    //all data will be available in value formData
    //if error use setValues({...values,error:data.error})
    //else success empty the values using setValues({...values,name:"",description:'',photo:"",rent:"",quantity:"",loading:false, createdProduct:"data.name"})
  }
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
      <div className='form-group'>
        <label className='text-muted'>Name</label>
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
        <label className='text-muted'>Categroy</label>
        <select
          onChange={handleChange('category')}
          value={category}
          className='form-control'
        >
          <option>Please Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c.name}>
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
  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='card-header'>Post an ad</h3>
        <div className='col-md-8 offset-md-2'>{newPostForm()}</div>
      </div>
    </div>
  )
}

export default AddProduct
