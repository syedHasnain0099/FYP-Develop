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
