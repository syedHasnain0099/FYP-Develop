import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link, withRouter } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider'
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
  const [{ basket, user }] = useStateValue()
  console.log(basket)
  return (
    <nav>
      <Link to='/'>
        <div className='logo'>RenToday.</div>
      </Link>

      {/* <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div> */}
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>
            <div className='header__option'>
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
