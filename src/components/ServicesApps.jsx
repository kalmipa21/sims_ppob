import { Button, Col } from "react-bootstrap";

export default function ServicesApps({ getServices }) {
  //   console.log("getServices", getServices);
  return (
    <>
      {getServices.length &&
        getServices.map((item, index) => (
          <Col key={`${item}-${index}`} sm="1">
            <Button variant="transparent" style={{ border: "0" }}>
              <img
                src={item.service_icon}
                alt={`${item.service_code}-${index}`}
                style={{ width: "3.5rem" }}
              />
              <h6 style={{ fontSize: "0.6rem", marginTop: "1rem" }}>
                {item.service_name}
              </h6>
            </Button>
          </Col>
        ))}
    </>
  );
}
