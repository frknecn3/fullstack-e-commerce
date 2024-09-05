import React from "react";
import { productType } from "../utils/types";
import { addItemToCart } from "../utils/helpers";

type Props = {
  product: productType;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="flex flex-col rounded-2xl w-[200px] md:w-[300px] bg-[#ffffff] border">
      <div className="flex flex-col">
        <div className="text-md mb-4 h-full text-center line-clamp-1 text-balance text-ellipsis truncate p-4 text-[#374151] pb-6">
          {product.slug.replace("-", " ")}
        </div>
        <figure className="flex justify-center items-center rounded-2xl">
          <a href={`/product/${product.slug}`}>
            <img
              src={`/api/v1/product/photo/${product._id}`}
              alt="Card Preview"
              className="rounded-2xl aspect-square w-[200px]"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/loading.gif";
              }}
            />
          </a>
        </figure>
        <div className="flex p-6">
          <button
            onClick={() => addItemToCart(product)}
            className="bg-[#7e22ce] group hover:translate-y-[-2px] transition-all text-[#ffffff]  font-bold text-base  p-3 w-full rounded-lg hover:bg-purple-800 active:scale-95 transform"
          >
            <span className="group-hover:hidden">{product.price}$</span>
            <span className="group-hover:block hidden text-nowrap">
              ADD TO CART
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
