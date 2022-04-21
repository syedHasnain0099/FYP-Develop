import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import { useParams } from 'react-router-dom'
import { updateProfile, userData } from '../../auth'

function Profile() {
  let { userId } = useParams()
  const { id } = userData()

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    contact_number: '',
    password: '',
    image: '',
    error: '',
    success: false,
  })
  const {
    first_name,
    last_name,
    username,
    email,
    contact_number,
    password,
    image,
    error,
    success,
  } = values

  const showUserInfo = () => {
    userService
      .getUser(userId)
      .then((data) => {
        console.log('user data: ', data.first_name)
        setValues(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showUserInfo()
  }, [])
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          <li class='list-group-item'>
            <Link className='nav-link' to='/myAds'>
              My Ads
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to={`/profile/${id}`}>
              Update Profile
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Post an ad
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/pending/requests'>
              Pending Requests
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    updateProfile()
  }
  const updateProfile = () => {
    if (password === '') {
      userService
        .updateProfile(
          id,
          first_name,
          last_name,
          username,
          email,
          contact_number,
          password,
          image
        )
        .then((data) => {
          console.log('first name: ', data.first_name)
          setValues({ ...values, success: true })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      userService
        .updateProfile(
          id,
          first_name,
          last_name,
          username,
          email,
          contact_number,
          password,
          image
        )
        .then((data) => {
          console.log('first name: ', data.first_name)
          setValues({ ...values, success: true })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      <h2>Error. Try Again !!!</h2>
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      <h2>Profile has been updated!</h2>
    </div>
  )
  const profileUpdate = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>UserName</label>
        <input
          type='text'
          onChange={handleChange('username')}
          className='form-control'
          value={username}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>First Name</label>
        <input
          type='text'
          onChange={handleChange('first_name')}
          className='form-control'
          value={first_name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Last Name</label>
        <input
          type='text'
          onChange={handleChange('last_name')}
          className='form-control'
          value={last_name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Contact No</label>
        <input
          type='tel'
          onChange={handleChange('contact_number')}
          className='form-control'
          value={contact_number}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-outline-primary'>
        Submit
      </button>
    </form>
  )
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {showSuccess()}
          {showError()}
          <h3 className='card-header mb-3'>Update Profile</h3>
          {profileUpdate()}
        </div>
      </div>
    </div>
  )
}

export default Profile
