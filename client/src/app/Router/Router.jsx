import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "../../pages/MainPage/MainPage";
import Layout from "../Layout/Layout";
import AuthPage from "../../pages/AuthPage/AuthPage";
import CartPage from "../../pages/CartPage/CartPage";
import StorePage from "../../pages/StorePage/StorePage";
// import AddPhonesPage from "../../pages/AddPhonesPage/AddPhonesPage";
// import AdminPage from "../../pages/AdminPage/AdminPage"


export default function Router({setUser, user}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser}/>}>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage setUser={setUser}/>} />
          <Route path="/mycart" element={<CartPage user={user}/>} />
          <Route path="/store" element={<StorePage />} />
          {/* <Route path="/add" element={<AddPhonesPage user={user}/>} /> */}
          {/* <Route path="/admin" element={<AdminPage/>}/> */}
          <Route path="*" element={<h1>Нет контента</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}