export default function validateInfo(values) {
  let errors = {}
  var usernameRegex = /^(?=[a-zA-Z0-9]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
  var newRegex = /^(?=.*?[a-z0-9]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/

  //  username is 6-15 characters long, no _ or . at the beginning, no __ or _. or ._ or .. inside, alphanumeric characters allowed, no _ or . at the end
  const isValid = newRegex.test(values.username)
  const passwordValid = passwordRegex.test(values.password)
  // = '/^[a-zA-Z]+$/';
  var hasSpace = '/^S+$/'
  // var hasNumbersAtStart = '/^[0-9]/'
  // var isValid = /[a-zA-Z]/.test(values.username) && /^[0-9]$/.test(values.username);
  if (!values.username.trim()) {
    errors.username = 'Username required'
  }
  // else if (values.username.length < 6 || values.username.length>15) {
  //   errors.username = 'Username needs to be in between 6 and 15 characters long'
  // }
  else if (!isValid) {
    errors.username =
      'Username needs to be in between 6 and 15 characters long\n Username should contain atleast one character,\n Only characters and digits allowed with no space between!'
  }
  if (!values.email) {
    errors.email = 'Email required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (!passwordValid) {
    errors.password =
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character required'
  }

  if (!values.password2) {
    errors.password2 = 'Password confirmation is required'
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match'
  }
  return errors
}
