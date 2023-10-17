import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../configs/https";

import IllusLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/images/Logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().required("Field is required").email(),
  password: Yup.string().required("Field is required").min(8).max(20),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInvalid, setIsInvalid] = useState("");

  const [showPass, setShowPass] = useState(false);
  function handleShowPass() {
    setShowPass(!showPass);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(form) {
    // console.log("form", form);
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post("/login", form)
      .then((response) => {
        // console.log(response.data.data.token);
        const token = response.data.data.token;

        // set store
        dispatch({ type: "AUTH_TOKEN", value: token });

        localStorage.setItem("token", token);
        navigate("/home");
        window.location.href = "/home";
      })
      .catch((error) => {
        // console.error(error.response.data.message);
        setIsInvalid(error.response.data.message);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  function handleCloseAlert() {
    setIsInvalid("");
  }

  return (
    <Container className=" d-flex vh-100">
      <Col sm="6" className=" d-grid justify-content-center align-items-center">
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

            <Form onSubmit={formik.handleSubmit} className=" d-grid">
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
                    id="email"
                    name="email"
                    type="email"
                    placeholder="masukan email anda"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setIsInvalid("");
                    }}
                    className={`border-start-0 border-dark-subtle ${
                      formik.touched.email && formik.errors.email
                        ? "border-danger"
                        : ""
                    }`}
                  />
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger text__5">
                    {formik.errors.email}
                  </small>
                )}
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
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="masukan password anda"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setIsInvalid("");
                    }}
                    className={`border-end-0 border-start-0 rounded-end-0 border-dark-subtle ${
                      formik.touched.password && formik.errors.password
                        ? "border-danger"
                        : ""
                    }`}
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
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger text__5">
                    {formik.errors.password}
                  </small>
                )}
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className=" d-block justify-content-center"
              >
                Masuk
              </Button>
            </Form>
          </Card.Body>
          <span className=" mt-3 text-center">
            belum punya akun? registrasi{" "}
            <Link
              style={{ textDecoration: "none", color: "red" }}
              to="/registration"
            >
              di sini
            </Link>
          </span>
        </Card>
        {isInvalid && (
          <div className=" d-flex bg-body-secondary rounded-3 justify-content-between align-items-center">
            <small className=" ps-3 text-danger">{isInvalid}</small>
            <Button variant="transparent" onClick={handleCloseAlert}>
              <i className="bi bi-x-circle text-danger"></i>
            </Button>
          </div>
        )}
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
