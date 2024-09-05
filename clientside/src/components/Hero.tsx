import React from "react";
import { productType } from "../utils/types";
import { addItemToCart } from "../utils/helpers";

type Props = {
  product: productType;
};

const Hero = ({ product }: Props) => {
  return (
    <div className="flex justify-center items-center relative bg-slate-400 py-16">
      <img
        src="https://wallpapercave.com/wp/wp4247401.jpg"
        alt=""
        className="absolute z-[1] top-0 left-0 bottom-0 right-0 object-cover h-full w-full"
      />
      <div className="absolute opacity-cover  z-[2] top-0 left-0 bottom-0 right-0 object-cover h-full w-full bg-black bg-opacity-50"></div>

      <div className="flex flex-col z-10 gap-4">
        <h1 className="text-center text-white text-2xl font-semibold">
          Today's Great Offer
        </h1>
        {/* // ACTUAL CARD */}
        <div className="bg-white p-4 rounded-xl flex flex-col md:flex-row m-auto w-[90vw] md:w-min justify-center items-center md:justify-start gap-[3rem] ">
          <a className="w-full h-full" href={`/product/${product.slug}`}>
            <img
              src={`/api/v1/product/photo/${product?._id}`}
              className="w-full aspect-square rounded-md shadow-md p-2"
              alt="product image"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/loading.gif";
              }}
            />
          </a>
          <div className="flex flex-col margin-auto w-full text-center md:text-start md:w-[30vw] justify-between">
            <div className="price flex flex-col">
              <span className="lg:text-4xl md:text-2xl sm:text-xl font-extrabold">
                {product?.name}
              </span>
              <span className="lg:text-2xl font-bold text-green-400">
                {product?.price}.00$
              </span>
              <div className="description lg:text-md md:text-sm overflow-hidden pb-10 h-[20vh]">
                <p className="text-ellipsis line-clamp-[8]">
                  {product?.description}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={() => addItemToCart(product)}
                className="bg-[#7e22ce] group hover:translate-y-[-2px] transition-all text-[#ffffff]  font-bold text-base  p-3 w-full rounded-lg hover:bg-purple-800 active:scale-95 transform"
              >
                <span className="">ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
