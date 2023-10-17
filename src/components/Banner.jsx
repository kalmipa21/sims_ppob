// import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Banner({ getBanner }) {
  // const [bannerList, setBannerList] = useState([]);
  // console.log("getBanner", getBanner);

  // useEffect(() => {
  //   if (getBanner.length) {
  //     setBannerList(getBanner);
  //   }
  // }, [getBanner]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      arrows
      centerMode={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {getBanner.length > 0 &&
        getBanner.map((item, index) => (
          <div className=" me-2" key={`${index}-${item.banner_name}`}>
            <img
              style={{ width: "15rem" }}
              src={item.banner_image}
              alt="banner_name"
            />
          </div>
        ))}
    </Carousel>
  );
}
