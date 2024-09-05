import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { productType } from "../../utils/types";

type Props = {};

const Orders = (props: Props) => {
  const [orders, setOrders] = useState<any>();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    console.log(auth?.user?._id);
    axios
      .get(`/api/v1/order/user/${auth?.user?._id}`)
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full h-[60vh] flex flex-col m-4 p-4 shadow-xl rounded-xl overflow-y-scroll">
      {orders
        ? orders.map((order: any) => (
            <div className="h-[10vh] w-full flex items-center border-b">
              <div className="w-2/3">
                <h1 className="uppercase">
                  <span className="font-bold">ID:</span> {order._id}
                </h1>
              </div>
              <div className="w-full p-4 flex justify-start items-center object-contain border-l border-r">
                {order.products.map((product: productType) => (
                  <a href={`/product/${product.slug}`}>
                    <div className="w-full h-full">
                      <img
                        src={`/api/v1/product/photo/${product._id}`}
                        className=" h-auto max-w-[50px] object-cover"
                        alt=""
                      />
                    </div>
                  </a>
                ))}
              </div>

              <div className="w-1/2 text-center flex justify-center">
                {String(moment(order.createdAt))}
              </div>
              <div className="w-1/2 text-center flex justify-center">
                {order.fulfilled ? (
                  <span className="text-green-500">DELIVERED</span>
                ) : (
                  <span className="text-orange-500">PENDING</span>
                )}
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Orders;
