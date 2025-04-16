import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Footer } from './components/Footer'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import AddAddress from './pages/AddAddress'

function App() {
  const isSellerPath = useLocation().pathname.includes('seller')
  const { loginForm } = useSelector((state) => state.user);
  // console.log(loginForm)

  return (
    <>
      {isSellerPath ? null : <Navbar />}
      {loginForm ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath} ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />

        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </>
  )
}

export default App