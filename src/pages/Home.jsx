import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../modules/product/selectors";
import styles from "./home.module.css";
import { setProducts } from "../modules/product/actions";
import { addToCartById } from "../modules/cart/actions";
import Button from "../components/Button/Button";

const defaultLimit = 4;
const max_product_count = 20;

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [limitCards, setLimitCards] = useState(defaultLimit);

  const getProducts = useCallback(async () => {
    const res = await fetch(
      `https://fakestoreapi.com/products?limit=${limitCards}`
    );
    const data = await res.json();
    dispatch(setProducts(data));
  }, [dispatch, limitCards]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addToCart = (id) => {
    dispatch(addToCartById(id));
  };

  const handleLoadProduts = () => {
    setLimitCards(limitCards + defaultLimit);
  };

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard {...product} key={product.id} addToCart={addToCart} />
      ))}
      {products.length < max_product_count && (
        <Button name="Load more products" onClick={handleLoadProduts} />
      )}
    </div>
  );
};

export default Home;
