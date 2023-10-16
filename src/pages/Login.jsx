import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";

import IllusLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/images/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  function handleShowPass() {
    setShowPass(!showPass);
  }

  return (
    <Container className=" d-flex vh-100">
      <Col sm="6" className=" d-flex justify-content-center align-items-center">
        <Card
          style={{ width: "28rem", border: "0rem" }}
          className="me-3 me-lg-0 "
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-center text-center my-2 align-items-center  ">
              <img src={Logo} alt="logo" />
              SIMS PPOB
            </Card.Title>
            <Card.Subtitle className="my-2 fs-3 fw-bold text-center p-4">
              Masuk atau buat akun untuk memulai
            </Card.Subtitle>

            <Form className=" d-grid">
              <Form.Group className="my-3">
                <InputGroup>
                  <Button
                    disabled
                    variant="transparent"
                    className="border-end-0 border-dark-subtle"
                  >
                    <i className="bi bi-at"></i>
                  </Button>

                  <Form.Control
                    type="email"
                    placeholder="masukan email anda"
                    className="border-start-0  border-dark-subtle"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className=" mb-5">
                <InputGroup>
                  <Button
                    disabled
                    variant="transparent"
                    className="border-end-0 border-dark-subtle"
                  >
                    <i className="bi bi-lock"></i>
                  </Button>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="masukan password anda"
                    className="border-end-0 border-start-0 rounded-end-0 border-dark-subtle"
                  />
                  <Button
                    variant="light"
                    className=" border-top border-bottom border-start-0 rounded-start-0 border-dark-subtle"
                    onClick={handleShowPass}
                  >
                    {showPass ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button
                variant="danger"
                className=" d-block justify-content-center"
              >
                Masuk
              </Button>
            </Form>
          </Card.Body>
          <span className=" mt-3 text-center">
            belum punya akun? registrasi
            <Link to="/registration">di sini</Link>
          </span>
        </Card>
      </Col>
      <Col
        sm="6"
        className=" bg-body-secondary d-flex justify-content-center align-items-center"
      >
        <Image
          src={IllusLogin}
          alt="Login Ilustration"
          fluid
          className=" min-vh-100 w-auto"
        />
      </Col>
    </Container>
  );
}
