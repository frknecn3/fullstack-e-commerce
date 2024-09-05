import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { productType } from "../utils/types";
import {
  clearCart,
  decreaseAmount,
  getCart,
  increaseAmount,
  removeItemFromCart,
} from "../utils/helpers";
import { FaTrash } from "react-icons/fa";
import Payment from "../components/CheckoutForm";

type Props = {};

const CartPage = (props: Props) => {
  const [cart, setCart] = useState<productType[]>([]);
  const [update, setUpdate] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const localCart = getCart();
    calcTotal();
    setCart(localCart);
  }, [update]);

  useEffect(() => {
    calcTotal();
  }, [cart]);

  const calcTotal = () => {
    const newTotal = cart.reduce(
      (accumulator, current) => accumulator + current.price * current.amount,
      0
    );

    setTotal(newTotal);
  };

  const click = () => {
    setUpdate(update + 1);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center md:flex-row mb-[100vh]">
        {cart.length > 0 ? (
          <div className="overflow-x-auto w-full lg:w-3/4 flex bg-white  text-black">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 dark:bg-neutral-700 text-white">
                <tr>
                  <th scope="col" className="md:px-6 md:py-4">
                    Product
                  </th>
                  <th scope="col" className="md:px-6 md:py-4">
                    Price
                  </th>
                  <th scope="col" className="md:px-6 md:py-4 text-center">
                    Amount
                  </th>
                  <th scope="col" className="md:px-6 md:py-4">
                    Shipping
                  </th>
                  <th scope="col" className="md:px-6 md:py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border-x-2 border-b-2">
                {cart.map((product) => (
                  <tr className="border-b dark:border-neutral-600">
                    <th scope="row" className="md:px-6 md:py-4">
                      <div className="flex flex-col 2xl:flex-row items-center justif-center">
                        <img
                          className="w-[100px] rounded-md mx-4 aspect-square"
                          src={`/api/v1/product/photo/${product._id}`}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/loading.gif";
                          }}
                        />
                        <p className="text-center xl:text-start text-wrap">
                          {product.name}
                        </p>
                      </div>
                    </th>
                    <td className="md:px-6 md:py-4">{product.price}.00$</td>
                    <td className="md:px-6 md:py-4 text-center">
                      <div className="flex justify-between gap-4 items-center text-xl">
                        <button
                          className="bg-black rounded-md text-white px-2 py-1"
                          disabled={product.amount > 1 ? false : true}
                          onClick={() => {
                            decreaseAmount(product);
                            click();
                          }}
                        >
                          -
                        </button>

                        {product.amount}
                        <button
                          className="bg-black rounded-md text-white px-2 py-1"
                          onClick={() => {
                            increaseAmount(product);
                            click();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="md:px-6 md:py-4">
                      {product.shipping ? "AVAILABLE" : "UNAVAILABLE"}
                    </td>
                    <td className="md:px-6 md:py-4 text-center">
                      <button
                        onClick={() => {
                          removeItemFromCart(product);
                          click();
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto w-3/4 flex text-2xl bg-white  text-black">
            <h1 className="text-center ">Your cart is empty.</h1>
          </div>
        )}
        <div className="w-full md:w-1/4 ml-0 md:ml-4 p-4 shadow-md whitespace-nowrap relative">
          <div className=" w-full top-[20vh] sticky flex flex-col gap-10 items-center justify-center">
            TOTAL PRICE: {total}$
            <button
              onClick={() => {
                clearCart();
                getCart();
                click();
              }}
              className="whitespace-nowrap flex items-center justify-center bg-neutral-600 text-white shadow-md p-3 rounded-xl"
            >
              <FaTrash /> CLEAR CART
            </button>
            <Payment total={total} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
