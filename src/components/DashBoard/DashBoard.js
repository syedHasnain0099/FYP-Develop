import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { userPassword } from '../../auth'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import productService from '../../services/ProductService'
import Avatar from '@material-ui/core/Avatar'
function DashBoard() {
  const [imageurl, setImageurl] = useState('')
  const [data, setData] = useState([])
  const { id } = userData()
  const pass = userPassword()

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
    console.log("image from data: ",data.image)
    userService
      .getUserDP(data.image)
      .then((url) => {
        console.log('user image url: ', url)
        setImageurl(url)
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
            res[0],
            pass
          )
          .then((data) => {
            console.log('updated image: ', data.image)
            // setValues({ ...values, success: true })
          })
          .catch((err) => {
            console.log(err)
          })
        //again fetching user data to refresh "data" use state and get added image
        getUserInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getUserInfo()
    showUserDP()
    // addDP()
  }, [])
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
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
            <Avatar
              alt='Remy Sharp'
              src={imageurl}
              style={{ width: 100, height: 100 }}
            />
            <br />
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
