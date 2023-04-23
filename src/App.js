import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUP from './pages/signup';
import Login from './pages/login';
import Products from './pages/products';
import Cart from './pages/cart';
import Orders from './pages/orders';
import Profile from './pages/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUP />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
