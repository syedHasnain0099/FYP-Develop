export const initialState = {
  basket: [],
  user: null,
}
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_GETQUOTE':
      //logic for adding item to basket
      return {
        ...state,
        basket: [...state.basket, action.item],
      }

    case 'REMOVE_FROM_BASKET':
      //logic for removing item from basket
      let newBasket = [...state.basket]
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      if (index >= 0) {
        newBasket.splice(index, 1)
      }
      return { ...state, basket: newBasket }
    case 'ADD_USER':
      return {
        ...state,
        user: action.user,
      }
    default:
      return { ...state }
  }
}

export default reducer
