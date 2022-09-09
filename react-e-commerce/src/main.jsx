import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Redux
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './components/reducers/index'

// Router
import { BrowserRouter } from 'react-router-dom'

// AntD
import 'antd/dist/antd.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
// font-awesome
import '../src/assets/font-awesome/css/all.min.css'

// create store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
)
