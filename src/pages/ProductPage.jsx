import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../modules/context/AppContext";
import styles from "./productPage.module.css";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const { setProducts, addToCartById, user, products } = useContext(AppContext);
  const navigate = useNavigate();

  const existingProduct = products.find((product) => +product.id === +id);

  const getProduct = useCallback(async () => {
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

      if (!res.ok) {
        throw new Error("Ошибка!");
      }

      const data = await res.json();

      setProduct(data);

      setProducts([data]);
    } catch {
      navigate("/404");
    }
  }, [id, setProducts]);

  const handleChangeProductCount = (event) => {
    const productCount = Number(event.target.value);
    if (productCount >= 1) {
      setCount(productCount);
    }
  };

  const handleAddToCart = () => {
    addToCartById(id, count);
  };

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      getProduct();
    }
  }, [existingProduct, getProduct]);

  if (!product) {
    return null;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContainerLeft}>
        <img className={styles.productImg} src={product.images[0]} alt="" />
      </div>
      <div className={styles.pageContainerRight}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        {user ? (
          <div className={styles.buttonContainer}>
            <Input
              type="number"
              value={count}
              onChange={handleChangeProductCount}
            />
            <Button
              className={styles.addButton}
              onClick={handleAddToCart}
              name="Add to cart"
            />
          </div>
        ) : (
          <p className={styles.warnText}>Log in to add an item to your cart</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
