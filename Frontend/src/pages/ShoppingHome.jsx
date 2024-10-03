import React from "react";
import Banner from "../components/Banner";
import PopularCategories from "./PopularCategories";
import Latest from "../components/Latest";
import Layout from "../components/layout/Layout";
import Carousel from "../components/Carousel";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const ShoppingHome = () => {
  return (
    <Layout>
      <div>
        <Carousel/>
        <Latest />
        <PopularCategories />
        <Newsletter/>
      </div>
    </Layout>
  );
};

export default ShoppingHome;
