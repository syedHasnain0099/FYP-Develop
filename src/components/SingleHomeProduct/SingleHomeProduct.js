import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
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
function SingleHomeProduct() {
  const option = reasonOptions()
  let { productId } = useParams()
  const { id } = userData()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState('')
  const [productName, setProductName] = useState('')
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
  let mediaType = ''
  const getProducts = (productId) => {
    setLoading(true)
    productService
      .findOneProduct(productId)
      .then((response) => {
        console.log('product: ', response[0])
        setSubCategory(response[0].subCategory)
        setProductName(response[0].name)
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

  const getAllReviews = () => {
    productService
      .getReviews(productId)
      .then((response) => {
        console.log('product reviews ', response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getRelatedProducts = () => {
    productService
      .getRelatedProducts(subCategory, productName)
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
    getAllReviews()
  }, [productName])
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
  const submitRating = async (e) => {
    const userId = id
    e.preventDefault()
    productService
      .uploadReview(comment, rating, productId, userId)
      .then((response) => {
        console.log('uploaded review: ', response)
      })
      .catch((err) => {
        console.log(err)
      })
    //rating
    //comment
  }
  const handleChange = (reviewId) => {
    // reason of reporting review
    setOpen(false)
    console.log(reviewId)
    // reason= reporting reason of review
    console.log(reason)
    //when api successfull run next line init
    productService
      .addReportingReason(reviewId,reason1)
      .then((data)=> {
        console.log("reporting reason: ", data)
        setOpenSuccessAlertReview(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleChange1 = () => {
    //reason for reporting ad
    // reason= reporting reason of Ad
    console.log(reason1)
    setOpen1(false)
    productService
      .addReportingReason(productId,reason1)
      .then((data)=> {
        console.log("reporting reason: ", data)
        setOpenSuccessAlert(true)
      })
      .catch((err) => {
        console.log(err)
      })
    //when api successfull run next line init
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
  const SuccessDialogueReview = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Collapse in={openSuccessAlertReview}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpenSuccessAlertReview(false)
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Review has been reported SuccessFully!
          </Alert>
        </Collapse>
      </Box>
    )
  }
  const showProduct3 = () =>
    data.map((product) => (
      <div className='container single_product show'>
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

                <div className='review' style={{ paddingTop: '10px' }}>
                  <h4>REVIEWS</h4>

                  {product.reviews && product.reviews.length === 0 && (
                    <>
                      <div
                        class='alert alert-warning alert_warning_custom'
                        role='alert'
                        data-mdb-color='warning'
                      >
                        No review added yet
                      </div>
                    </>
                  )}

                  <div className='review_loop'>
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ul className='review_list'>
                          <li>
                            {/* <strong>{review.name}</strong> */}
                            <strong>Syed Hasnain</strong>
                          </li>
                          <li>
                            {Array(review.rating)
                              .fill()
                              .map((_, i) => (
                                <span style={{ color: '#ffd700' }}>
                                  &#9733;
                                </span>
                              ))}
                          </li>
                          <li>
                            <strong>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </strong>
                            {/* <strong>Date:</strong> */}
                          </li>
                          <li>
                            {console.log(review.content)}
                            <p>{review.content}</p>
                          </li>
                          <Box mb={2}>
                            <Button
                              mb={10}
                              variant='outlined'
                              size='small'
                              onClick={() => setOpen(true)}
                            >
                              Report Review
                            </Button>
                            <Dialog
                              sx={{
                                '& .MuiDialog-paper': {
                                  width: '80%',
                                  maxHeight: 435,
                                },
                              }}
                              maxWidth='xs'
                              aria-labelledby='dialog-title'
                              aria-describedby='dialog-description'
                              open={open}
                              onClose={() => setOpen(false)}
                            >
                              <DialogTitle id='dialog-title'>
                                Reason for reporting Review
                              </DialogTitle>
                              <DialogContent style={{ height: '400px' }}>
                                {/* <DialogContentText id='dialog-description'>
                                  Reason for reporting
                                </DialogContentText> */}
                                <VirtualizedSelect
                                  options={option}
                                  onChange={(value) => setReason(value)}
                                  value={reason}
                                />
                                {/* <RadioGroup
                                  //ref={radioGroupRef}
                                  aria-label='ringtone'
                                  name='ringtone'
                                  value={value}
                                  onClick={(e) => {
                                    handleChange(e)
                                  }}
                                >
                                  {options.map((option) => (
                                    <FormControlLabel
                                      value={option}
                                      key={option}
                                      control={<Radio />}
                                      label={option}
                                    />
                                  ))}
                                </RadioGroup> */}
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => setOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  autoFocus
                                  onClick={() => {
                                    handleChange(review.id)
                                  }}
                                >
                                  Submit
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Box>
                        </ul>
                      ))}
                    {SuccessDialogueReview()}
                    <hr />
                    <div className='review_comment'>
                      {isAuthenticated() ? (
                        <>
                          <form
                            className='col-sm-6  pt-5'
                            onSubmit={submitRating}
                          >
                            <h4>Leave a review</h4>
                            <div className='mb-2'>
                              <select
                                class='mdb-select'
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                required
                              >
                                <option value='' selected>
                                  Choose your rating
                                </option>
                                <option value='1'> 1 - Poor</option>
                                <option value='2'> 2 - Fair</option>
                                <option value='3'> 3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </select>
                            </div>
                            <div className='mb-4'>
                              <label
                                className='form-label'
                                htmlFor='form4Example1'
                              >
                                Leave a comment
                              </label>

                              <textarea
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='form-control'
                                name=''
                                id=''
                                cols='100'
                                rows='3'
                                placeholder='Comment...'
                              />
                            </div>
                            <button
                              type='submit'
                              className='btn btn-primary btn-block mb-4'
                            >
                              Add review
                            </button>
                          </form>
                        </>
                      ) : (
                        <>
                          Please <Link to='/login'>Sign In</Link> to leave a
                          review
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                  <h1>Rs {product.rent} / day</h1>
                </div>
                <Link to={`/getQuote/${product.id}`}>
                  <button className='btn bg-cart mt-2 mb-2 mr-2'>
                    Get Quote
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
                  <p>Contact number: +92 {product.supplier.contact_number}</p>
                </div>
                <hr />
                <Box mb={2}>
                  <Button
                    mb={10}
                    variant='outlined'
                    size='small'
                    onClick={() => setOpen1(true)}
                  >
                    Report Ad
                  </Button>
                  <Dialog
                    sx={{
                      '& .MuiDialog-paper': {
                        width: '80%',
                        maxHeight: 435,
                      },
                    }}
                    maxWidth='xs'
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                    open={open1}
                    onClose={() => setOpen1(false)}
                  >
                    <DialogTitle id='dialog-title'>
                      Reason for reporting Ad
                    </DialogTitle>
                    <DialogContent style={{ height: '400px' }}>
                      {/* <DialogContentText id='dialog-description'>
                                  Reason for reporting
                                </DialogContentText> */}
                      <VirtualizedSelect
                        options={option}
                        onChange={(value) => setReason1(value)}
                        value={reason1}
                      />
                      {/* <RadioGroup
                                  //ref={radioGroupRef}
                                  aria-label='ringtone'
                                  name='ringtone'
                                  value={value}
                                  onClick={(e) => {
                                    handleChange(e)
                                  }}
                                >
                                  {options.map((option) => (
                                    <FormControlLabel
                                      value={option}
                                      key={option}
                                      control={<Radio />}
                                      label={option}
                                    />
                                  ))}
                                </RadioGroup> */}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen1(false)}>Cancel</Button>
                      <Button autoFocus onClick={handleChange1}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                {SuccessDialogue()}
              </div>
            </div>
          </div>
        )}
      </div>
    ))

  const ShowProducts1 = () => {
    return (
      <>
        {relatedProducts.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.image_urls[0]}
                        className='card-img-top'
                        // width='96'
                        // height='350'
                        // alt=''
                        height='250px'
                      />
                    </div>
                  </div>
                  <div className='card-body bg-light text-center'>
                    <div className='mb-2'>
                      <h5 className='font-weight-bold mb-2'>
                        <Link
                          to={`/products/${product.id}`}
                          className='text-default mb-2'
                          data-abc='true'
                        >
                          {product.name}
                        </Link>
                      </h5>
                      <p class='text-muted'>
                        {product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className='mb-0 font-weight-semibold'>
                      Rs {product.rent} / day
                    </h3>

                    {product.reviews.length > 0 &&
                      Array(product.reviews[0].rating)
                        .fill()
                        .map((_, i) => (
                          <span style={{ color: '#ffd700' }}>&#9733;</span>
                        ))}
                    <div className='text-muted mb-3'>
                      {product.reviews.length} reviews
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h6>Details</h6>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn bg-cart mt-2 mb-2 mr-2'>
                        Get Quote
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
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
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>
              Related Products
            </h1>
            <hr />
          </div>
        </div>
        <h2 className='mt-4 mb-4'>
          {searchMessage(searched, relatedProducts)}
        </h2>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  )
}

export default SingleHomeProduct
