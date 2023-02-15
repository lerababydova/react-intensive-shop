import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import { AppContext } from "./modules/context/AppContext";
import ModalContainer from "./components/Modal/ModalContainer";
import AuthorizationModal from "./components/Modal/AuthorizationModal";
import "./App.css";

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({
    isOpened: false,
    modalType: null,
  });
  const [user, setUser] = useState(null);

  const addToCartById = (id, count = 1) => {
    setCart((prevCart) => {
      const productCount = prevCart[id];

      return { ...prevCart, [id]: productCount ? productCount + count : count };
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        products,
        setProducts,
        addToCartById,
        modal,
        setModal,
        user,
        setUser,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {modal.isOpened && (
        <ModalContainer>
          <AuthorizationModal />
        </ModalContainer>
      )}
    </AppContext.Provider>
  );
}

export default App;
