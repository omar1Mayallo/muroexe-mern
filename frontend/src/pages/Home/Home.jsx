import React from "react";

//Sections
import SecMainBanners from "../../sections/HomePg-Sections/SecMainBanners";
import SecCategories from "../../sections/HomePg-Sections/SecCategories";
import SecLatestProducts from "../../sections/HomePg-Sections/SecLatestProducts";
import SecSubBanners from "../../sections/HomePg-Sections/SecSubBanners";
import SecTopSales from "../../sections/HomePg-Sections/SecTopSales";

const Home = () => {
  return (
    <>
      <SecMainBanners />
      <SecCategories />
      <SecLatestProducts />
      <SecSubBanners />
      <SecTopSales />
    </>
  );
};

export default Home;
