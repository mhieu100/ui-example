import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = {
  token: {
    colorPrimary: '#3b82f6',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);