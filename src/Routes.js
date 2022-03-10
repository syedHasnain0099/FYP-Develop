import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import React from 'react'
import GetQuoteForm from './components/GetQuote/GetQuoteForm'
import Checkout from './components/Cart/Checkout'
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm'
import ResetPageForm from './components/ForgotPassword/ResetPageForm'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import PrivateRoute from './auth/PrivateRoute'
import DashBoard from './components/DashBoard/DashBoard'
import AdminRoute from './auth/AdminRoute'
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ApproveAd from './admin/ApproveAd'
import AddProduct from './components/AddProduct/AddProduct'
function Routes() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <AdminRoute path='/admin/dashboard'>
            <Header />
            <AdminDashBoard />
          </AdminRoute>
          <AdminRoute path='/create/category'>
            <Header />
            <AddCategory />
          </AdminRoute>
          <AdminRoute path='/approve/ad'>
            <Header />
            <ApproveAd />
          </AdminRoute>
          <PrivateRoute path='/user/dashboard'>
            <Header />
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path='/create/product'>
            <Header />
            <AddProduct />
          </PrivateRoute>
          <Route path='/ForgotPasswordForm'>
            <Header />
            <ForgotPasswordForm></ForgotPasswordForm>
          </Route>
          <Route path='/ResetPageForm/:id'>
            <Header />
            <ResetPageForm></ResetPageForm>
            <Header />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/getQuote'>
            <Header />
            <GetQuoteForm></GetQuoteForm>
          </Route>
          <Route path='/SignUp'>
            <Header />
            <SignUp></SignUp>
          </Route>
          <Route path='/login'>
            <Header />
            <Login></Login>
          </Route>
          <Route path='/'>
            <Header />
            <Home></Home>
          </Route>
          <Route path='/products'>
            <Header />
            <Products />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes
