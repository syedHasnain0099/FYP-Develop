export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    console.log('window is undefined')
    return false
  }
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}
export const userData = () => {
  if (typeof window == 'undefined') {
    console.log('window is undefined')
    return false
  }
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'))
  } else {
    return false
  }
}
export const userPassword = () => {
  if (typeof window == 'undefined') {
    console.log('window is undefined')
    return false
  }
  if (localStorage.getItem('user_password')) {
    return JSON.parse(localStorage.getItem('user_password'))
  } else {
    return false
  }
}
export const updateProfile = (user, next) => {
  if (typeof window == 'undefined') {
    console.log('window is undefined')
    return false
  }
  if (localStorage.getItem('user')) {
    let data = JSON.parse(localStorage.getItem('user'))
    data = user
    console.log(data)
    localStorage.setItem('user', JSON.stringify(data))
  } else {
    return false
  }
  next()
}
export const addItem = (item, next) => {
  let cart = []
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...item,
      count: 1,
    })
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id)
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    next()
  }
}

export const fileObj = []
export const fileArray = []
export const videofileObj = []
export const videofileArray = []
export const fileObjEditProduct = []
export const fileArrayEditProduct = []
export const videofileObjEditProduct = []
export const videofileArrayEditProduct = []
export const profileDp = []
export const profileDpArray = []
