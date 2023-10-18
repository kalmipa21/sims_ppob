import { Button, Col, Image } from "react-bootstrap";

import formatCurrency from "../utils/currency";
import DefaultPhoto from "../assets/images/Profile Photo.png";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfileNBalance({ getBalance, getProfile }) {
  const [seenSaldo, setSeenSaldo] = useState(false);

  const storeProfileBalance = useSelector((state) => state.profilebalance);

  // console.log("storeProfileBalance", storeProfileBalance);

  function handleSeenSaldo() {
    setSeenSaldo(!seenSaldo);
  }

  function profilePicture() {
    if (
      storeProfileBalance.profile_image !==
      "https://minio.nutech-integrasi.app/take-home-test/null"
    ) {
      return storeProfileBalance.profile_image;
    }
    return DefaultPhoto;
  }

  return (
    <>
      <Col sm="5" className=" d-grid justify-content-start align-items-center">
        <Image
          style={{ width: "4rem" }}
          src={profilePicture()}
          alt="DefaultPhoto"
        />
        <h6 className=" mt-3">Selamat Datang,</h6>
        <h3>{storeProfileBalance.username}</h3>
      </Col>
      <Col
        sm="7"
        className="p-4 bg-danger rounded-4 text-white d-flex flex-column justify-content-center"
      >
        <h6>Saldo Anda</h6>
        {seenSaldo ? (
          <h3>{formatCurrency(storeProfileBalance.balance)}</h3>
        ) : (
          <h3>
            Rp <i className="bi bi-three-dots"></i>
          </h3>
        )}
        <Button
          variant="tranparent"
          size="sm"
          className="text-start p-0 text-white border-0"
          onClick={handleSeenSaldo}
        >
          Lihat Saldo{" "}
          {seenSaldo ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )}
        </Button>
      </Col>
    </>
  );
}
