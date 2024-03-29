import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import React from 'react'
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm'
import ResetPageForm from './components/ForgotPassword/ResetPageForm'
import ForgotPasswordF from './components/RetreivePassword/ForgotPasswordFormAdmin'
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
import WonItems from './components/wonBids/wonItems'
import PendingRequest from './components/PendingRequests/PendingRequest'
import ProductEdit from './components/ProductEdit/ProductEdit'
import ShippingCard from './components/ShippingCard/ShippingCard'
import PaymentCart from './components/PaymentCart/PaymentCart'
import AcceptedAdsDetails from './components/AcceptedAdsDetails/AcceptedAdsDetails'
import Review from './admin/Review'
import ReviewDetail from './components/ReviewDetail/ReviewDetail'
import ReportReviews from './components/ReportReview/ReportReviews'
import AdminShowOrders from './admin/AdminShowOrders'
import PaymentSuccess from './components/ConfirmPayment/PaymentSuccess'
import BiddingPaymentSuccess from './components/ConfirmBiddingPayment/PaymentSuccess'
import AddBidItem from './components/AddBidItem/AddBidItem'
import ApproveBidding from './admin/ApproveBidding'
import BiddingProducts from './components/BiddingProducts/BiddingProducts'
import BiddingProductDetails from './components/BiddingProductDetails/BiddingProductDetails'
import BidItemQuote from './components/BidItemQuote/BidItemQuote'
import ForgotPasswordFormAdmin from './components/RetreivePassword/ForgotPasswordFormAdmin'
import AddToCart from './components/Cart/AddToCart'
import UserOrderHistory from './components/UserOrderHistory/UserOrderHistory'
import BiddingAdDetails from './components/BiddingAdDetails/BiddingAdDetails'
import BiddingShippingCard from './components/BiddingShippingCard/BiddingShippingCard'
import BiddingPaymentCart from './components/BiddingPaymentCart/BiddingPaymentCart'
import MyBiddingAds from './components/MyBiddingAds/MyBiddingAds'
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
          <AdminRoute path='/approveAdBidding/:productId'>
            <Header />
            <BiddingAdDetails />
          </AdminRoute>
          <PrivateRoute path='/orderHistory'>
            <Header />
            <UserOrderHistory />
          </PrivateRoute>
          <PrivateRoute path='/payment/success'>
            <Header />
            <PaymentSuccess />
          </PrivateRoute>
          <PrivateRoute path='/biddingpayment/success'>
            <Header />
            <BiddingPaymentSuccess />
          </PrivateRoute>
          <PrivateRoute path='/product/:productId'>
            <Header />
            <AcceptedAdsDetails />
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <Header />
            <PaymentCart />
          </PrivateRoute>
          <PrivateRoute path='/bidding/payment'>
            <Header />
            <BiddingPaymentCart />
          </PrivateRoute>
          <PrivateRoute path='/cart'>
            <Header />
            <AddToCart />
          </PrivateRoute>
          <PrivateRoute path='/shipping'>
            <Header />
            <ShippingCard />
          </PrivateRoute>
          <PrivateRoute path='/bidding/shipping'>
            <Header />
            <BiddingShippingCard />
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
          <PrivateRoute path='/wonItems'>
            <Header />
            <WonItems />
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
          <PrivateRoute path='/myBiddingAds'>
            <Header />
            <MyBiddingAds />
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
          <Route path='/ForgotPasswordFormAdmin'>
            <Header />
            <ForgotPasswordFormAdmin></ForgotPasswordFormAdmin>
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
