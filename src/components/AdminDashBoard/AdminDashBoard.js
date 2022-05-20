import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../auth'
import userService from '../../services/UserService'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
function AdminDashBoard() {
  const [data, setData] = useState([])
  const { id, username, email } = userData()
  const showAdminInfo = () => {
    userService
      .getUser(id)
      .then((data) => {
        console.log('user data: ', data)
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showAdminInfo()
  }, [])

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul class='list-group list-group-flush'>
          <li class='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Create Category
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/delete/category'>
              Delete Category
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/approve/ad'>
              Approve Ad
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/review/reporting'>
              Review Reporting
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const adminInfo = () => {
    return (
      <div className='card mb-5 mu-5'>
        <h3 className='card-header'> Admin Information</h3>
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
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-9'>{adminInfo()}</div>
      </div>
    </div>
  )
}

export default AdminDashBoard
