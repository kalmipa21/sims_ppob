import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProfileNBalance from "../components/ProfileNBalance";
import CardHistory from "../components/CardHistory";
import { axiosInstance } from "../configs/https";

export default function Transaction() {
  const [isLoad, setIsLoad] = useState(true);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [oldData, setOldData] = useState([]);

  const [params, setParams] = useState({
    offset: 0,
    limit: 5,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getTransactionHistory() {
    console.log("params", params);
    axiosInstance
      .get("/transaction/history", { params: { ...params } })
      .then((response) => {
        const newData = response.data.data.records;
        setDataTransaction([...oldData, ...newData]);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }

  useEffect(() => {
    if (isLoad) {
      getTransactionHistory();
    }
  }, [isLoad, getTransactionHistory]);

  function handleShowMore() {
    const newOffset = params.offset + 1;
    setParams({ ...params, offset: newOffset });
    setOldData(dataTransaction);
    setIsLoad(true);
  }
  // console.log(dataTransaction);

  return (
    <Container className=" py-4">
      <Row>
        <ProfileNBalance />
      </Row>
      <h5 className="mt-5">Semua Transaksi</h5>
      <Row className="my-2">
        <CardHistory dataTransaction={dataTransaction} />
      </Row>
      <div className="d-flex justify-content-center">
        <button
          onClick={handleShowMore}
          className="text-danger text-center fs-6 fw-bold border-0 bg-transparent"
        >
          Show more
        </button>
      </div>
    </Container>
  );
}
