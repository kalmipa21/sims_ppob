import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ServicesApps({ getServices }) {
  //   console.log("getServices", getServices);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function hanldeToService(service) {
    // Set selected service to reducer
    dispatch({ type: "SET_SERVICE", value: service });

    navigate("/home/service");
  }
  return (
    <>
      {getServices.length &&
        getServices.map((item, index) => (
          <Col key={`${item}-${index}`} sm="1">
            <Button
              onClick={() => hanldeToService(item.service_code)}
              variant="transparent"
              style={{ border: "0" }}
            >
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
