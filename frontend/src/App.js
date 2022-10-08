import React from "react";
import {Routes, Route} from "react-router-dom";

//PAGES
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Category from "./pages/Category/Category";
//CSS
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/shop">
            <Route index element={<Shop />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path=":id" element={<Category />} />
            </Route>
            <Route path="brands" element={<Brands />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<div>NotFound</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
