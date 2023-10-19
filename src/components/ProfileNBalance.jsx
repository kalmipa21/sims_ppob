import { Button, Col, Image } from "react-bootstrap";

import formatCurrency from "../utils/currency";
import DefaultPhoto from "../assets/images/Profile Photo.png";
import { useState } from "react";

export default function ProfileNBalance() {
  const [seenSaldo, setSeenSaldo] = useState(false);

  const allSessionStorageData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    allSessionStorageData[key] = value;
  }

  // console.log("allSessionStorageData", allSessionStorageData);

  function handleSeenSaldo() {
    setSeenSaldo(!seenSaldo);
  }

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
    <>
      <Col
        xs="4"
        sm="5"
        className="d-grid justify-content-start align-items-center me-sm-0 me-5"
      >
        <Image
          style={{ width: "4rem" }}
          src={profilePicture()}
          alt="DefaultPhoto"
          className="rounded-circle"
        />
        <h6 className="mt-3 text__size1">Selamat Datang,</h6>
        <h3 className="text__size2">
          {allSessionStorageData.first_name} {allSessionStorageData.last_name}
        </h3>
      </Col>
      <Col
        xs="6"
        sm="7"
        className="p-4 bg-danger rounded-4 text-white d-flex flex-column justify-content-center"
      >
        <h6>Saldo Anda</h6>
        {seenSaldo ? (
          <h3>{formatCurrency(allSessionStorageData.balance)}</h3>
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
