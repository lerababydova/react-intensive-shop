import styles from "./input.module.css";

const Input = ({ value, onChange, type, placeholder, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
      step={1}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
