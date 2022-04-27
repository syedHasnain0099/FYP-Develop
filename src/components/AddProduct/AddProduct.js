import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import { userData } from '../../auth'
import categoryService from '../../services/CategoryService'
import productService from '../../services/ProductService'
import ReactPlayer from 'react-player'
import { fileObj, fileArray, videofileObj, videofileArray } from '../../auth'
import './AddProduct.css'
function AddProduct() {
  const [imageFile, setImageFile] = useState({
    file: [null],
  })
  const uploadMultipleFiles = (e) => {
    console.log("my multiple files:",e.target.files)
    productService
      .uploadMedia(e.target.files)
      .then((res) => {
        console.log(res)
        console.log('id of uploaded image', res)
        setMediaIds(res)
      })
      .catch((err) => {
        console.log(err)
      })
    fileObj.push(e.target.files)

    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setImageFile({ file: fileArray })
  }
  const [videoFile, setVideoFile] = useState({
    videofile: [null],
  })
  const uploadVideoMultipleFiles = (e) => {
    productService
      .uploadMedia(e.target.files)
      .then((res) => {
        console.log('id of uploaded video', res)
        setVideoMediaId(res)
      })
      .catch((err) => console.log(err))
    videofileObj.push(e.target.files)
    for (let i = 0; i < videofileObj[0].length; i++) {
      videofileArray.push(URL.createObjectURL(videofileObj[0][i]))
    }
    setVideoFile({ videofile: videofileArray })
  }

  const { id } = userData()
  const [categories, setCategories] = useState([])
  const [mediaIds, setMediaIds] = useState([])
  const [videoMediaId, setVideoMediaId] = useState([])
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
    loading: false,
    error: '',
    createdProduct: '',
  })

  const {
    productname,
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
    console.log("my files: ",event.target.files)
    productService
      .uploadMedia(event.target.files)
      .then((res) => {
        console.log(res)
        for(let mediaFile of res){
          console.log('id of uploaded image', mediaFile)
          setMediaIds(mediaFile)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const videoMediaHandleChange = (event) => {
    productService
      .uploadMedia(event.target.files)
      .then((res) => {
        for(let videoFile of res){
          console.log('id of uploaded video', videoFile)
          setVideoMediaId(videoFile)
        }
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
    const mIds = []
    mIds.push(mediaIds)
    if (videoMediaId != '') {
      mIds.push(videoMediaId)
    }

    postAd(
      { productname, description, rent, duration, subcategory, quantity, id },
      mIds
    )
  }
  const postAd = (props, mediaIds) => {
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
        <div className='form-group multi-preview '>
          {(fileArray || []).map((url, i) => (
            <img className='img' src={url} alt='...' key={i} />
          ))}
        </div>

        <div className='form-group'>
          <input
            type='file'
            className='form-control'
            onChange={uploadMultipleFiles}
            multiple
            accept='image/*'
            required
          />
        </div>

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
        <div className='form-group multi-preview '>
          {(videofileArray || []).map((url) => (
            <ReactPlayer
              url={url}
              controls
              onReady={() => console.log('onReady callback')}
              onStart={() => console.log('onStart callback')}
              onPause={() => console.log('onPause callback')}
              onEnded={() => console.log('onEnded callback')}
              onError={() => console.log('onError callback')}
            />
          ))}
        </div>

        <div className='form-group'>
          <input
            type='file'
            className='form-control'
            onChange={uploadVideoMultipleFiles}
            multiple
            accept='.mov,.mp4'
            required
          />
        </div>
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
      <h2>{`${createdProduct}`} ad is created</h2>
    </div>
  )
  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          {/* <li class='list-group-item list-group-item-action active'>
              <Link className='nav-link' to='/myAds'>
                My Ads
              </Link>
            </li> */}
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/myAds'
              role='tab'
              aria-controls='home'
            >
              My Ads
            </Link>
          </li>
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to={`/profile/${id}`}
              role='tab'
              aria-controls='home'
            >
              Update Profile
            </Link>
          </li>
          {/* <li class='list-group-item'>
              <Link className='nav-link' to={`/profile/${id}`}>
                Update Profile
              </Link>
            </li> */}
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action active'
              id='list-home-list'
              data-toggle='list'
              to='/create/product'
              role='tab'
              aria-controls='home'
            >
              Post an ad
            </Link>
          </li>
          {/* <li class='list-group-item'>
              <Link className='nav-link' to='/create/product'>
                Post an ad
              </Link>
            </li> */}
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/pending/requests'
              role='tab'
              aria-controls='home'
            >
              Recieved Requests
            </Link>
          </li>
          {/* <li class='list-group-item'>
              <Link className='nav-link' to='/pending/requests'>
                Recieved Requests
              </Link>
            </li> */}
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/acceptedRequests'
              role='tab'
              aria-controls='home'
            >
              Recieved Responses
            </Link>
          </li>
          {/* <li class='list-group-item'>
              <Link className='nav-link' to='/acceptedRequests'>
                Recieved Responses
              </Link>
            </li> */}
        </ul>
      </div>
    )
  }
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          <h3 className='card-header mb-3'>Post an ad</h3>
          {/* <div className='col-md-8 offset-md-2'> */}
          {showLoading()}
          {console.log(imageFile)}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {/* </div> */}
        </div>
      </div>
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

export default AddProduct
