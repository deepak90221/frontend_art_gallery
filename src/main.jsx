import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {AuthProvider} from "./store/auth";

import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <ToastContainer/>
  </AuthProvider>
);
