import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import axios from 'axios';
// axios.defaults.baseURL="https://music-app-backened.herokuapp.com"; 
axios.defaults.baseURL="https://mern-crud-music-app-backend.onrender.com"; 
// axios.defaults.baseURL="http://localhost:8080";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider >
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</ChakraProvider>
);


reportWebVitals();
