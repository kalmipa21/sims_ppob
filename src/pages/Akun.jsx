import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import DefaultPhoto from "../assets/images/Profile Photo.png";
import { axiosInstance } from "../configs/https";
import { useEffect, useRef, useState } from "react";

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Field is required").email(),
  first_name: Yup.string().required("Field is required"),
  last_name: Yup.string().required("Field is required"),
});

export default function Akun() {
  const [isLoad, setIsLoad] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const allSessionStorageData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    allSessionStorageData[key] = value;
  }

  useEffect(() => {
    if (isLoad) {
      formik.setFieldValue("email", allSessionStorageData.email);
      formik.setFieldValue("first_name", allSessionStorageData.first_name);
      formik.setFieldValue("last_name", allSessionStorageData.last_name);
      setIsLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad]);

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  function handleUpdateProfile(form) {
    // console.log(form);
    axiosInstance
      .put("/profile/update", form)
      .then((response) => {
        // console.log("response", response);
        const dataResponse = response.data.data;
        sessionStorage.setItem("first_name", dataResponse.first_name);
        sessionStorage.setItem("last_name", dataResponse.last_name);
        setIsEdit(false);
      })
      .catch((error) => {
        // console.error(error.response);
      })
      .finally(() => {});
  }

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  }

  function handleEdit() {
    setIsEdit(true);
  }

  ///////////////////////// CHANGE IMAGE /////////////////////////////
  const [newProfileImage, setNewProfileImage] = useState(null);
  const inputElement = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxFileSize = 100 * 1024;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG and PNG images are allowed.");
        inputElement.current.value = ""; // Clear the input field
        return;
      }
      if (file.size > maxFileSize) {
        alert("Image size must be less than 100KB.");
        inputElement.current.value = ""; // Clear the input field
        return;
      }
      setNewProfileImage(file);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateImage = () => {
    if (newProfileImage) {
      const formData = new FormData();
      formData.append("file", newProfileImage);

      axiosInstance
        .put("/profile/image", formData)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem(
            "profile_image",
            response.data.data.profile_image
          );
          setNewProfileImage(null);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (newProfileImage) {
      handleUpdateImage();
    }
  }, [newProfileImage, handleUpdateImage]);

  function profilePicture() {
    if (
      allSessionStorageData.profile_image !==
      "https://minio.nutech-integrasi.app/take-home-test/null"
    ) {
      return allSessionStorageData.profile_image;
    }
    return DefaultPhoto;
  }

  return (
    <Container>
      <Card className="d-flex flex-column justify-content-center pt-5 border-0">
        <Card.Header className="d-flex justify-content-center border-0 bg-light">
          <div className="position-relative">
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              style={{ display: "none" }}
              onChange={handleImageChange}
              ref={inputElement}
            />
            <button
              className="edit_picture"
              onClick={() => inputElement.current.click()}
            >
              <img
                src={profilePicture()}
                alt="Profile"
                className="w-100 rounded-circle"
              />
            </button>
          </div>
          {/* <button className="edit_picture">
            <img src={profilePicture()} alt="DefaultPhoto" className="w-100" />
          </button> */}
        </Card.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="mt-4">Email</Form.Label>
          <Form.Group className="">
            <InputGroup>
              <InputGroup.Text
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-danger border-end-0"
                    : "border-end-0 border-dark-subtle"
                }
              >
                <i className="bi bi-at"></i>
              </InputGroup.Text>

              <Form.Control
                disabled
                id="email"
                name="email"
                type="email"
                placeholder="masukan email anda"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-danger border-start-0"
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
            <Form.Label className="mt-4">Nama Depan</Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={
                  formik.touched.first_name && formik.errors.first_name
                    ? "border-danger border-end-0"
                    : "border-end-0 border-dark-subtle"
                }
              >
                <i className="bi bi-person"></i>
              </InputGroup.Text>

              <Form.Control
                disabled={isEdit ? false : true}
                id="first_name"
                name="first_name"
                type="text"
                placeholder="nama depan"
                value={formik.values.first_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={
                  formik.touched.first_name && formik.errors.first_name
                    ? "border-danger border-start-0"
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

          <Form.Group className="">
            <Form.Label className="mt-4">Nama Belakang</Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={
                  formik.touched.last_name && formik.errors.last_name
                    ? "border-danger border-end-0"
                    : "border-end-0 border-dark-subtle"
                }
              >
                <i className="bi bi-person"></i>
              </InputGroup.Text>

              <Form.Control
                disabled={isEdit ? false : true}
                id="last_name"
                name="last_name"
                type="text"
                placeholder="nama belakang"
                value={formik.values.last_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={
                  formik.touched.last_name && formik.errors.last_name
                    ? "border-danger border-start-0"
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
          {isEdit ? (
            <div className="d-flex flex-column mt-4 gap-3">
              <Button
                type="submit"
                onClick={handleUpdateProfile}
                variant="danger"
              >
                Simpan
              </Button>
              <Button onClick={() => setIsEdit(false)} variant="outline-danger">
                Batalkan
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column mt-4 gap-3">
              <Button
                onClick={(e) => {
                  handleEdit();
                  e.preventDefault();
                }}
                variant="outline-danger"
              >
                Edit Profile
              </Button>
              <Button onClick={handleLogout} variant="danger">
                Logout
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
}
