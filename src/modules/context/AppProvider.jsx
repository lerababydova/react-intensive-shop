import { useState } from "react";
import { AppContext } from "./AppContext";
import ModalContainer from "../../components/Modal/ModalContainer";
import AuthorizationModal from "../../components/Modal/AuthorizationModal";

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({
    isOpened: false,
    modalType: null,
  });
  const [user, setUser] = useState(null);

  const addToCartById = (id, count = 1) => {
    setCart((prevCart) => {
      const productCount = prevCart[id];

      return { ...prevCart, [id]: productCount ? productCount + count : count };
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        products,
        setProducts,
        addToCartById,
        modal,
        setModal,
        user,
        setUser,
      }}
    >
      {children}
      {modal.isOpened && (
        <ModalContainer>
          <AuthorizationModal />
        </ModalContainer>
      )}
    </AppContext.Provider>
  );
};
