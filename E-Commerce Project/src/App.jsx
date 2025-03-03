
import { useState } from 'react';
import './App.css'
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Search from './Pages/Search';
import Favorite from './Pages/Favorite';
import ShoppingCart from './Pages/ShoppingCart';
import Account from './Pages/Account';
import ProductDetails from './Components/ProductDetails';
import Loading from './Components/Loading';
import { ShopProvider } from './Context-Reducer/ShopContext';
import { AuthProvider } from './Firebase/firebaseContext';

function App() {


  return (
    <>
      <AuthProvider>
        <ShopProvider>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/search' element={<Search />} />
              <Route path='/favorite' element={<Favorite />} />
              <Route path='/shoppingCart' element={<ShoppingCart />} />
              <Route path='/account' element={<Account />} />
              <Route path='/details' element={<ProductDetails />} />
              <Route path='/loading' element={<Loading />} />    {/*  just for testing */}
            </Routes>
          </main>
          <Footer />
        </ShopProvider>
      </AuthProvider>
    </>
  )
}

export default App
