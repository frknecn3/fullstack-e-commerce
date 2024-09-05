import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { categoryType } from "../../utils/types";
import { getAllCategories } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {};

const CreateProduct = (props: Props) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [photo, setPhoto] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [shipping, setShipping] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
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
      .post("/api/v1/product/create", productData)
      .then((res) => {
        toast.success(res.data.message), navigate("/dashboard/admin/products");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <form
      className="w-full shadow-md h-full p-4 mx-4 rounded-xl flex flex-col gap-4"
      onSubmit={handleCreate}
    >
      <h1>Create New Product</h1>
      <div className="flex flex-col">
        <input
          type="text"
          id="name"
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          id="price"
          placeholder="Product price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="number"
          id="quantity"
          placeholder="Product quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <textarea
          id="price"
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* CATEGORY */}
        <select
          name="category"
          id="category"
          className="text-black"
          defaultValue="default"
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

        <select
          name="shipping"
          id="shipping"
          className="text-black"
          defaultValue="default"
          onChange={(e) => setShipping(e.target.value)}
        >
          <option value="default" disabled>
            Shipping?
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <div className="flex flex-col">
          <label htmlFor="photo">Upload Image</label>
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="product photo"
              className="h-[10vw] w-[10vw]"
            />
          )}
          {photo && photo.name}
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

        <button>Upload Product</button>
      </div>
    </form>
  );
};

export default CreateProduct;
