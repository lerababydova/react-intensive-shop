import React from "react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import Cart from "./pages/Cart";
import "./App.css";
import { store } from "./modules/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={"/404"} />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
