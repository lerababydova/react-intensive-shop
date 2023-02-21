import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input/Input";
import { selectProducts } from "../../product/selectors";
import {
  changeCartProductCountById,
  removeProductFromCardById,
} from "../actions";
import { selectCart } from "../selectors";
import styles from "./cartTable.module.css";

const CartTable = () => {
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const cartValues = Object.entries(cart);

  const handleChangeProductCount = (event, id) => {
    const productCount = Number(event.target.value);
    if (productCount >= 1) {
      dispatch(changeCartProductCountById(id, productCount));
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCardById(id));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>ID</td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Subtotal</td>
          <td>Remove</td>
        </tr>
      </thead>
      <tbody>
        {cartValues.map(([id, quantity]) => {
          const product = products.find((product) => product.id === +id);
          const subtotal = product.price * quantity;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <Input
                  value={quantity}
                  type="number"
                  onChange={(event) => handleChangeProductCount(event, id)}
                />
              </td>
              <td>${subtotal}</td>
              <td>
                <a
                  href="#"
                  className={styles.deleteButton}
                  onClick={() => handleRemoveProduct(id)}
                ></a>
              </td>
            </tr>
          );
        })}
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  );
};

export default CartTable;
