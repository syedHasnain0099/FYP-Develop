import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import categoryService from '../services/CategoryService'
function AddCategory() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const init = () => {
    categoryService
      .getCategories()
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    init()
  }, [])
  const categoryHandleChange = (event) => {
    console.log('event occurs')
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    setCategory(option)
  }
  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    console.log('set name', name)
    console.log('ste id', category)
    addSubCategory(name, category)
  }
  const addSubCategory = (name, category) => {
    categoryService
      .addSubCategory(name, category)
      .then((data) => {
        console.log(`category is added`, data)
        setError('')
        setSuccess(true)
      })
      .catch((err) => {
        setError(true)
      })
  }
  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} is created</h3>
    }
  }
  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>{name} should be unique</h3>
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
        <label className='text-muted'>Category</label>
        <select
          onChange={categoryHandleChange}
          value={category}
          className='form-control'
          required
        >
          <option>Please Select</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} id={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label for='addcategory'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          id='addcategory'
          required
        />
      </div>

      <button className='btn btn-outline-primary'>Create Categroy</button>
    </form>
  )
  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='card-header'>Create Sub-Category</h3>
        <div className='mt-4 col-md-8 offset-md-2'>
          {showError()}
          {showSuccess()}
          {newCategroyForm()}
        </div>
        {goBack()}
      </div>
    </div>
  )
}

export default AddCategory
