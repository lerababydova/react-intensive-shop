import Button from "../Button/Button";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./productCard.module.css";
import { selectUser } from "../../modules/user/selectors";

const ProductCard = ({ image, price, title, id, addToCart }) => {
  const user = useSelector(selectUser);

  const onClick = () => {
    addToCart(id);
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.cardImage} src={image} alt="" />
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
