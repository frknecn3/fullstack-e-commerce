import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllCategories, getSingleProduct } from "../../utils/helpers";
import axios from "axios";
import { categoryType } from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";

type Props = {};

const UpdateProduct = (props: Props) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [photo, setPhoto] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [quantity, setQuantity] = useState<number | string>(0);
  const [category, setCategory] = useState<string>("");
  const [shipping, setShipping] = useState<string>("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getAllCategories(setCategories);

    const fetchProduct = async () => {
      const product = await getSingleProduct(params.slug);

      if (product) {
        console.log(product);
        const {
          _id,
          name,
          description,
          shipping,
          category,
          quantity,
          price,
        }: any = product;

        setName(name);
        setId(_id);
        setDescription(description);
        setShipping(shipping);
        setQuantity(quantity);
        setCategory(category._id);
        setPrice(price);
      }
    };

    fetchProduct();
  }, []);

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = new FormData();

    productData.append("name", name);
    productData.append("price", String(price));
    productData.append("quantity", String(quantity));
    productData.append("photo", photo);
    productData.append("description", description);
    productData.append("category", category);
    productData.append("shipping", shipping);

    axios
      .put(`/api/v1/product/update/${id}`, productData)
      .then((res) => {
        toast.success("Product successfully updated.", { autoClose: 1500 }),
          setTimeout(() => navigate("/dashboard/admin/products"), 2500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="w-full shadow-md h-full p-4 mx-4 rounded-xl flex flex-col gap-4"
      onSubmit={handleUpdate}
    >
      <h1>Update Product</h1>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Product name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              placeholder="Product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              placeholder="Product Description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* CATEGORY */}
          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              className="text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default" disabled>
                Select a category
              </option>
              {categories.map((category: categoryType, key: number) => (
                <option value={category._id} key={key}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="shipping">Shipping:</label>
            <select
              name="shipping"
              id="shipping"
              className="text-black"
              value={shipping ? "1" : "0"}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="default" disabled>
                Shipping?
              </option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <div className="upload-image flex flex-col">
          <label htmlFor="photo">Upload Image</label>
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="product photo"
              className="h-[10vw] w-[10vw] border-1 rounded-xl"
            />
          ) : (
            <img
              src={`/api/v1/product/photo/${id}`}
              alt="product photo"
              className="h-[10vw] w-[10vw] border-1 rounded-xl"
            />
          )}
          <input
            type="file"
            id="photo"
            className="hidden"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) return setPhoto(e.target.files[0]);
            }}
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button className="shadow-md bg-blue-500 text-white hover:brightness-125 w-max px-2 py-1 rounded-md hover:translate-y-[-2px] transition-all">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
