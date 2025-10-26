import React, { useState } from "react";
import LoginForm from "../../features/LoginForm/LoginForm";
import SignUpForm from "../../features/SignUpForm/SignUpForm";
import styles from "./AuthPage.module.css"; // добавим для красивого текста

export default function AuthPage({ setUser }) {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {isLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>

      <p className={styles.switchText}>
        {isLogin ? (
          <>
            Нет аккаунта?{" "}
            <span className={styles.linkText} onClick={() => setLogin(false)}>
              Зарегистрируйтесь
            </span>
          </>
        ) : (
          <>
            Уже есть аккаунт?{" "}
            <span className={styles.linkText} onClick={() => setLogin(true)}>
              Войдите в учётную запись
            </span>
          </>
        )}
      </p>
    </div>
  );
}
