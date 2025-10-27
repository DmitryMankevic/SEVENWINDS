import { type JSX } from "react";
import styles from "./LoginForm.module.css";
// import UserValidate from "../../entities/user/UserValidate";
// import UserApi from "../../entities/user/UserApi";
// import { setAccessToken } from "../../../shared/lib/axiosInstance";
// import { useNavigate } from "react-router";

export default function LoginForm(): JSX.Element {
  // const navigate = useNavigate();
  // const loginHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const formData = Object.fromEntries(new FormData(e.target));
  //     const { isValid, error } = UserValidate.validateLoginData(formData);
  //     if (!isValid) return alert(error);
  //     const res = await UserApi.login(formData);
  //     setUser({ status: "logged", data: res.data.user });
  //     setAccessToken(res.data.accessToken);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     // alert(error.response.data?.message);
  //     alert("Ошибка при входе в систему");
  //   }
  // };
  return (
    <div className={styles.container}>
      <form className={styles.form} >
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Password</div>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}
