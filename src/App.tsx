// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import './sass/App.scss';
import Airport from './component/Airport';
import Cart from 'component/Cart';




const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Airport />} />
          <Route path="cart" element={<Cart />} />
          

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
