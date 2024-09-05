import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import Hero from "../Hero";
import { productType } from "../../utils/types";

type Props = {
  children: React.ReactNode;
  title?: string;
  layout?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

const HomeLayout: React.FC<Props> = ({
  children,
  title,
  description,
  keywords,
  author,
}) => {
  const [hero, setHero] = useState<productType>({
    name: "",
    price: 0,
    category: "",
    quantity: 0,
    shipping: false,
    description: "",
    createdAt: "",
    slug: "",
    amount: 0,
    updatedAt: "",
    __v: 0,
    _id: "",
  });

  useEffect(() => {
    axios
      .get("/api/v1/product/")
      .then((res) => {
        setHero(
          res.data.products[
            Math.floor(Math.random() * res.data.products.length)
          ]
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex min-h-[150vh] flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <Hero product={hero} />
      <main className="flex-1 flex flex-col md:px-[5vw] px-0 lg:px-[10vw]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

HomeLayout.defaultProps = {
  title: "E-commerce App - Shop Now!",
  description: "MERN Stack Project",
  keywords: "MERN,react,nodejs,node,mongodb,js,javascript",
  author: "Furkan Ercan",
};

export default HomeLayout;
