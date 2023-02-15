import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import { AppContext } from "../modules/context/AppContext";
import styles from "./home.module.css";

const Home = () => {
  const { setProducts, products, addToCartById } = useContext(AppContext);

  const getProducts = async () => {
    const res = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=28"
    );
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard {...product} key={product.id} addToCart={addToCartById} />
      ))}
    </div>
  );
};

export default Home;
