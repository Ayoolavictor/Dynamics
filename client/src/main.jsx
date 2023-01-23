import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { P2PLENDINGProvider } from './context/P2PLENDINGcontext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <P2PLENDINGProvider> 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </P2PLENDINGProvider>,
  
)
