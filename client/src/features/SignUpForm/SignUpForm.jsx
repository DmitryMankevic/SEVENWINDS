import React, { useState } from "react";
import styles from "./SignUpForm.module.css";
import UserApi from "../../entities/user/UserApi";
import UserValidate from "../../entities/user/UserValidate";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router";

function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.target));
      formData.faculty = faculty; // передаём выбранный факультет

      const { isValid, err } = UserValidate.validateSignUpData(formData);
      if (!isValid) return alert(err);

      const res = await UserApi.signup(formData);
      setUser({ status: "logged", data: res.data.user });
      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Ошибка регистрации");
    }
  };

  // цвета факультетов
  const facultyColors = {
    Гриффиндор: "#a00000",
    Пуффендуй: "#e0a800",
    Когтевран: "#004aad",
    Слизерин: "#1c7c3f",
  };

  const currentColor = facultyColors[faculty] || "#333";

  return (
    <div
      className={styles.container}
      style={{
        background: `linear-gradient(145deg, ${currentColor}80, #111)`,
        transition: "background 0.5s ease",
      }}
    >
      <form className={styles.form} onSubmit={signUpHandler}>
        <h2 style={{ color: faculty ? facultyColors[faculty] : "white" }}>
          Регистрация в лавке
        </h2>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Password</div>
          <input className={styles.input} name="password" type="password" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Repeat Password</div>
          <input className={styles.input} name="confirmPassword" type="password" required />
        </div>

        {/*  Выпадающий список факультетов */}
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Faculty</div>
          <select
            name="faculty"
            className={styles.input}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option value="">Выберите факультет</option>
            <option value="Гриффиндор">Гриффиндор</option>
            <option value="Пуффендуй">Пуффендуй</option>
            <option value="Когтевран">Когтевран</option>
            <option value="Слизерин">Слизерин</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          style={{
            backgroundColor: currentColor,
            boxShadow: `0 0 10px ${currentColor}`,
          }}
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
