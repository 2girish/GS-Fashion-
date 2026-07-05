import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify'
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { userData } = useContext(userDataContext)
  const location = useLocation()

  return (
    <>
      <ToastContainer />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/productdetail/:productId"
          element={
            userData ? (
              <ProductDetail />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Registration />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

    
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Ai />
    </>
  )
}

export default App
