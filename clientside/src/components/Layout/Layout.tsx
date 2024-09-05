import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

type Props = {
  children: React.ReactNode;
  title?: string;
  layout?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  keywords,
  author,
}) => {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main className="flex-1 flex flex-col md:px-[10vw] sm:px-[5vw] lg:px-[15vw] pt-[5vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "E-commerce App - Shop Now!",
  description: "MERN Stack Project",
  keywords: "MERN,react,nodejs,node,mongodb,js,javascript",
  author: "Furkan Ercan",
};

export default Layout;
