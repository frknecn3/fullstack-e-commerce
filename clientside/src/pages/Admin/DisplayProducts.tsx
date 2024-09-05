import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAllProducts, handleDelete } from "../../utils/helpers";

type Props = {};

const DisplayProducts = (props: Props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold text-2xl">All Products</h1>
      <div className=" max-h-[70vh] overflow-y-auto overflow-x-hidden my-10">
        <table className="table-fixed w-full text-left shadow-md rounded-xl mx-4">
          <thead className="uppercase bg-[#6b7280] text-[#e5e7eb]">
            <tr>
              <td className="py-1 border text-center w-1/5 p-4">Photo</td>
              <td className="py-1 border text-center w-2/5 p-4">NAME</td>
              <td className="py-1 border text-center w-2/5 p-4">Actions</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]">
            {products?.map((product: any, key) => (
              <tr className="py-5 border rounded-xl" key={key}>
                <td className="py-4">
                  <div className="flex justify-center items-center">
                    <img
                      src={`/api/v1/product/photo/${product._id}`}
                      className="w-[7rem] h-[7rem] rounded-md border p-2"
                      alt=""
                    />
                  </div>
                </td>
                <td className="py-5 border text-center">
                  <span>{product.name}</span>
                </td>
                <td className="py-5">
                  <div className="flex justify-center items-center gap-4 text-2xl">
                    <button
                      className="text-red-700"
                      onClick={() => handleDelete(product._id, getAllProducts)}
                    >
                      <FaTrashAlt />
                    </button>
                    <a href={`/dashboard/admin/product/${product.slug}`}>
                      <FaEdit />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayProducts;
