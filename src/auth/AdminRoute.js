import { isAuthenticated, userData } from './index'
import { Route, Redirect } from 'react-router-dom'
const { type } = userData()

const AdminRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated() && type === 'admin' ? (
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
export default AdminRoute
