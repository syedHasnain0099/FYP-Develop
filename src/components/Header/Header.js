import React, { useEffect } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider'
import userService from '../../services/UserService'
// const isActive = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: '#ff9900' }
//   } else {
//     return { color: '#ffffff' }
//   }
// }
// function Header({ history })
// style={isActive(history, '/login')}
function Header() {
  const [{ basket, user }, dispatch] = useStateValue()

  const login = () => {
    if (user) {
      userService
        .logout()
        .then((response) => {
          console.log('Signed out', response)
          dispatch({
            type: 'ADD_USER',
            user: null,
          })
        })
        .catch((err) => {
          console.log('cant log out')
        })
    }
  }
  return (
    <nav>
      <Link to='/'>
        <div className='logo'>RenToday.</div>
      </Link>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to={!user && '/login'}>
            <div onClick={login} className='header__option'>
              <span className='header__optionLineOne'>
                Hello {user ? user : 'Stranger'}
              </span>
              <span className='header__optionLineTwo'>
                Sign {user ? 'Out' : 'In'}
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/SignUp'>Signup</Link>
        </li>
        <li>
          <Link to='/checkout' className='header__link'>
            <div className='header__optionBasket'>
              <ShoppingBasketIcon></ShoppingBasketIcon>
              <span className='header__optionLineTwo header__basketCount'>
                {basket?.length}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
