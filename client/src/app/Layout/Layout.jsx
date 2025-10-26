import React from "react";
import NavBar from "../../widgets/NavBar/NavBar";
import { Outlet } from "react-router";
import Container from "react-bootstrap/esm/Container";

export default function Layout({user, setUser}) {
  return (
    <Container>
      <NavBar setUser={setUser} user = {user}/>
      <Outlet />
    </Container>
  );
}
