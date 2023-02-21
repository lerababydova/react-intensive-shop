import CartTable from "../modules/cart/components/CartTable";
import CartTotal from "../modules/cart/components/CartTotal";
import styles from "./cart.module.css";

const Cart = () => {
  return (
    <div className={styles.cartContainer}>
      <h1>Cart</h1>
      <CartTable />
      <CartTotal />
    </div>
  );
};

export default Cart;
