import React, { useEffect, useState } from 'react'
import Footer from '../Footer/footer'
import orderService from '../../services/OrderService'
import { useSelector } from 'react-redux'
import { userData } from '../../auth'
const UserOrderHistory = ({ history }) => {
  const { id } = userData()
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const fetchOrders = async () => {
    orderService
      .getOrders(id, 'paid')
      .then((order) => {
        console.log('order data!', order)
        setOrders(order)
      })
      .catch((err) => console.log(err))
    fetchSingleOrderDetails()
  }
  const fetchSingleOrderDetails = async (orderID) => {
    var size = Object.keys(orders).length
    console.log('size of order', size)
    for (let step = 0; step < size; step++) {
      if (orders[step].id === orderID) {
        setOrderDetails([orders[step]])
        console.log(orders[step])
      }
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      <div
        className='order_user_history paddingTB container'
        style={{
          paddingLeft: '150px',
          paddingTop: '100px',
          minHeight: '550px',
        }}
      >
        {orders && orders.length === 0 ? (
          <>
            <h2 className='text-center pt-5'>
              Your don't have any purchase yet!
            </h2>
          </>
        ) : (
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>OrderID</th>
                <th scope='col'>Date</th>
                <th scope='col'>Price</th>
                <th scope='col'>Paid</th>
                <th scope='col'>Delivered</th>
                <th scope='col'>Delivered at</th>
                <th scope='col'>Details</th>
              </tr>
            </thead>
            <tbody>
              {
                // orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :

                orders.map((res) => (
                  <tr key={res._id}>
                    <th scope='col'>{res.id}</th>
                    <th scope='col'>
                      {new Date(res.created_at).toLocaleDateString()}
                    </th>
                    <th scope='col'>Rs. {res.total}</th>
                    <th scope='col'>
                      {res.status === 'paid' ? (
                        <span style={{ color: 'green' }}>Paid</span>
                      ) : (
                        <span style={{ color: '#ffc107' }}>Processing</span>
                      )}
                    </th>
                    <th scope='col'>
                      {' '}
                      {res.delivered === 'yes' ? (
                        <span style={{ color: 'green' }}>Yes</span>
                      ) : (
                        <span style={{ color: '#ffc107' }}>No</span>
                      )}
                    </th>
                    <th scope='col'>
                      {res.status && res.delivered ? res.deliveredAt : ''}
                    </th>
                    <th scope='col'>
                      <button
                        onClick={() => fetchSingleOrderDetails(res.id)}
                        type='button'
                        className='btn btn-primary'
                        data-mdb-toggle='modal'
                        data-mdb-target='#exampleModal'
                      >
                        details
                      </button>
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}

        {/* modal */}
        {/* <!-- Button trigger modal --> */}
        {/* <!-- Modal --> */}
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Purchase Details
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-mdb-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <table className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Price </th>
                      <th scope='col'>image</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody className='ordersdetailsBody'>
                    {
                      //  orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :
                      orderDetails.map((det) => (
                        <tr key={det.request_quote.product.name}>
                          {console.log(
                            'data at details',
                            det.request_quote.product.name
                          )}
                          <th scope='col'>{det.request_quote.product.name}</th>
                          <th scope='col'>
                            Rs. {det.request_quote.product.rent}
                          </th>
                          <th scope='col'>
                            <img
                              style={{ maxWidth: '40%' }}
                              src={det.request_quote.product.image_urls[0]}
                              alt={det.name}
                            />
                          </th>
                          <th scope='col'>{det.request_quote.quantity}</th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-mdb-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserOrderHistory
