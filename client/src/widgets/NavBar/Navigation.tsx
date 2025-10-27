import { type JSX } from "react";
import { NavLink } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import cls from "./NavBar.module.css";
import { CLIENT_ROUTES } from "../../shared/enums/client_routes";
import useUser from "@/entities/user/hook/useUser";

export default function NavBar(): JSX.Element {
  const { user } = useUser();

  // const logoutHandler = async () => {
  //   try {
  //     await UserApi.logout();
  //     setUser({ status: "logging", data: null });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Navbar className={cls.NavBar} data-bs-theme="dark">
      <Container>
        <img
          src="logoSevenWinds.png"
          alt="Семь Ветров"
          style={{ height: "60px", marginRight: "15px" }}
        />
        <Nav className="me-auto">
          <NavLink
            to={CLIENT_ROUTES.MAIN}
            className="nav-link"
            style={{ fontSize: "18px" }}
          >
            Главная
          </NavLink>
          <NavLink to={CLIENT_ROUTES.LOGIN} className="nav-link">
            Вход
          </NavLink>
          <NavLink to={CLIENT_ROUTES.SIGN_UP} className="nav-link">
            Регистрация
          </NavLink>
          {/* <NavLink to={CLIENT_ROUTES.STORE} className="nav-link" style={{ fontSize: "18px"}}>
            Лавка
          </NavLink> */}
        </Nav>
        {/* {user.status !== "logged" && (
          <NavLink to={CLIENT_ROUTES.AUTH} className="nav-link" style={{ color: "white", marginRight: "10px", fontSize: "18px" }}>
            Алохомора
          </NavLink>
        )} */}
        {/* {user.status === "logged" && (
          <NavLink
            to={CLIENT_ROUTES.MY_CART}
            className="nav-link"
            style={{ color: "white", marginRight: "15px", fontSize: "18px" }}
          >
            Рюкзак
          </NavLink>
        )} */}
        {user.status === "logged" && <Button variant="light">Выйти</Button>}
      </Container>
    </Navbar>
  );
}
