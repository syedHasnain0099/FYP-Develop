import { isAuthenticated, userData } from './index'
import { Route, Redirect } from 'react-router-dom'
const { type } = userData()
const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
)
export default PrivateRoute
