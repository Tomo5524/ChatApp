import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { UserContext } from "../UserContext";
import "./style/nav.css";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: nav.js ~ line 7 ~ Nav ~ user", user);

  // const handleLogOut = () => {
  //   setUser(null);
  //   logOut();
  //   console.log("logout called");
  //   history.push("/sign-up");
  //   // isFirstRun.current = true;
  // };

  // const deleteUser = (e) => {
  //   if (user) {
  //     try {
  //       fetch(`${ENDPOINT}/api/delete/${id}`, {
  //         mode: "cors",
  //         method: "POST",
  //         // acition: `http://localhost:5000/api/delete/${id}`,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: authHeader(),
  //         },
  //       });
  //       e.preventDefault();
  //       handleLogOut();
  //       history.push("/");
  //       console.log("delete called");
  //       window.location.reload();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  return (
    // <div className="col-12 col-md-10 d-none d-xl-block">
    <div className="main-nav-bar">
      <header>
        <div className="container p-3">
          <Navbar className="navbar-dark py-3" expand="lg">
            <Navbar.Brand as={Link} to="/">
              ChatApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav>
                <Nav.Link className="nav-item text-white" as={Link} to="/">
                  Rooms
                </Nav.Link>
                <Nav.Link className="nav-item text-white" as={Link} to="/about">
                  Logout
                </Nav.Link>
                <Nav.Link className="nav-item text-white" as={Link} to="/about">
                  About
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
