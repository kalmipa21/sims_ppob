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
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 450 },
      items: 2,
    },
    smobile: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      arrows
      partialVisible
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {getBanner.length > 0 &&
        getBanner.map((item, index) => (
          <div className=" me-2" key={`${index}-${item.banner_name}`}>
            <img
              src={item.banner_image}
              alt="banner_name"
              className="banner_width"
            />
          </div>
        ))}
    </Carousel>
  );
}
