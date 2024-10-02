import React from "react";
import Banner from "../components/Banner";
import PopularCategories from "./PopularCategories";
import Latest from "../components/Latest";
import Layout from "../components/layout/Layout";

const ShoppingHome = () => {
  return (
    <Layout>
      <div>
        <Banner />
        <Latest />
        <PopularCategories />
      </div>
    </Layout>
  );
};

export default ShoppingHome;
