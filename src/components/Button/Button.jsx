import styles from "./button.module.css";
import React from "react";

const Button = ({ onClick, name, type = "button" }) => {
  return (
    <div>
      <button type={type} onClick={onClick} className={styles.button}>
        {name}
      </button>
    </div>
  );
};

export default Button;
