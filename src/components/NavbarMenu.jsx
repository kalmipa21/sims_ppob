import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "../assets/images/Logo.png";
import "../assets/css/NavbarMenu.css";

export default function NavbarMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  function isActive(target) {
    const { pathname } = location;
    if (pathname === "/home") return ["home"].includes(target);
    else return pathname.includes(target);
  }
  return (
    <Navbar
      expand="md"
      className=" sticky-top container-fluid border-bottom p-3"
      variant="light"
    >
      <Container>
        <Navbar.Brand
          href="/home"
          className="d-flex justify-content-center text-center align-items-center gap-2"
        >
          <img style={{ width: "1.5rem" }} src={Logo} alt="logo" />
          <h5 className=" my-auto">SIMS PPOB</h5>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setShowMenu(!showMenu)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          onClick={() => setShowMenu(!showMenu)}
          style={{ display: showMenu ? "flex" : "none" }}
        >
          <Nav className="ms-auto navbar-link">
            <NavLink
              to="/topup"
              className={isActive("Top Up") ? "active" : "link mx-3"}
            >
              Top Up
            </NavLink>
            <NavLink
              to="/transaction"
              className={isActive("Transaction") ? "active" : "link mx-3"}
            >
              Transaction
            </NavLink>

            <NavLink
              to="/akun"
              className={isActive("Akun") ? "active mx-3" : "link mx-3"}
            >
              Akun
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
