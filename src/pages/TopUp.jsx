import { useState } from "react";

import ProfileNBalance from "../components/ProfileNBalance";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import formatCurrency from "../utils/currency";
import PopupTopup from "../components/PopupTopup";

export default function TopUp() {
  //////////////////////////// INPUT BUTTON TOP UP ////////////////////////////
  const [modalShow, setModalShow] = useState(false);
  const [selectedNominal, setSelectedNominal] = useState(null);
  const optionsNominal = [
    "10000",
    "20000",
    "50000",
    "100000",
    "250000",
    "500000",
  ];

  const [nominal, setNominal] = useState({
    top_up_amount: "",
  });

  function handleOnChangeNominal(event) {
    const newValue = event.target ? event.target.value : event;
    if (selectedNominal !== null) {
      setSelectedNominal(null);
    }
    setNominal({ top_up_amount: newValue });

    // console.log("onchange nominal", newValue);
  }

  function handleSubmitTopup(debet) {
    debet.preventDefault();
    setModalShow(true);
    // console.log("debet", debet);
    // console.log("nominal", nominal);
  }

  function isInputValid() {
    const { top_up_amount } = nominal;
    return top_up_amount >= 10000 || selectedNominal;
  }

  function handleSelectedNominal(value) {
    setSelectedNominal(value);
    setNominal({ top_up_amount: value });
    // console.log("select nominal", value);
  }

  return (
    <Container className=" py-4">
      <Row>
        <ProfileNBalance />
      </Row>
      <Row className="my-5">
        <h6>Silahkan masukan</h6>
        <h3>Nominal Top Up</h3>
      </Row>
      <Row className="my-5">
        <Form onSubmit={handleSubmitTopup} className=" d-sm-flex d-block">
          <Col xs="12" sm="6" md="8" className=" d-grid pe-3 row-gap-3">
            <InputGroup className="">
              <InputGroup.Text
                id="basic-addon1"
                className="border-end-0 border-dark-subtle"
              >
                <i className="bi bi-cash-coin"></i>
              </InputGroup.Text>
              <Form.Control
                type="number"
                min={10000}
                name="top_up_amount"
                value={
                  selectedNominal ? selectedNominal : nominal.top_up_amount
                }
                onChange={handleOnChangeNominal}
                placeholder="masukan nominal Top Up"
                className="border-start-0 border-dark-subtle"
              />
            </InputGroup>
            <Button type="submit" variant="danger" disabled={!isInputValid()}>
              Top Up
            </Button>
          </Col>
          <Col
            xs="12"
            sm="6"
            md="4"
            className="d-flex flex-wrap justify-content-center mt-sm-0 mt-3 row-gap-3"
          >
            {optionsNominal.map((item, index) => (
              <Button
                variant="outline-secondary"
                key={`item-button-${index}`}
                onClick={() => handleSelectedNominal(item)}
                active={item === selectedNominal}
                className="rounded-2 mx-1 px-1 fixed-width-button"
              >
                {formatCurrency(parseInt(item))}
              </Button>
            ))}
          </Col>
        </Form>
      </Row>
      <PopupTopup
        nominal={nominal}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
}
