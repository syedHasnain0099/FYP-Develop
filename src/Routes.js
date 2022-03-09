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
import AddProduct from './components/AddProduct/AddProduct'
function Routes() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Switch>
          <PrivateRoute path='/user/dashboard'>
            <DashBoard />
          </PrivateRoute>
          <AdminRoute path='/admin/dashboard'>
            <AdminDashBoard />
          </AdminRoute>
          <AdminRoute path='/create/category'>
            <AddCategory />
          </AdminRoute>
          <PrivateRoute path='/create/product'>
            <AddProduct />
          </PrivateRoute>
          <Route path='/ForgotPasswordForm'>
            <ForgotPasswordForm></ForgotPasswordForm>
          </Route>
          <Route path='/ResetPageForm/:id'>
            <ResetPageForm></ResetPageForm>
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route path='/getQuote'>
            <GetQuoteForm></GetQuoteForm>
          </Route>
          <Route path='/SignUp'>
            <SignUp></SignUp>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/'>
            <Home></Home>
          </Route>
          <Route path='/products'>
            <Products />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes
