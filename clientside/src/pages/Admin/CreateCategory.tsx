import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { categoryType } from "../../utils/types";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { getAllCategories } from "../../utils/helpers";

type Props = {};

const Categories = (props: Props) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [name, setName] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editID, setEditID] = useState<number>(NaN);
  const [editName, setEditName] = useState<string>("");

  const handleCreateCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/api/v1/category/create-category`, { name })
      .then((res) => {
        toast.success("Successfully created new category.");
        getAllCategories(setCategories);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteCategory = (id: number) => {
    axios
      .get(`/api/v1/category/delete/${id}`)
      .then((res) => {
        toast.success("Successfully deleted category.");
        getAllCategories(setCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCategory = (id: number) => {
    axios
      .put(`/api/v1/category/update-category/${id}`, { name: editName })
      .then((res) => {
        setEditMode(false);
        getAllCategories(setCategories);
        toast.success("Category successfully updated.");
      })
      .catch((err) => {
        console.log(err), toast.error("Error while updating category.");
      });
  };

  useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mx-4 border-t border-gray-100 rounded-md">
      <div className="relative overflow-hidden mx-4 w-full shadow-md rounded-lg">
        <form
          className="shadow-md p-4 flex gap-4 items-center justify-center"
          onSubmit={handleCreateCategory}
        >
          <h1>Create New Category</h1>
          <input
            type="text"
            className="p-2 border-gray-300 border-2 rounded-md"
            placeholder="Enter new category name"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white shadow-md p-2 rounded-md hover:translate-y-[-2px] transition-all">
            Create
          </button>
        </form>
        <table className="table-fixed w-full text-left">
          <thead className="uppercase bg-[#6b7280] text-[#e5e7eb]">
            <tr>
              <td className="py-1 border text-center  p-4">Category Name</td>
              <td className="py-1 border text-center  p-4">Actions</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]">
            {categories?.map((category: categoryType, key: number) => (
              <tr className="py-5 border" key={key}>
                {editMode && category._id == editID ? (
                  <td className="py-5 border text-center  p-4">
                    <input
                      placeholder={category.name}
                      defaultValue={category.name}
                      className="text-center border-2 rounded-md"
                      type="text"
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                ) : (
                  <td className="py-5 border text-center  p-4">
                    {category.name}
                  </td>
                )}
                <td className="py-5 flex justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      console.log("delete", category._id);
                      handleDeleteCategory(category._id);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                  {editMode && editID == category._id ? (
                    <button
                      className="text-green-700 font-bold text-xl"
                      onClick={() => {
                        handleChangeCategory(editID);
                        setEditMode(false);
                      }}
                    >
                      <FiEdit />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setEditID(category._id);
                      }}
                    >
                      <FiEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
