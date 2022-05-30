import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Edit from "./admin/Edit.jsx";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Reviews from "./pages/Reviews";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import BuyCart from "./pages/BuyCart";
import Check from "./pages/Check";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import { useAuth } from "./contexts/AuthContextProvider";
import Error from "./pages/Error";
import ResetPass from "./pages/ResetPass";

const MyRoutes = () => {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {currentUser.isAdmin && <Route path="/admin" element={<Admin />} />}
        <Route path="/edit" element={<Edit />} />
        <Route path="/resetpass" element={<ResetPass />} />

        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<BuyCart />} />
        <Route path="/check" element={<Check />} />
        <Route path="/menu/detail/:prodId" element={<Detail />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
