import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Failed from "../assets/images/failed.png";
import Logo from "../assets/images/Logo.png";
import formatCurrency from "../utils/currency";
import { axiosInstance } from "../configs/https";

export default function PopupService(props) {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [failedPopup, setFailedPopup] = useState(false);

  const navigate = useNavigate();

  //   console.log(props.nominal.service_code);
  function handleBayar() {
    const param = {
      service_code: props.nominal.service_code,
    };
    // console.log(param);
    axiosInstance
      .post("/transaction", param)
      .then((response) => {
        // console.log(response);
        if (response.data.status === 0) {
          setConfirmPopup(true);
        }
      })
      .catch((error) => {
        // console.error(error.response);
        if (error.response.data.status === 102 || 108) {
          setFailedPopup(true);
        }
      })
      .finally(() => {});
  }

  function handleToHome() {
    navigate("/home");
  }

  return (
    <Modal
      {...props}
      size="sm"
      centered
      backdrop={"static"}
      keyboard={confirmPopup ? false : true}
    >
      <Modal.Header className="d-flex justify-content-center border-0 mt-3">
        <img
          src={failedPopup ? Failed : Logo}
          alt="logo"
          style={{ width: "2.5rem" }}
        />
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Lakukan transaksi {props.nominal.service_name} sebesar</p>
        <h4 className=" fw-bold">
          {formatCurrency(props.nominal.service_tariff)}{" "}
          {!failedPopup && !confirmPopup && "?"}
        </h4>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column justify-content-center border-0 mb-3">
        {confirmPopup && (
          <>
            <p>berhasil!!</p>
            <Link
              onClick={handleToHome}
              className="text-decoration-none text-danger fw-bold"
            >
              Kembali ke Beranda
            </Link>
          </>
        )}
        {failedPopup && (
          <>
            <p>gagal!!</p>
            <Link
              onClick={handleToHome}
              className="text-decoration-none text-danger fw-bold"
            >
              Kembali ke Beranda
            </Link>
          </>
        )}
        {!confirmPopup && !failedPopup && (
          <>
            <Link
              onClick={handleBayar}
              className="text-decoration-none text-danger fw-bold"
            >
              Ya, lanjutkan Bayar
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
