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
  first_name: Yup.string().required("Field is required"),
  last_name: Yup.string().required("Field is required"),
  password: Yup.string()
    .required("Field is required")
    .min(8, "Password length minimal 8 karakter"),
  confirm_password: Yup.string()
    .required("Field is required")
    .oneOf([Yup.ref("password"), null], "password tidak sama"),
});

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function handleShowPass() {
    setShowPass(!showPass);
  }
  function handleConfirmShowPass() {
    setShowConfirmPass(!showConfirmPass);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  function handleRegister(form) {
    console.log("form", form);
    const extractedData = {
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
    };

    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post("/registration", extractedData)
      .then((response) => {
        // console.log(response.data.data.token);
        navigate("/login");
        // window.location.href = "/home";
      })
      .catch((error) => {
        // console.error(error.response.data.message);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
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
                    onChange={formik.handleChange}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "border-danger"
                        : "border-start-0 border-dark-subtle"
                    }
                  />
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger text__5">
                    {formik.errors.email}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="">
                <InputGroup>
                  <Button
                    disabled
                    variant="transparent"
                    className="border-end-0 border-dark-subtle"
                  >
                    <i className="bi bi-person"></i>
                  </Button>

                  <Form.Control
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="nama depan"
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.first_name && formik.errors.first_name
                        ? "border-danger"
                        : "border-start-0 border-dark-subtle"
                    }
                  />
                </InputGroup>
                {formik.touched.first_name && formik.errors.first_name && (
                  <small className="text-danger text__5">
                    {formik.errors.first_name}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="my-3">
                <InputGroup>
                  <Button
                    disabled
                    variant="transparent"
                    className="border-end-0 border-dark-subtle"
                  >
                    <i className="bi bi-person"></i>
                  </Button>

                  <Form.Control
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="nama belakang"
                    value={formik.values.last_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.last_name && formik.errors.last_name
                        ? "border-danger"
                        : "border-start-0 border-dark-subtle"
                    }
                  />
                </InputGroup>
                {formik.touched.last_name && formik.errors.last_name && (
                  <small className="text-danger text__5">
                    {formik.errors.last_name}
                  </small>
                )}
              </Form.Group>

              <Form.Group className=" mb-3">
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
                    placeholder="masukan password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "border-danger"
                        : "border-end-0 border-start-0 rounded-end-0 border-dark-subtle"
                    }
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
                    id="confirm_password"
                    name="confirm_password"
                    type={showPass ? "text" : "password"}
                    placeholder="masukan password"
                    value={formik.values.confirm_password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.confirm_password &&
                      formik.errors.confirm_password
                        ? "border-danger"
                        : "border-end-0 border-start-0 rounded-end-0 border-dark-subtle"
                    }
                  />
                  <Button
                    variant="light"
                    className=" border-top border-bottom border-start-0 rounded-start-0 border-dark-subtle"
                    onClick={handleConfirmShowPass}
                  >
                    {showConfirmPass ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </Button>
                </InputGroup>
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password && (
                    <small className="text-danger text__5">
                      {formik.errors.confirm_password}
                    </small>
                  )}
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className=" d-block justify-content-center"
              >
                Daftar
              </Button>
            </Form>
          </Card.Body>
          <span className=" mt-3 text-center">
            sudah punya akun? login{" "}
            <Link style={{ textDecoration: "none", color: "red" }} to="/">
              di sini
            </Link>
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
