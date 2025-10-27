import { useState, type JSX } from "react";
import styles from "./SignUpForm.module.css";
import { UserApi } from "@/entities/user/api/UserApi";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import { useNavigate } from "react-router-dom"; // ✅ исправлено
import useUser from "@/entities/user/hook/useUser";
import type { IUserSignUpData } from "@/entities/user/model";
import { AxiosError } from "axios";

export default function SignUpForm(): JSX.Element {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const { setUser } = useUser();

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const dataForApi: IUserSignUpData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        faculty,
      };

      const res = await UserApi.signup(dataForApi);

      if (res.data) {
        setUser({ status: "logged", data: res.data.user });
        setAccessToken(res.data.accessToken);

        // 🧹 сбрасываем форму
        e.currentTarget.reset();
        setFaculty("");

        // 🚀 переходим на главную
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError)
        alert(error?.response?.data.message || "Ошибка регистрации");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>
        <h2 style={{ color: "white" }}>Регистрация в лавке</h2>

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

        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}





// import { useState, type JSX } from "react";
// import styles from "./SignUpForm.module.css";
// import { UserApi } from "@/entities/user/api/UserApi";
// import { setAccessToken } from "../../../shared/lib/axiosInstance";
// import { useNavigate } from "react-router";
// import useUser from "@/entities/user/hook/useUser";
// import type { IUserSignUpData } from "@/entities/user/model";
// import { AxiosError } from "axios";

// function SignUpForm(): JSX.Element {
//   const navigate = useNavigate();
//   const [faculty, setFaculty] = useState("");
//   const { setUser } = useUser();

//   const signUpHandler = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();
//     try {
//       const formData = new FormData(e.currentTarget);
//       // formData.faculty = faculty; // передаём выбранный факультет
//       const dataForApi: IUserSignUpData = {
//         name: formData.get("name") as string,
//         email: formData.get("email") as string,
//         password: formData.get("password") as string,
//         faculty: faculty,
//       };
//       const res = await UserApi.signup(dataForApi);
//       if (res.data) {
//         setUser({ status: "logged", data: res.data.user });
//         setAccessToken(res.data.accessToken);
//         navigate("/");
        
//       }
//     } catch (error) {
//       console.log(error);
//       if (error instanceof AxiosError) alert(error?.response?.data.message);
//     }
//   };

//   // цвета факультетов
//   // const facultyColors = {
//   //   Гриффиндор: "#a00000",
//   //   Пуффендуй: "#e0a800",
//   //   Когтевран: "#004aad",
//   //   Слизерин: "#1c7c3f",
//   // };

//   // const currentColor = facultyColors[faculty] || "#333";

//   return (
//     <div
//       className={styles.container}
//       style={{
//         // background: `linear-gradient(145deg, ${currentColor}80, #111)`,
//         background: `linear-gradient(145deg, 80, #111)`,
//         transition: "background 0.5s ease",
//       }}
//     >
//       <form className={styles.form} onSubmit={signUpHandler}>
//         <h2 style={{ color: "white" }}>
//           Регистрация в лавке
//         </h2>

//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Email</div>
//           <input className={styles.input} name="email" type="email" required />
//         </div>

//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Password</div>
//           <input
//             className={styles.input}
//             name="password"
//             type="password"
//             required
//           />
//         </div>

//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Repeat Password</div>
//           <input
//             className={styles.input}
//             name="confirmPassword"
//             type="password"
//             required
//           />
//         </div>

//         {/*  Выпадающий список факультетов */}
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Faculty</div>
//           <select
//             name="faculty"
//             className={styles.input}
//             value={faculty}
//             onChange={(e) => setFaculty(e.target.value)}
//           >
//             <option value="">Выберите факультет</option>
//             <option value="Гриффиндор">Гриффиндор</option>
//             <option value="Пуффендуй">Пуффендуй</option>
//             <option value="Когтевран">Когтевран</option>
//             <option value="Слизерин">Слизерин</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className={styles.submitButton}
//           style={{
//             backgroundColor: "#333",
//             boxShadow: `0 0 10px #333`,
//             // backgroundColor: currentColor,
//             // boxShadow: `0 0 10px ${currentColor}`,
//           }}
//         >
//           Подтвердить
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;
