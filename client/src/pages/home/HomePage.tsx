import LoginForm from "../../components/Login/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center bg-light"
          style={{
            backgroundImage: "url('/img/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Col>

        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}
