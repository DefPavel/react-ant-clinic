import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './routes/Router';
import { setupStore } from './store/store';
import './styles/index.css';
import './routes/middlewares/axiosInterceptors';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
);
