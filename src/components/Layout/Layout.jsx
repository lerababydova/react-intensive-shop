import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Button from "../Button/Button";
import { useContext } from "react";
import { AppContext } from "../../modules/context/AppContext";

const Layout = () => {
  const { cart, products, setModal, user, setUser } = useContext(AppContext);

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
    setModal({ isOpened: true });
  };

  const handleLogout = () => {
    setUser(null);
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
              <Button name="LOGOUT" onClick={handleLogout} />
            ) : (
              <Button name="LOGIN" onClick={handleOpenModal} />
            )}

            {user && (
              <div className={styles.cartContainer}>
                <span className={styles.totalAmout}>${totalPrice}</span>
                <span className={styles.productCount}>({totalCount})</span>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
