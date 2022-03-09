import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function AddCategory() {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    //make request to api to create category
  }
  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} is created</h3>
    }
  }
  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>Category should be unique</h3>
    }
  }
  const goBack = () => (
    <div className='mt-5 col-md-8 offset-md-2'>
      <Link to='/admin/dashboard' className='text-warning'>
        Back to DashBoard
      </Link>
    </div>
  )

  const newCategroyForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label for='addcategory'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          id='addcategory'
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Create Categroy</button>
    </form>
  )
  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='card-header'>Create Category</h3>
        <div className='mt-4 col-md-8 offset-md-2'>{newCategroyForm()}</div>
        {goBack()}
      </div>
    </div>
  )
}

export default AddCategory
