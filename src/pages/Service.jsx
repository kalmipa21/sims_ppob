import { useSelector } from "react-redux";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";

import ProfileNBalance from "../components/ProfileNBalance";
import formatCurrency from "../utils/currency";

import PopupService from "../components/PopupService";

export default function Service() {
  const service = useSelector((state) => state.service);
  const [modalShow, setModalShow] = useState(false);

  function handleSubmitPay(event) {
    event.preventDefault();
    setModalShow(true);
    console.log("service_code", service.service_code);
  }

  return (
    <Container className=" py-4">
      <Row>
        <ProfileNBalance />
      </Row>
      <Row className="my-5">
        <h6>Pembayaran</h6>
        <div className="d-flex">
          <img
            src={service.service_icon}
            alt="service_icon"
            style={{ width: "2rem" }}
          />{" "}
          <h4 className="text-capitalize my-auto">{service.service_name}</h4>
        </div>
      </Row>
      <Row className="my-5">
        <Form onSubmit={handleSubmitPay} className=" d-flex">
          <Col className=" d-grid pe-3 row-gap-3">
            <InputGroup className="">
              <InputGroup.Text
                id="basic-addon1"
                className="border-end-0 border-dark-subtle"
              >
                <i className="bi bi-cash-coin"></i>
              </InputGroup.Text>
              <Form.Control
                type="number"
                name="service_tariff"
                value=""
                disabled
                placeholder={`${formatCurrency(service.service_tariff)}`}
                className="border-start-0 border-dark-subtle"
              />
            </InputGroup>
            <Button type="submit" variant="danger">
              Bayar
            </Button>
          </Col>
        </Form>
      </Row>
      <PopupService
        nominal={service}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
}
