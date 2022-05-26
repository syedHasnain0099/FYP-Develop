import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import React from 'react'
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
import DeleteCategory from './admin/DeleteCategory'
import Product from './components/Product/Product'
import SingleHomeProduct from './components/SingleHomeProduct/SingleHomeProduct'
import GetQuote from './components/GetQuote/GetQuote'
import Profile from './components/Profile/Profile'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import MyAds from './components/MyAds/MyAds'
import AcceptedRequests from './components/RequestResponses/AcceptedRequests'
import PendingRequest from './components/PendingRequests/PendingRequest'
import ProductEdit from './components/ProductEdit/ProductEdit'
import ShippingCard from './components/ShippingCard/ShippingCard'
import PaymentCart from './components/PaymentCart/PaymentCart'
import AcceptedAdsDetails from './components/AcceptedAdsDetails/AcceptedAdsDetails'
import Review from './admin/Review'
import ReviewDetail from './components/ReviewDetail/ReviewDetail'
import ReportReviews from './components/ReportReview/ReportReviews'
import AdminShowOrders from './admin/AdminShowOrders'
import StripeButton from './components/StripeButton/StripeButton'
import AddBidItem from './components/AddBidItem/AddBidItem'
import ApproveBidding from './admin/ApproveBidding'
import BiddingProducts from './components/BiddingProducts/BiddingProducts'
import BiddingProductDetails from './components/BiddingProductDetails/BiddingProductDetails'
import BidItemQuote from './components/BidItemQuote/BidItemQuote'
function Routes() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <AdminRoute path='/show/orders'>
            <Header />
            <AdminShowOrders />
          </AdminRoute>
          <AdminRoute path='/review/reporting'>
            <Header />
            <Review />
          </AdminRoute>
          <AdminRoute path='/product/video'>
            <Header />
            <VideoPlayer />
          </AdminRoute>
          <AdminRoute path='/admin/dashboard'>
            <Header />
            <AdminDashBoard />
          </AdminRoute>
          <AdminRoute path='/create/category'>
            <Header />
            <AddCategory />
          </AdminRoute>
          <AdminRoute path='/delete/category'>
            <Header />
            <DeleteCategory />
          </AdminRoute>
          <AdminRoute path='/approve/ad'>
            <Header />
            <ApproveAd />
          </AdminRoute>
          <AdminRoute path='/approve/bid'>
            <Header />
            <ApproveBidding />
          </AdminRoute>
          <AdminRoute path='/reportReviews/:productId'>
            <Header />
            <ReportReviews />
          </AdminRoute>
          <AdminRoute path='/reviewAds/:productId'>
            <Header />
            <ReviewDetail />
          </AdminRoute>
          <AdminRoute path='/approveAds/:productId'>
            <Header />
            <Product />
          </AdminRoute>
          <PrivateRoute path='/test'>
            <Header />
            <StripeButton />
          </PrivateRoute>
          <PrivateRoute path='/product/:productId'>
            <Header />
            <AcceptedAdsDetails />
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <Header />
            <PaymentCart />
          </PrivateRoute>
          <PrivateRoute path='/shipping'>
            <Header />
            <ShippingCard />
          </PrivateRoute>
          <PrivateRoute path='/productEdit/:productId'>
            <Header />
            <ProductEdit />
          </PrivateRoute>
          <PrivateRoute path='/pending/requests'>
            <Header />
            <PendingRequest />
          </PrivateRoute>
          <PrivateRoute path='/myAds'>
            <Header />
            <MyAds />
          </PrivateRoute>
          <PrivateRoute path='/acceptedRequests'>
            <Header />
            <AcceptedRequests />
          </PrivateRoute>
          <PrivateRoute path='/bidItem/:productId'>
            <Header />
            <BidItemQuote />
          </PrivateRoute>
          <PrivateRoute path='/getQuote/:productId'>
            <Header />
            <GetQuote></GetQuote>
          </PrivateRoute>
          <PrivateRoute path='/profile/:userId'>
            <Header />
            <Profile />
          </PrivateRoute>
          <PrivateRoute path='/user/dashboard'>
            <Header />
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path='/create/product'>
            <Header />
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute path='/create/bidItem'>
            <Header />
            <AddBidItem />
          </PrivateRoute>

          <Route path='/bidProduct/:productId'>
            <Header />
            <BiddingProductDetails />
          </Route>
          <Route path='/products/:productId'>
            <Header />
            <SingleHomeProduct />
          </Route>
          <Route path='/ForgotPasswordForm'>
            <Header />
            <ForgotPasswordForm></ForgotPasswordForm>
          </Route>
          <Route path='/products'>
            <Header />
            <Products />
          </Route>
          <Route path='/bidding/products'>
            <Header />
            <BiddingProducts />
          </Route>

          <Route path='/ResetPageForm'>
            <Header />
            <ResetPageForm></ResetPageForm>
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
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes
