import { Col, Row, Navbar, Nav, Container } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <Container fluid className="footer">
        <Row className="text-center">
          <Col md={4}>
            <Nav.Link href="#home">Home</Nav.Link>
          </Col>
          <Col md={4}>
            <Nav.Link href="#features">Features</Nav.Link>
          </Col>
          <Col md={4}>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyFooter;
