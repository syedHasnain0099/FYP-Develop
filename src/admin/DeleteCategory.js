import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import categoryService from '../services/CategoryService'
function DeleteCategory() {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [category1, setCategory1] = useState('')
  // const [name, setName] = useState('')
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
  const init1 = () => {
    categoryService
      .getCategoryList(category1)
      .then((resolve) => {
        console.log(resolve)
        setSubCategories(resolve)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    init1()
  }, [category1])
  const categoryHandleChange = (event) => {
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    if (option == 1) {
      setCategory1('Home Appliances')
    }
    if (option == 2) {
      setCategory1('Digital')
    }
    console.log(option)
    setCategory(option)
  }
  const subCategoryHandleChange = (event) => {
    const index = event.target.selectedIndex
    const el = event.target.childNodes[index]
    const option = el.getAttribute('id')
    setSubCategory(option)
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    console.log(subCategory)
    console.log(category)
    //deleteSubCategory(subCategory, category)
  }
  const deleteSubCategory = (subCategory, category) => {
    categoryService
      .deleteSubCategory(subCategory, category)
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
      return <h3 className='text-success'> Sub-Category is deleted</h3>
    }
  }
  const showError = () => {
    if (error) {
      return <h3 className='text-danger'> Error Ocuured</h3>
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
        <label for='addcategory'>Sub-Category</label>
        <select
          onChange={subCategoryHandleChange}
          value={subCategory}
          className='form-control'
          required
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

      <button className='btn btn-outline-primary'>Delete Categroy</button>
    </form>
  )
  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='card-header'>Delete Sub-Category</h3>
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

export default DeleteCategory
