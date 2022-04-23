import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import { useParams } from 'react-router-dom'
import { userData } from '../../auth'
import { userPassword } from '../../auth'
import validateInfo from './validateInfoProfile'
import './Profile.css'
function Profile() {
  let { userId } = useParams()
  const { id } = userData()
  const pass = userPassword()
  const [passwordButton, setPasswordButton] = useState(false)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    contact_number: '',
    password: '',
    password2: '',
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
    password2,
    image,
    error,
    success,
  } = values

  const showUserInfo = () => {
    setPasswordButton(true)
    userService
      .getUser(userId)
      .then((data) => {
        console.log('user data: ', data)

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
              class='list-group-item list-group-item-action active '
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
              class='list-group-item list-group-item-action '
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
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }
  const clearErrorFields = () => {
    setErrors('')
    setValues({ ...values, success: '' })
  }
  const clickSubmit = (e) => {
    clearErrorFields()
    e.preventDefault()
    setErrors(validateInfo(values))

    var errors = validateInfo(values)
    if (Object.keys(errors).length === 0) {
      console.log('it is working')
      updateProfile()
    }
  }
  const ChangePassword = () => {
    setPasswordButton(false)
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
        <label className='text-muted'>User Name</label>

        <input
          type='text'
          onChange={handleChange('username')}
          className='form-control'
          value={username}
        />
        {errors.username && <p className='profile-p'>{errors.username}</p>}
      </div>
      <div className='form-group'>
        <label className='text-muted'>First Name</label>
        <input
          type='text'
          onChange={handleChange('first_name')}
          className='form-control'
          value={first_name}
        />
        {errors.firstname && <p className='profile-p'>{errors.firstname}</p>}
      </div>
      <div className='form-group'>
        <label className='text-muted'>Last Name</label>
        <input
          type='text'
          onChange={handleChange('last_name')}
          className='form-control'
          value={last_name}
        />
        {errors.lastname && <p className='profile-p'>{errors.lastname}</p>}
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
        {errors.email && <p className='profile-p'>{errors.email}</p>}
      </div>

      <div className='form-group'>
        <label className='text-muted'>Contact No (Format : 01234567890)</label>
        <input
          type='tel'
          onChange={handleChange('contact_number')}
          className='form-control'
          value={`+92 ${contact_number}`}
          pattern='[0-9]{11}'
        />
      </div>

      {passwordButton && (
        <div>
          <button
            type='button'
            class='btn btn-outline-secondary'
            onClick={ChangePassword}
          >
            Click Here To Change Password
          </button>
        </div>
      )}

      {!passwordButton && (
        <>
          <div className='form-group'>
            <label className='text-muted'>New Password</label>
            <input
              type='password'
              onChange={handleChange('password')}
              className='form-control'
              value={password}
            />
            {errors.password && <p className='profile-p'>{errors.password}</p>}
          </div>
          <div className='form-group'>
            <label className='text-muted'>Confirm Password</label>
            <input
              type='password'
              onChange={handleChange('password')}
              className='form-control'
              value={password2}
            />
            {errors.password2 && (
              <p className='profile-p'>{errors.password2}</p>
            )}
          </div>
        </>
      )}

      <br />
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
