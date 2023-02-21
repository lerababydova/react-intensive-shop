import Button from "../Button/Button";
import Input from "../Input/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./modalContainer.module.css";
import { setUser } from "../../modules/user/actions";

const USER_NAME = "user";
const PASSWORD = "1234";

const AuthorizationModal = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    const usernameValue = event.target.value;
    setUsername(usernameValue);
  };

  const onChangePassword = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const handleLogin = () => {
    if (USER_NAME === username && PASSWORD === password) {
      onCloseModal();
      dispatch(setUser({ username }));
      navigate("/");
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.modalTitle}>Authorization</h1>
      <div className={styles.inputContainer}>
        <Input
          className={styles.inputModal}
          type="text"
          placeholder="Username"
          onChange={onChangeUsername}
        />
        <Input
          className={styles.inputModal}
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
        />
      </div>

      {error && <p className={styles.error}>Incorrect username or password!</p>}
      <div className={styles.buttonContainer}>
        <Button name="Login" onClick={handleLogin} />
        <Button name="Cancel" onClick={onCloseModal} />
      </div>
    </div>
  );
};

export default AuthorizationModal;
