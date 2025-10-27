import { type JSX } from "react";
import { Outlet } from "react-router";
import Container from "react-bootstrap/esm/Container";
import Navigation from "../../widgets/NavBar/Navigation";

export default function Layout(): JSX.Element {
  return (
    <Container>
      <Navigation />
      <Outlet />
    </Container>
  );
}
