// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import customTheme from "./theme";
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from './auth/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
