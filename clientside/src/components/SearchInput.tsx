import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearch } from "../context/search";
import axios from "axios";
import { productType } from "../utils/types";
import { addItemToCart } from "../utils/helpers";
import { FaCartArrowDown } from "react-icons/fa";

type Props = {};

const SearchInput = (props: Props) => {
  const [values, setValues]: any = useSearch();

  const [results, setResults]: any = useState([]);

  useEffect(() => {
    axios
      .post(`/api/v1/product/search/${values.keyword}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [values]);

  return (
    <div className="relative w-full">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, keyword: e.target.value })
        }
        type="text"
        className="h-min w-full text-black"
      />
      {values.keyword.length > 0 ? (
        <div className="bg-white border-2 shadow-xl w-full rounded-md text-black absolute top-[100%] z-20">
          {results.map((result: productType) => (
            <div className="flex items-center border-t p-4">
              <div className="w-1/5">
                <img src={`/api/v1/product/photo/${result._id}`} alt="" />
              </div>
              <div className=" w-3/5 text-center">{result.name}</div>
              <div className="w-1/5 flex text-2xl justify-center items-center">
                <button
                  className="text-center"
                  onClick={() => addItemToCart(result)}
                >
                  <span>
                    <FaCartArrowDown />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
