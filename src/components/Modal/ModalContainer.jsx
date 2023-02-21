import { createPortal } from "react-dom";
import React, { useEffect } from "react";
import styles from "./modalContainer.module.css";
import { useDispatch } from "react-redux";
import { setModal } from "../../modules/modal/actions";

const modalRoot = document.getElementById("modal-root");
const modalElement = document.createElement("div");

const ModalContainer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    modalRoot.appendChild(modalElement);

    return () => {
      modalRoot.removeChild(modalElement);
    };
  }, []);

  const onCloseModal = () => {
    dispatch(setModal({ isOpened: false }));
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
