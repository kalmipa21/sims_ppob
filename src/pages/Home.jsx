import { Container, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { axiosInstance } from "../configs/https";

import ProfileNBalance from "../components/ProfileNBalance";
import ServicesApps from "../components/ServicesApps";
import Banner from "../components/Banner";

export default function Home() {
  // const [getProfile, setGetProfile] = useState({});
  // const [getBalance, setGetBalance] = useState({});
  const [getServices, setGetServices] = useState({});
  const [getBanner, setGetBanner] = useState({});
  const [isLoad, setIsLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoad) {
      handleGetProfile();
      handleGetBalance();
      handleGetBanner();
      handleGetServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoad, handleGetBalance, handleGetBanner, handleGetProfile]);

  function handleGetProfile() {
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .get("/profile")
      .then((response) => {
        // console.log("profile", response);
        // setGetProfile(response.data.data);

        // Set localstorage
        sessionStorage.setItem("first_name", response.data.data.first_name);
        sessionStorage.setItem("last_name", response.data.data.last_name);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem(
          "profile_image",
          response.data.data.profile_image
        );

        // Set Profile to store
        // dispatch({
        //   type: "SET_FIRST_NAME",
        //   value: response.data.data.first_name,
        // });
        // dispatch({
        //   type: "SET_LAST_NAME",
        //   value: response.data.data.last_name,
        // });
        // dispatch({
        //   type: "SET_EMAIL",
        //   value: response.data.data.email,
        // });
        // dispatch({
        //   type: "SET_PHOTO_PROFILE",
        //   value: response.data.data.profile_image,
        // });
      })
      .catch((error) => {
        // console.error("ini error", error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false);
      });
  }

  function handleGetBalance() {
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .get("/balance")
      .then((response) => {
        // console.log("balance", response);
        // setGetBalance(response.data.data.balance);
        const balance = response.data.data.balance;

        // Set sessionStorage
        sessionStorage.setItem("balance", balance);

        // Set balanceto store
        // dispatch({ type: "SET_BALANCE", value: balance });
      })
      .catch((error) => {
        // console.error("error", error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false);
      });
  }

  function handleGetServices() {
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .get("/services")
      .then((response) => {
        // console.log("services", response);
        setGetServices(response.data.data);
      })
      .catch((error) => {
        // console.error("error", error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false);
      });
  }

  function handleGetBanner() {
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .get("/banner")
      .then((response) => {
        // console.log("banner", response);
        setGetBanner(response.data.data);
      })
      .catch((error) => {
        // console.error("error", error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false);
      });
  }

  return (
    <Container className=" py-4">
      <Row>
        <ProfileNBalance
        // getBalance={getBalance}
        // getProfile={getProfile}
        />
      </Row>
      <Row className=" d-flex justify-content-evenly my-5">
        <ServicesApps getServices={getServices} />
      </Row>
      <Banner getBanner={getBanner} />
    </Container>
  );
}
