import React from "react";
import { NavLink, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import UserApi from "../../entities/user/UserApi";
import cls from "./NavBar.module.css";

export default function NavBar({ setUser, user }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: "logging", data: null });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className={cls.NavBar} data-bs-theme="dark">
      <Container>
        <img
              src="logoSevenWinds.png" 
              alt="Семь Ветров"
              style={{ height: "60px", marginRight: "15px" }}
            />
        <Nav className="me-auto">
          
          <NavLink to={"/"} className="nav-link" style={{ fontSize: "18px"}}>
            Главная
          </NavLink>
          <NavLink to={"/store"} className="nav-link" style={{ fontSize: "18px"}}>
            Лавка
          </NavLink>
        </Nav>
        {user.status !== "logged" && (
          <NavLink to={"/auth"} className="nav-link" style={{ color: "white", marginRight: "10px", fontSize: "18px" }}>
            Алохомора
          </NavLink>
        )}
        {user.status === "logged" && (
          <NavLink
            to={"/mycart"}
            className="nav-link"
            style={{ color: "white", marginRight: "15px", fontSize: "18px" }}
          >
            Рюкзак
          </NavLink>
        )}
        {user.status === "logged" && (
          <Button variant="light" onClick={logoutHandler}>
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
