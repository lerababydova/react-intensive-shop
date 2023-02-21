import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import { selectProducts } from "../../product/selectors";
import { clearCart } from "../actions";
import { selectCart } from "../selectors";
import styles from "./cartTable.module.css";

const CartTotal = () => {
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const totalPrice = Object.entries(cart).reduce((acc, curr) => {
    const [id, count] = curr;

    const product = products.find((product) => product.id === +id);

    if (!product) {
      return 0;
    }

    return acc + count * product.price;
  }, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className={styles.totalContainer}>
        Total: ${totalPrice.toFixed(2)}
        <Button onClick={handleClearCart} name="Remove all" />
      </div>
    </>
  );
};

export default CartTotal;
