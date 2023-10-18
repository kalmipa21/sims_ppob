import { Modal } from "react-bootstrap";
import Logo from "../assets/images/Logo.png";
import formatCurrency from "../utils/currency";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../configs/https";
import { useState } from "react";

export default function PopupTopup(props) {
  const [confirmPopup, setConfirmPopup] = useState(false);

  const navigate = useNavigate();

  function handleTopUp() {
    // console.log(props);
    axiosInstance
      .post("/topup", props.nominal)
      .then((response) => {
        // console.log(response);
        if (response.data.status === 0) {
          setConfirmPopup(true);
        }
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }

  function handleToHome() {
    navigate("/home");
  }

  return (
    <Modal {...props} size="sm" centered>
      <Modal.Header className="d-flex justify-content-center border-0 mt-3">
        <img src={Logo} alt="logo" style={{ width: "2.5rem" }} />
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Anda yakin untuk Top Up sebesar</p>
        <h4 className=" fw-bold">
          {formatCurrency(props.nominal.top_up_amount)} ?
        </h4>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column justify-content-center border-0 mb-3">
        {confirmPopup ? (
          <>
            <p>berhasil!!</p>
            <Link
              onClick={handleToHome}
              className="text-decoration-none text-danger fw-bold"
            >
              Kembali ke Beranda
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={handleTopUp}
              className="text-decoration-none text-danger fw-bold"
            >
              Ya, lanjutkan Top Up
            </Link>
            <Link
              onClick={props.onHide}
              className="text-decoration-none text-secondary mb-2"
            >
              Batalkan
            </Link>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
