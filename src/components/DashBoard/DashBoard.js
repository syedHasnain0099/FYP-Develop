import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import productService from '../../services/ProductService'

function DashBoard() {
  const [data, setData] = useState([])
  const { id } = userData()

  const getUserInfo = () => {
    userService
      .getUser(id)
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showUserDP = () => {
    userService
      .getUserDP(data.image)
      .then((url) => {
        console.log('user image url: ', url)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addDP = (event) => {
    productService
      .uploadMedia(event.target.files)
      .then((res) => {
        console.log(res)
        console.log('id of uploaded image', res)
        //updating image in user profile
        userService
        .updateProfile(
          id,
          data.first_name,
          data.last_name,
          data.username,
          data.email,
          data.contact_number,
          data.password,
          res[0]
        )
        .then((data) => {
          console.log('updated image: ', data.image)
          // setValues({ ...values, success: true })
        })
        .catch((err) => {
          console.log(err)
        })
        //again fetching user data to refresh "data" use state
        getUserInfo();
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showUserDP()
    getUserInfo()
    addDP()
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
  const userInfo = () => {
    return (
      <div className='card mb-5 mu-5'>
        <h3 className='card-header'> User Information</h3>
        <div class='card-body'>
          <ul class='list-group list-group-flush'>
            <label className='text-muted'>First Name</label>
            <li class='list-group-item'>{data.first_name}</li>
            <label className='text-muted'>Last Name</label>
            <li class='list-group-item'>{data.last_name}</li>
            <label className='text-muted'>UserName</label>
            <li class='list-group-item'>{data.username}</li>
            <label className='text-muted'>Email</label>
            <li class='list-group-item'>{data.email}</li>
            <label className='text-muted'>Contact Number</label>
            <li class='list-group-item'>+92 {data.contact_number}</li>
          </ul>
        </div>
      </div>
    )
  }
  const rentedHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Rented History</h3>
        <div class='card-body'>
          <ul class='list-group list-group-flush'>
            <li class='list-group-item'>Cras justo odio</li>
            <li class='list-group-item'>Dapibus ac facilisis in</li>
            <li class='list-group-item'>Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {rentedHistory()}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
