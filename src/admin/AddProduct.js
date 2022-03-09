import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AddProduct() {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: '',
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
    price,
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
    setValues({ ...values, formData: new FormData() })
  })
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }
  const clickSubmit = (event) => {
    event.preventDefault()
  }
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            //  onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          //  onChange={handleChange('name')}
          type='text'
          value={name}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          //  onChange={handleChange('description')}
          value={description}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Rent per Day</label>
        <input
          //  onChange={handleChange('price')}
          value={price}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Categroy</label>
        <select
          //  onChange={handleChange('category')}
          value={category}
          className='form-control'
        >
          <option value='Digital'>Digital</option>
          <option value='homeAppliances'>Home Appliances</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          //  onChange={handleChange('quantity')}
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
