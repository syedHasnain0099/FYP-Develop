import React, { Fragment, useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link, Redirect } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider'
import userService from '../../services/UserService'
import { NavLink } from 'react-router-dom'
import { isAuthenticated, userData } from '../../auth'
import { withRouter } from 'react-router-dom'
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ffffff' }
  } else {
    return { color: '#082567' }
  }
}
function Header({ history }) {
  const { type } = userData()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [{ basket, user }, dispatch] = useStateValue()
  const signOut = () => {
    userService
      .logout()
      .then((response) => {
        console.log('Signed out', response)
        setRedirectToReferrer(true)
        redirectUser()
      })
      .catch((err) => {
        console.log('cant log out')
        setRedirectToReferrer(false)
      })
    // }
  }
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/'></Redirect>
    }
  }
  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm jumbotron'>
      <NavLink class='navbar-brand fw-bold fs-4' to='/'>
        RentToday
      </NavLink>
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>

      <div class='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul class='navbar-nav mx-auto mb-2 mb-lg-0'>
          <li class='nav-item '>
            <Link class='nav-link' to='/' style={isActive(history, '/')}>
              Home
            </Link>
          </li>
          <li class='nav-item'>
            <Link
              class='nav-link'
              to='/products'
              style={isActive(history, '/products')}
            >
              Products
            </Link>
          </li>
          <li class='nav-item'>
            <Link
              class='nav-link'
              to='/about'
              style={isActive(history, '/about')}
            >
              About
            </Link>
          </li>
          <li class='nav-item'>
            <Link
              class='nav-link'
              to='/contact'
              style={isActive(history, '/contact')}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className='buttons'>
          {!isAuthenticated() && (
            <Fragment>
              <NavLink to='/login' className='btn btn-outline-dark'>
                <i className='fa fa-sign-in me-1'></i> Login
              </NavLink>
              <NavLink to='/SignUp' className='btn btn-outline-dark ms-2'>
                <i className='fa fa-user-plus me-1'></i> Register
              </NavLink>
            </Fragment>
          )}
          {isAuthenticated() && (
            <Link to='/'>
              <span onClick={signOut} className='btn btn-outline-dark ms-2'>
                <i className='fa fa-sign-out me-1'></i> Sign Out
              </span>
            </Link>
          )}
          {isAuthenticated() && type === 'admin' && (
            <NavLink
              to='/admin/dashboard'
              className='btn btn-outline-dark ms-2'
            >
              <i className='fa fa-user me-1'></i>Profile
            </NavLink>
          )}
          {isAuthenticated() && type === 'user' && (
            <NavLink to='/user/dashboard' className='btn btn-outline-dark ms-2'>
              <i className='fa fa-user me-1'></i>Profile
            </NavLink>
          )}

          {/* <NavLink to='/cart' className='btn btn-outline-dark ms-2'>
            <i className='fa fa-shopping-cart me-1'></i> Cart(0)
          </NavLink> */}
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
