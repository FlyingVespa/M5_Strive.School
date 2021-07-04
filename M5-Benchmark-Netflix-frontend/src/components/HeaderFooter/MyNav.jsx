// import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

const MyNav = () => {
  return (
    <>
      <Navbar>
        <Container fluid>
          <Navbar.Brand href="#home">
            <Image src="Netflix_Logo_RGB.png" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Movies</Nav.Link>
            <Nav.Link href="#features">Series</Nav.Link>
            <Nav.Link href="#pricing">Details</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home">
            <Image src="avatar.png" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
