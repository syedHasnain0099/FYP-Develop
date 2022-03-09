import React, { useEffect } from 'react'
import { isAuthenticated } from '../../auth'
import userService from '../../services/UserService'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
function AdminDashBoard() {
  const { id, username, email } = userData()
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
            <Link className='nav-link' to='/approve/ad'>
              Approve Ad
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
            <li class='list-group-item'>{username}</li>
            <li class='list-group-item'>{email}</li>
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
