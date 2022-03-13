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
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    setCategory = option
  }
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
        <label className='text-muted'>Category</label>
        <select
          onChange={categoryHandleChange}
          value={category}
          className='form-control'
        >
          <option>Please Select</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} id={cat.id} value={cat.name}>
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
        <h3 className='card-header'>Create Sub-Category</h3>
        <div className='mt-4 col-md-8 offset-md-2'>{newCategroyForm()}</div>
        {goBack()}
      </div>
    </div>
  )
}

export default AddCategory
