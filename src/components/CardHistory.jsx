import { Card } from "react-bootstrap";
import formatCurrency from "../utils/currency";
import moment from "moment/moment";

export default function CardHistory({ dataTransaction = [] }) {
  return (
    <>
      {dataTransaction.length &&
        dataTransaction.map((item, index) => (
          <Card key={`${item.description}-${index}`} className="px-4 py-2 mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-body-tertiary">
                <p
                  className={`fs-5 fw-bold m-0 ${
                    item.transaction_type === "PAYMENT"
                      ? "text-danger"
                      : "text-body-tertiary"
                  }`}
                >
                  {item.transaction_type === "PAYMENT" ? "-" : "+"}{" "}
                  {formatCurrency(item.total_amount)}
                </p>
                <small>
                  {moment(item.created_on).format("D MMMM YYYY HH:mm")}
                </small>
              </div>
              <small>{item.description}</small>
            </div>
          </Card>
        ))}
    </>
  );
}
