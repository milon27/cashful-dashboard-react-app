import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/index.css'
//lib css
import '@milon27/react-modal/dist/style.css';
import '@milon27/react-sidebar/dist/react-sidebar.css'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
