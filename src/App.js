import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import { AppProvider } from "./modules/context/AppProvider";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
