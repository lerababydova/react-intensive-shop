import { createPortal } from "react-dom";
import React, { useEffect, useContext } from "react";
import { AppContext } from "../../modules/context/AppContext";
import styles from "./modalContainer.module.css";
import Button from "../Button/Button";

const modalRoot = document.getElementById("modal-root");
const modalElement = document.createElement("div");

const ModalContainer = ({ children }) => {
  const { setModal } = useContext(AppContext);
  useEffect(() => {
    modalRoot.appendChild(modalElement);

    return () => {
      modalRoot.removeChild(modalElement);
    };
  }, []);

  const onCloseModal = () => {
    setModal({ isOpened: false });
  };

  return createPortal(
    <>
      <div className={styles.modalContainer}>
        {React.cloneElement(children, { onCloseModal })}
        <a href="#" className={styles.close} onClick={onCloseModal}></a>
      </div>
      <div className={styles.modalBackgroundMask}></div>
    </>,
    modalElement
  );
};

export default ModalContainer;
