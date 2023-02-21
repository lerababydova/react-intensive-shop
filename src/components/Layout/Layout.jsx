import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Button from "../Button/Button";
import { selectCart } from "../../modules/cart/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../../modules/product/selectors";
import { selectUser } from "../../modules/user/selectors";
import { setUser } from "../../modules/user/actions";
import { setModal } from "../../modules/modal/actions";
import ModalContainer from "../Modal/ModalContainer";
import AuthorizationModal from "../Modal/AuthorizationModal";
import { selectModal } from "../../modules/modal/selector";

const Layout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const modal = useSelector(selectModal);

  const totalCount = Object.values(cart).reduce((acc, curr) => acc + curr, 0);

  const totalPrice = Object.entries(cart).reduce((acc, curr) => {
    const [id, count] = curr;

    const product = products.find((product) => product.id === +id);

    if (!product) {
      return 0;
    }

    return acc + count * product.price;
  }, 0);

  const handleOpenModal = () => {
    dispatch(setModal({ isOpened: true }));
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.navLinks}>
            <ul className={styles.navLinksList}>
              <li>
                <Link className={styles.navLinksItem} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={styles.navLinksItem} to="/about">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.logo}> Online Shop</div>
          <div className={styles.headerRightSide}>
            {user ? (
              <div className={styles.cartContainer}>
                <Button name="LOGOUT" onClick={handleLogout} />
                <Link to="/cart">
                  <img
                    className={styles.cartButton}
                    src="/shoppingCart.svg"
                    alt="cart"
                  />
                </Link>
              </div>
            ) : (
              <Button name="LOGIN" onClick={handleOpenModal} />
            )}

            {user && (
              <div className={styles.cartContainer}>
                <span className={styles.totalAmout}>
                  ${totalPrice.toFixed(2)}
                </span>
                <span className={styles.productCount}>({totalCount})</span>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        {modal.isOpened && (
          <ModalContainer>
            <AuthorizationModal />
          </ModalContainer>
        )}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
