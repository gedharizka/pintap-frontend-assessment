import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Home } from './container/Home/Index';
import ProductDetail from './container/ProductDetail';
import HeaderMenu from './components/Header/Index';
import CartPage from './container/CartPage';
import { useState } from 'react';

function App() {

  // eslint-disable-next-line
  const [items, setItems] = useState([])
  const [countCart, setCountCart] = useState(0)
  
  return (
    <>
      <HeaderMenu countCart={countCart} />
      <Routes>
        <Route path='detail/:id' element={<ProductDetail setCountCart={setCountCart}/>}></Route>
        <Route path='cart' element={<CartPage setCountCart={setCountCart}/>}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
