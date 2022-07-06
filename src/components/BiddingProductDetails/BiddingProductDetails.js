import React, { useEffect, useState } from 'react'
import biddingService from '../../services/BiddingService'
import reportingService from '../../services/ReportingService'
import { NavLink, useParams } from 'react-router-dom'
import {
  Alert,
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Skeleton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import { isAuthenticated, userData } from '../../auth'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import './SingleHomeProduct.css'
import ProductImagesSlider from './ProductImagesSlider'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Box from '@material-ui/core/Box'
import { reasonOptions } from './ReasonOptions'
import VirtualizedSelect from 'react-virtualized-select'
function BiddingProductDetails() {
  const option = reasonOptions()
  let { productId } = useParams()
  const { id } = userData()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState('')
  const [itemName, setItemName] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [searched, setSearched] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [reason, setReason] = useState('')
  const [reason1, setReason1] = useState('')
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openSuccessAlertReview, setOpenSuccessAlertReview] = useState(false)
  const [reviewId, setReviewId] = useState('')
  let mediaType = ''
  console.log(productId)
  const getProducts = (productId) => {
    setLoading(true)
    biddingService
      .getOneBiddingItem(productId)
      .then((response) => {
        console.log('bidding item: ', response[0])
        setSubCategory(response[0].subCategory)
        setItemName(response[0].name)
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log('inside catch')
        console.log(err)
      })
  }
  useEffect(() => {
    getProducts(productId)
  }, [])

  const getRelatedProducts = () => {
    biddingService
      .getRelatedProducts(subCategory, itemName)
      .then((response) => {
        console.log('related products: ', response)
        setRelatedProducts(response)
        setSearched(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getRelatedProducts()
  }, [itemName])
  const Loading = () => {
    return (
      <>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
      </>
    )
  }

  const searchMessage = (searched, relatedProducts) => {
    if (searched && relatedProducts.length > 0) {
      return `Found ${relatedProducts.length} related product`
    }
    if (searched && relatedProducts.length < 1) {
      return `No related products found`
    }
  }
  const handleChange1 = () => {
    console.log(productId)
    //reason for reporting ad
    // reason= reporting reason of Ad
    setOpen1(false)
    //when api successfull run next line init
    setOpenSuccessAlert(true)
  }
  const SuccessDialogue = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Collapse in={openSuccessAlert}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpenSuccessAlert(false)
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Ad has been reported SuccessFully!
          </Alert>
        </Collapse>
      </Box>
    )
  }

  const showProduct3 = () =>
    data.map((product) => (
      <div className='container single_product show' style={{ margin: '0px' }}>
        {loading ? (
          <Loading />
        ) : (
          <div className='row'>
            <div className='col-sm-6 '>
              <div className='img_div'>
                <div
                  style={{
                    // height: '100vh',
                    display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '500px',
                      backgroundColor: '#fff',
                      padding: '20px',
                    }}
                  >
                    <ProductImagesSlider images={product.image_urls} />
                    <br />

                    <span className='description-form-input-login'>
                      <NavLink
                        to={{
                          pathname: '/product/video',
                          state: { video: product.image_urls },
                        }}
                        exact
                      >
                        Watch video of product
                      </NavLink>
                    </span>
                  </div>
                </div>
                {/* <img
                          className='img-fluid'
                          src={product.image_urls[0]}
                          alt=''
                        /> */}
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='product_desc_wrapper'>
                <div className='product_title'>
                  <h1>{product.name}</h1>
                  <span>
                    <h6>Product # {product.id}</h6>
                  </span>
                  <hr />
                  <h1>Bidding Amount: {product.bid}</h1>
                </div>
                <Link to={`/bidItem/${product.id}`}>
                  <button className='btn bg-cart mt-2 mb-2 mr-2'>
                    Bid on an item
                  </button>
                </Link>

                <div className='stock'>
                  <hr />
                  <h6>
                    Status:
                    {product.quantity < 1 ? (
                      <span className='text-danger'>Out of Stock</span>
                    ) : (
                      <span className='text-success'>Available</span>
                    )}
                  </h6>
                </div>

                <hr />
                <div className='desc'>
                  <h2>Description</h2>
                  <p>{product.description}</p>
                </div>
                <hr />
                <div className='desc'>
                  <h2>Supplier Information</h2>
                  <p>Name: {product.supplier.username}</p>
                  <p>Email: {product.supplier.email}</p>
                  <p>Contact number:{product.supplier.contactNumber}</p>
                </div>
                <hr />

                {SuccessDialogue()}
              </div>
            </div>
          </div>
        )}
      </div>
    ))

  return (
    <div>
      <div className='container my-1 py-1'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-6 fw-bolder text-center'>
              Product Description
            </h1>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : showProduct3()}
        </div>
      </div>
    </div>
  )
}

export default BiddingProductDetails
