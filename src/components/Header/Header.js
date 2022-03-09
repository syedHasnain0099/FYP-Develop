import React, { Fragment, useEffect } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link, Redirect } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider'
import userService from '../../services/UserService'
import { NavLink } from 'react-router-dom'
import { isAuthenticated } from '../../auth'

function Header() {
  const [{ basket, user }, dispatch] = useStateValue()
  const signOut = () => {
    userService
      .logout()
      .then((response) => {
        console.log('Signed out', response)
        // dispatch({
        //   type: 'ADD_USER',
        //   user: null,
        // })
        // setRedirectToReferrer(true)
      })
      .catch((err) => {
        console.log('cant log out')
        // setRedirectToReferrer(false)
      })
    // }
  }
  return (
    <div>
      <nav class='navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm'>
        <div className='container'>
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
            <ul class='navbar-nav mx-auto'>
              <li class='nav-item '>
                <NavLink class='nav-link' to='/'>
                  Home
                </NavLink>
              </li>
              <li class='nav-item'>
                <NavLink class='nav-link' to='/products'>
                  Products
                </NavLink>
              </li>
              <li class='nav-item'>
                <NavLink class='nav-link' to='/about'>
                  About
                </NavLink>
              </li>
              <li class='nav-item'>
                <NavLink class='nav-link' to='/contact'>
                  Contact
                </NavLink>
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
              <NavLink
                to='/user/dashboard'
                className='btn btn-outline-dark ms-2'
              >
                <i className='fa fa-user me-1'></i>Profile
              </NavLink>
              <NavLink to='/cart' className='btn btn-outline-dark ms-2'>
                <i className='fa fa-shopping-cart me-1'></i> Cart(0)
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
