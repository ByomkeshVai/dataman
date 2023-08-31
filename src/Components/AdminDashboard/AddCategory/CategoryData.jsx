import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import EditCategory from "./EditCategory";
import { deleteCategory } from "../../../hooks/category";

const CategoryData = ({ category, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deleteCategory(id)
      .then((data) => {
        refetch();
        toast.success("Category deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={category?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{category?.category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="action-area flex gap-3">
          <div className="delete-area">
            <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-blue-600  rounded-full"
              ></span>
              <span
                className="relative"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </span>
            </span>
            <EditCategory
              isEditModalOpen={isEditModalOpen}
              closeModal={() => setIsEditModalOpen(false)}
              category={category}
              id={category._id}
              refetch={refetch}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>

          <div className="edit-area">
            <span
              onClick={openModal}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0  bg-red-600  rounded-full"
              ></span>
              <span className="relative">Delete</span>
            </span>
            <DeleteModal
              isOpen={isOpen}
              closeModal={closeModal}
              modalHandler={modalHandler}
              id={category._id}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CategoryData;
