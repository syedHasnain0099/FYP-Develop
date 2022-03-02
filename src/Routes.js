import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import Home from './components/Home/Home'
import React from 'react'
import GetQuoteForm from './components/GetQuote/GetQuoteForm'
import Checkout from './components/Cart/Checkout'
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm'
import ResetPageForm from './components/ForgotPassword/ResetPageForm'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Product_Listing from './components/Product_Listing/Product_Listing'
function Routes() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route path='/ForgotPasswordForm'>
            <Header></Header>
            <ForgotPasswordForm></ForgotPasswordForm>
          </Route>
          <Route path='/ResetPageForm/:id'>
            <Header></Header>
            <ResetPageForm></ResetPageForm>
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/getQuote'>
            <Header></Header>
            <GetQuoteForm></GetQuoteForm>
          </Route>
          <Route path='/SignUp'>
            <Header></Header>
            <SignUp></SignUp>
          </Route>
          <Route path='/login'>
            <Header></Header>
            <Login></Login>
          </Route>
          <Route path='/'>
            <Product_Listing></Product_Listing>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes
