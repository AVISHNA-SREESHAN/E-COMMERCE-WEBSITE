import React, { createContext, useState } from 'react';
import './App.css';
import Carts from './COMPONENTS/Carts';
import Home from './COMPONENTS/Home';
import Addproduct from './COMPONENTS/Addproduct';
import CartPage from './COMPONENTS/CartPage';
import ProductDetail from './COMPONENTS/ProductDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sampleContext = createContext();

function App() {
  const [products, setproducts] = useState([]);
  const [srch, setsrch] = useState("");
  const [count, setcount] = useState(0);
  const [addpro, setaddpro] = useState([])


  return (
    <div>
      
      <sampleContext.Provider value={{ products, setproducts, srch, setsrch,count, setcount,addpro, setaddpro}}>
        <BrowserRouter>
        <Home />
      
        <Routes>
        <Route path="/" element={  <Carts />}/>
        <Route path="/addproduct" element={<Addproduct />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/product/:id" element={<ProductDetail />}/>
        </Routes>
        </BrowserRouter>
      </sampleContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
export { sampleContext };