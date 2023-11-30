import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navigation() {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar>
        <Link to="/" className="navbar-brand">
          Adopt-A-Friend
        </Link>
      </Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* routes */}

          {!user ? <Nav.Link href="/signin">Sign In</Nav.Link> : ""}

          {!user ? (
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          ) : (
            <>
              <Nav>
                <Link to="/Donations" className="nav-link">
                  Pets
                </Link>
              </Nav>

              <Nav.Link href="/">Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
