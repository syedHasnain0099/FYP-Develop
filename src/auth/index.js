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
