export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    console.log('window is undefined')
    return false
  }
  console.log("admin authenticated? ",localStorage.getItem('token'))
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'))
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
