import Button from "../Button/Button";
import { useContext } from "react";
import { AppContext } from "../../modules/context/AppContext";
import { Link } from "react-router-dom";
import styles from "./productCard.module.css";

const ProductCard = ({ images, price, title, id, addToCart }) => {
  const { user } = useContext(AppContext);

  const onClick = () => {
    addToCart(id);
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.cardImage} src={images[0]} alt="" />
      <div className={styles.cardInfo}>
        <p>
          <Link className={styles.titleLink} to={`/product/${id}`}>
            {title}
          </Link>
        </p>
        <b>Price: ${price}</b>
        {user ? (
          <Button onClick={onClick} name="Add to cart" />
        ) : (
          <p>Log in to add an item to your cart</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
