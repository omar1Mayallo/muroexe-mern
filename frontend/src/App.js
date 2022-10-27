import React from "react";
import {Routes, Route} from "react-router-dom";
import useProtectedRoute from "./hooks/useProtectedRoute";

//PAGES
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Category from "./pages/Category/Category";
import UserProfile from "./pages/User/UserProfile/UserProfile";

//CSS
import "./App.css";
import ProtectedRoutes from "./components/Utils/ProtectedRoute/ProtectedRoutes";
import UserWishlist from "./pages/User/UserWishlist/UserWishlist";
import UserAddresses from "./pages/User/UserAddresses/UserAddresses";

const App = () => {
  const [isUser, isAdmin, user] = useProtectedRoute();

  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* ______________AVAILABLE_ROUTES______________ */}
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop">
            <Route index element={<Shop />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="category/:id" element={<Category />} />
          </Route>

          {/* ______________USER_ROUTES______________ */}
          <Route element={<ProtectedRoutes auth={isUser} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/user">
              <Route path="profile" element={<UserProfile />} />
              <Route path="wishlist" element={<UserWishlist />} />
              <Route path="addresses" element={<UserAddresses />} />
            </Route>
          </Route>

          {/* ______________ADMIN_ROUTES______________ */}
          <Route element={<ProtectedRoutes auth={isAdmin} />}></Route>

          {/* ______________NOT_FOUND_ROUTE______________ */}
          <Route path="*" element={<div>NotFound</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
