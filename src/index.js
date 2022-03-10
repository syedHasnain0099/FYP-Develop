import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import './index.css'
import App from './App'
import { StateProvider } from './components/StateProvider/StateProvider'
import reducer, { initialState } from './components/StateProvider/reducer'

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
