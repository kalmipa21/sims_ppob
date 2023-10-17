import { Col, Container, Image, Row } from "react-bootstrap";

import DefaultPhoto from "../assets/images/Profile Photo.png";

export default function Home() {
  return (
    <Container className=" py-4">
      <Row>
        <Col sm="5" className=" ">
          <Image src={DefaultPhoto} alt="DefaultPhoto" />
          <h6 className=" mt-3">Selamat Datang,</h6>
          <h3>Arif Saputra</h3>
        </Col>
        <Col sm="t"></Col>
      </Row>
    </Container>
  );
}
