import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUP from './pages/signup';
import Login from './pages/login';
import Products from './pages/products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUP />} />
          <Route path="/main" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
