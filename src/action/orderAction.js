import axios from 'axios'
import {
  REMOVE_TO_CART,
  CLEAR_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
} from '../constants/orderConstants'

export const orderCreate = (order) => async (dispatch) => {
  dispatch({ type: ORDER_REQUEST, payload: order })
  try {
    const { data } = await axios.post('/order/create', order)
    console.log(data)
    dispatch({ type: ORDER_SUCCESS, payload: data.order })
    dispatch({ type: REMOVE_TO_CART })
    dispatch({ type: CLEAR_SHIPPING_ADDRESS })
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.response.data.message })
  }
}
