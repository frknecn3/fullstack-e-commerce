import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { addItemToCart, getSingleProduct } from "../utils/helpers";
import { useParams } from "react-router-dom";
import { productType } from "../utils/types";

type Props = {};

const ProductPage = (props: Props) => {
  const [product, setProduct] = useState<productType>();

  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const prod: productType = await getSingleProduct(params.slug);

      prod ? setProduct(prod) : "";
    };

    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className="shadow-md flex gap-8 h-[70vh] px-10 py-20 rounded-xl items-center bg-slate-50">
        <div className="w-1/2">
          <img
            src={`/api/v1/product/photo/${product?._id}`}
            className="w-full aspect-square p-8 bg-white rounded-2xl border"
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/loading.gif";
            }}
          />
        </div>
        <div className="w-1/2 h-full  flex flex-col justify-between">
          <h1 className="text-4xl text-center font-bold">{product?.name}</h1>
          <div className="h-full pt-10">
            <p className="text-2xl    ">{product?.description}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => addItemToCart(product as productType)}
              className="bg-[#7e22ce] group hover:translate-y-[-2px] transition-all text-[#ffffff]  font-bold text-base  p-3 min-w-[8rem] rounded-lg hover:bg-purple-800 active:scale-95 transform"
            >
              <span className="group-hover:hidden">{product?.price}$</span>
              <span className="group-hover:block hidden text-nowrap">
                ADD TO CART
              </span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
