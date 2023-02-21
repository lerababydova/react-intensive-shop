import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productPage.module.css";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { selectUser } from "../modules/user/selectors";
import { selectProducts } from "../modules/product/selectors";
import { setProducts } from "../modules/product/actions";
import { addToCartById } from "../modules/cart/actions";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const existingProduct = products.find((product) => +product.id === +id);

  const getProduct = useCallback(async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);

      if (!res.ok) {
        throw new Error("Ошибка!");
      }

      const data = await res.json();

      setProduct(data);

      dispatch(setProducts([data]));
    } catch {
      navigate("/404");
    }
  }, [id, dispatch, navigate]);

  const handleChangeProductCount = (event) => {
    const productCount = Number(event.target.value);
    if (productCount >= 1) {
      setCount(productCount);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCartById(id, count));
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
        <img className={styles.productImg} src={product.image} alt="" />
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
