import { useSelector } from "react-redux";

export default function Service() {
  const service = useSelector((state) => state.service);
  return <h1>{JSON.stringify(service)}</h1>;
}
